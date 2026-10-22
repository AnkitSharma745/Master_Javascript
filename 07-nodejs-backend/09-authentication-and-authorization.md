# Authentication and Authorization

> In this document you will learn how to prove who a user is (authentication) and decide what they may do (authorization) in a Node.js backend: password hashing, sessions vs JWTs, access and refresh tokens, cookies and CSRF, OAuth 2.0 and OpenID Connect, API keys, MFA, RBAC/ABAC, ownership checks and multi-tenant isolation, plus secure login, rate limiting and password reset flows. Auth is one of the most tested backend interview topics, because mistakes here become security incidents.

**Before this:** [HTTP servers and Express](06-http-servers-and-express.md) · [Validation and error handling](08-validation-and-error-handling.md) · [Browser storage and web security basics](../01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md) · **Interview questions:** [jump to the interview section](#interview-questions)

## Table of contents

1. [Authentication vs authorization](#authentication-vs-authorization)
2. [Storing passwords safely](#storing-passwords-safely)
3. [Session-based authentication](#session-based-authentication)
4. [Token-based authentication with JWT](#token-based-authentication-with-jwt)
5. [JWT pitfalls](#jwt-pitfalls)
6. [Sessions vs JWT: how to choose](#sessions-vs-jwt-how-to-choose)
7. [Access tokens and refresh tokens](#access-tokens-and-refresh-tokens)
8. [Where to keep tokens in the browser, and CSRF](#where-to-keep-tokens-in-the-browser-and-csrf)
9. [OAuth 2.0](#oauth-20)
10. [OpenID Connect](#openid-connect)
11. [Single sign-on](#single-sign-on)
12. [API keys](#api-keys)
13. [Multi-factor authentication](#multi-factor-authentication)
14. [Authorization models](#authorization-models)
15. [Auth middleware in Express](#auth-middleware-in-express)
16. [Passport.js](#passportjs)
17. [Protecting the login endpoint](#protecting-the-login-endpoint)
18. [A secure password reset flow](#a-secure-password-reset-flow)
19. [How to explain this in an interview](#how-to-explain-this-in-an-interview)
20. [Common mistakes](#common-mistakes)
21. [Best practices](#best-practices)
22. [Interview questions](#interview-questions)
23. [Summary](#summary)
24. [References](#references)

---

## Authentication vs authorization

- **Authentication (AuthN)** answers: **"Who are you?"** You prove your identity, for example with a password, a passkey or a token.
- **Authorization (AuthZ)** answers: **"What are you allowed to do?"** The system checks your permissions for a specific action on a specific resource.

Authentication always comes first. You cannot decide what someone may do before you know who they are.

**Analogy:** At a hotel, the front desk checks your passport and gives you a key card — that is **authentication**. The key card opens your room and the gym, but not other guests' rooms or the staff office — that is **authorization**. The analogy also shows a real detail: the door (the API) checks the card on **every** visit, not only at check-in.

| | Authentication | Authorization |
| --- | --- | --- |
| Question | Who are you? | What may you do? |
| Inputs | Credentials: password, passkey, OTP code, token | Identity + action + resource (+ context) |
| Output | An identity (user ID, claims) | Allow or deny |
| HTTP status on failure | `401 Unauthorized` (+ `WWW-Authenticate`) | `403 Forbidden` (or `404` to hide the resource) |
| Example | Login with email and password | "Only the order's owner or an admin can cancel it" |

In a typical request:

```mermaid
flowchart LR
    A["Request with cookie or Bearer token"] --> B{"Authenticate:<br/>valid session or token?"}
    B -->|"no"| C["401 Unauthorized"]
    B -->|"yes"| D["req.user = id, roles, tenant"]
    D --> E{"Authorize:<br/>may this user do this action<br/>on this resource?"}
    E -->|"no"| F["403 or 404"]
    E -->|"yes"| G["Run the handler"]
```

---

## Storing passwords safely

### Never store passwords in plain text — or with a fast hash

If your database leaks (and many do: SQL injection, a stolen backup, a misconfigured bucket), the attacker gets everything in it. What they can do depends on how you stored passwords:

| Storage | What an attacker can do after a leak |
| --- | --- |
| Plain text | Read every password. Users reuse passwords, so the attacker logs into their email and bank too |
| Encrypted (reversible) | Find the key (often on the same server) and decrypt everything |
| Fast hash (MD5, SHA-1, SHA-256) | Modern GPUs compute **billions** of these hashes per second. Common passwords fall in minutes |
| Fast hash without salt | Same password → same hash. One precomputed table (a **rainbow table**) cracks all users at once |
| **Slow, salted password hash** (Argon2id, scrypt, bcrypt) | Each guess is expensive and each user must be attacked separately. Strong passwords survive |

### The two ingredients: salt and slowness

- A **salt** is a random value (for example 16 bytes), different for every password, stored next to the hash. Same password + different salt = different hash. This defeats rainbow tables and hides users who share a password.
- A **slow, memory-hard password hashing function** makes every guess cost real time and memory. If one hash takes 100 ms and 64 MiB of memory, an attacker cannot run billions of guesses per second.

```text
hash = slowHash(password, salt, costParameters)
stored = algorithm + parameters + salt + hash      (all in one string)
```

### Which algorithm (OWASP Password Storage Cheat Sheet)

| Algorithm | When | Recommended minimum settings |
| --- | --- | --- |
| **Argon2id** | First choice | 19 MiB memory, 2 iterations, parallelism 1 |
| **scrypt** | If Argon2id is not available | N = 2^17 (128 MiB), r = 8, p = 1 |
| **bcrypt** | Legacy systems | Work factor ≥ 10; passwords are limited to **72 bytes** |
| **PBKDF2** | When FIPS-140 compliance is required | 600,000 iterations with HMAC-SHA-256 |

Tune the parameters so one hash takes as long as your login endpoint can afford (often ~100–500 ms) on your production hardware, and raise them over time.

### Example: scrypt with only Node's built-in crypto

Node has `crypto.scrypt` built in. (Node 24.7 added `crypto.argon2()` too; on older versions use the `argon2` npm package.)

```ts
import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";

// OWASP minimum for scrypt: N=2^17 (128 MiB), r=8, p=1
const PARAMS = { N: 2 ** 17, r: 8, p: 1, keyLength: 64 } as const;
const MAX_MEMORY = 256 * 1024 * 1024; // Node's default maxmem (32 MiB) is too small for N=2^17

function scryptAsync(password: string, salt: Buffer, keyLength: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password.normalize("NFKC"), salt, PARAMS.keyLength, {
    N: PARAMS.N, r: PARAMS.r, p: PARAMS.p, maxmem: MAX_MEMORY,
  });
  // Store the parameters with the hash, so you can raise them later.
  return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, n, r, p, saltB64, keyB64] = stored.split("$");
  if (algorithm !== "scrypt" || !n || !r || !p || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const actual = await scryptAsync(password.normalize("NFKC"), Buffer.from(saltB64, "base64"), expected.length, {
    N: Number(n), r: Number(r), p: Number(p), maxmem: MAX_MEMORY,
  });
  return timingSafeEqual(actual, expected); // constant-time comparison
}

export function needsRehash(stored: string): boolean {
  const [, n, r, p] = stored.split("$");
  return Number(n) < PARAMS.N || Number(r) !== PARAMS.r || Number(p) !== PARAMS.p;
}
```

Results of running it (Node 22):

```js
const stored = await hashPassword("correct horse battery staple");
console.log(stored.split("$").slice(0, 4).join("$"));                   // scrypt$131072$8$1
console.log(await verifyPassword("correct horse battery staple", stored)); // true
console.log(await verifyPassword("Correct horse battery staple", stored)); // false
console.log(stored === (await hashPassword("correct horse battery staple"))); // false — new salt each time
```

Points to notice:

- **Use the async API.** `scrypt()` runs in libuv's thread pool, so the event loop stays free. `scryptSync()` in a request handler would block every other request for the duration of the hash.
- **`timingSafeEqual`** compares in constant time, so response timing does not reveal how many bytes matched.
- **`needsRehash`**: when you raise the cost later, rehash the password on the user's next successful login (you have the plain password at that moment).
- **Unicode normalization** (`NFKC`) makes the same visible password produce the same bytes on different keyboards and systems.

With libraries:

```ts
import argon2 from "argon2";                 // npm "argon2"
const hash = await argon2.hash(password);    // Argon2id with safe defaults, salt included
const ok = await argon2.verify(hash, password);

import bcrypt from "bcrypt";                 // npm "bcrypt" (native) or "bcryptjs" (pure JS)
const hash2 = await bcrypt.hash(password, 12); // cost factor 12
const ok2 = await bcrypt.compare(password, hash2);
```

### Password rules (NIST SP 800-63B, 2025 revision)

Modern guidance is different from the old "8 characters with a symbol, change it every 90 days":

- **Length matters most.** Minimum **15 characters** when the password is the only factor; at least **8** when it is used with MFA. Allow at least **64** characters and spaces (passphrases).
- **No composition rules** (no forced "one uppercase, one digit, one symbol"). They make passwords harder to remember, not harder to crack.
- **No forced periodic changes.** Force a change only when there is evidence of compromise.
- **Check against a blocklist** of common and breached passwords when users set one (for example with the Have I Been Pwned "Pwned Passwords" range API, which uses k-anonymity so you never send the full hash).
- **Rate-limit** failed login attempts.

---

## Session-based authentication

In **session-based authentication**, the server creates a **session** after login and remembers it. The browser receives only a random **session ID** in a cookie and sends it back automatically on every request.

```mermaid
sequenceDiagram
    participant B as Browser
    participant A as API server
    participant R as Redis session store
    B->>A: POST /login with email and password
    A->>A: Verify password hash
    A->>R: Store session sid_abc with userId 7, expires in 8h
    A-->>B: 200 OK with Set-Cookie sid=sid_abc, HttpOnly, Secure, SameSite=Lax
    B->>A: GET /orders with Cookie sid=sid_abc
    A->>R: Load session sid_abc
    R-->>A: userId 7
    A-->>B: 200 orders of user 7
    B->>A: POST /logout
    A->>R: Delete session sid_abc
    A-->>B: Set-Cookie sid expired
```

### Why it is good

- **Easy to revoke.** Logout, "log out all devices", or banning a user = delete the session in the store. It takes effect immediately.
- **Small cookie.** Only a random ID travels; user data stays on the server.
- **HttpOnly cookie.** JavaScript cannot read it, so an XSS bug cannot simply steal the session ID.

### The costs

- Every request needs a **store lookup** (Redis is fast: usually well under a millisecond on the same network).
- With several server instances, the store must be **shared** (Redis, a database). The in-memory store only works for one process — and loses all sessions on restart.
- Cookies are sent automatically, so you must think about **CSRF** (see [below](#where-to-keep-tokens-in-the-browser-and-csrf)).
- Cookies work best when the API and the frontend share a site (for example `app.shop.example` and `api.shop.example`).

### Express example with Redis

```ts
import express from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

const app = express();
app.set("trust proxy", 1); // needed so "secure" cookies work behind a TLS-terminating proxy

app.use(
  session({
    store: new RedisStore({ client: redisClient, prefix: "sess:" }),
    name: "__Host-sid",                       // __Host- prefix: Secure, Path=/, no Domain allowed
    secret: process.env.SESSION_SECRET!,      // signs the cookie; long random value from a secret manager
    resave: false,                            // do not rewrite unchanged sessions
    saveUninitialized: false,                 // no session (and no cookie) until we store something
    rolling: true,                            // refresh the expiry on activity (idle timeout)
    cookie: {
      httpOnly: true,                         // JavaScript cannot read it
      secure: true,                           // HTTPS only
      sameSite: "lax",                        // not sent on cross-site POSTs (CSRF defense)
      maxAge: 8 * 60 * 60 * 1000,             // 8 hours
      path: "/",
    },
  }),
);

app.post("/login", express.json(), async (req, res, next) => {
  const user = await authService.verifyCredentials(req.body.email, req.body.password); // generic error if wrong
  // Prevent session fixation: get a NEW session ID after login.
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.userId = user.id;
    req.session.createdAt = Date.now(); // for an absolute timeout check
    res.json({ id: user.id, email: user.email });
  });
});

app.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("__Host-sid", { path: "/", secure: true, httpOnly: true, sameSite: "lax" });
    res.status(204).end();
  });
});
```

In TypeScript, declare session fields with declaration merging:

```ts
declare module "express-session" {
  interface SessionData {
    userId: string;
    createdAt: number;
  }
}
```

### Session security checklist

- **Session ID:** long and random (express-session uses a secure random generator). Never put user data in it.
- **Regenerate on login** and on privilege change. Otherwise an attacker who planted a known session ID before login (**session fixation**) is logged in with the victim.
- **Idle timeout** (for example 30 minutes without activity) and **absolute timeout** (for example 8–24 hours, no matter what).
- **Destroy on logout** on the server, not just by deleting the cookie.
- **Cookie flags:** `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`), and the `__Host-` prefix.
- **Store data minimally:** user ID, maybe roles; reload sensitive data (permissions) from the database when it can change.

---

## Token-based authentication with JWT

In **token-based authentication**, after login the server gives the client a **token**. The client sends it on every request, usually in the `Authorization` header:

```text
GET /v1/orders
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzciLC...
```

A token can be **opaque** (a random string the server looks up, like a session ID) or **self-contained**. The most common self-contained format is the **JWT**.

### What a JWT is

A **JSON Web Token** (RFC 7519) is a compact, URL-safe string with three parts separated by dots:

```text
header.payload.signature
```

1. **Header** — JSON describing the token, mainly the signing algorithm: `{"alg":"HS256","typ":"JWT"}`.
2. **Payload** — JSON with **claims** (statements about the user and the token).
3. **Signature** — computed over `header.payload` with a key. It proves the token was created by someone who holds the key and was not changed.

Each part is **base64url-encoded**, not encrypted. Anyone who has the token can read the payload:

```js
const payloadPart = token.split(".")[1];
console.log(JSON.parse(Buffer.from(payloadPart, "base64url").toString()));
// { sub: 'user_7', role: 'customer', iss: 'https://auth.shop.example', aud: 'shop-api', iat: 1767225600, exp: 1767226500 }
```

So: **never put secrets or sensitive personal data in a JWT payload.** A signed JWT (JWS) guarantees **integrity**, not **confidentiality**. (Encrypted JWTs — JWE — exist but are rarely needed.)

### Standard claims

| Claim | Meaning | Example |
| --- | --- | --- |
| `iss` | Issuer: who created the token | `"https://auth.shop.example"` |
| `sub` | Subject: who the token is about (user ID) | `"user_7"` |
| `aud` | Audience: which API the token is for | `"shop-api"` |
| `exp` | Expiration time (seconds since 1970) | `1767226500` |
| `nbf` | Not valid before | `1767225600` |
| `iat` | Issued at | `1767225600` |
| `jti` | Unique token ID (useful for revocation lists) | `"9f3c..."` |

Plus your own claims, kept small: `role`, `tenantId`, `scope`.

### Signing algorithms: HS256 vs RS256 / ES256

| | **HS256** (HMAC + SHA-256) | **RS256** (RSA) / **ES256** (ECDSA) / **EdDSA** |
| --- | --- | --- |
| Key type | One **shared secret** signs and verifies | **Private key** signs; **public key** verifies |
| Who can verify | Only services that have the secret — and they can also **create** tokens | Anyone with the public key; they **cannot** create tokens |
| Key distribution | Hard with many services (every one holds a secret that can mint tokens) | Easy: publish public keys at a **JWKS** URL (JSON Web Key Set) |
| Typical use | One backend that issues and checks its own tokens | Identity providers (Auth0, Okta, Entra ID, Keycloak), microservices |

With asymmetric keys, the token header contains a **`kid`** (key ID). The verifier fetches the provider's JWKS, picks the key with that `kid`, and verifies. This allows **key rotation**: publish a new key, start signing with it, remove the old key later.

### How verification works — built by hand to see every step

Use a library in production (see below). Writing it once by hand shows what the library checks for you.

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

// Educational HS256 implementation. In production use a maintained library such as "jose".
interface JwtPayload {
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  role?: string;
}

const b64url = (input: Buffer | string) => Buffer.from(input).toString("base64url");

export function signHs256(payload: JwtPayload, secret: Buffer): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const signature = createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyHs256(
  token: string,
  secret: Buffer,
  expected: { iss: string; aud: string },
  nowSec = Math.floor(Date.now() / 1000),
): JwtPayload {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [headerB64, bodyB64, signatureB64] = parts as [string, string, string];

  // 1. Only accept the algorithm WE expect. Never trust the "alg" from the token blindly.
  const header = JSON.parse(Buffer.from(headerB64, "base64url").toString("utf8")) as { alg?: string };
  if (header.alg !== "HS256") throw new Error(`Unexpected alg: ${header.alg}`);

  // 2. Check the signature in constant time.
  const expectedSig = createHmac("sha256", secret).update(`${headerB64}.${bodyB64}`).digest();
  const actualSig = Buffer.from(signatureB64, "base64url");
  if (actualSig.length !== expectedSig.length || !timingSafeEqual(actualSig, expectedSig)) {
    throw new Error("Invalid signature");
  }

  // 3. Only now trust the claims, and check them.
  const payload = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf8")) as JwtPayload;
  const clockSkew = 30; // seconds of tolerance between servers' clocks
  if (typeof payload.exp !== "number" || payload.exp + clockSkew < nowSec) throw new Error("Token expired");
  if (payload.iss !== expected.iss) throw new Error("Wrong issuer");
  if (payload.aud !== expected.aud) throw new Error("Wrong audience");
  return payload;
}
```

Real results of attacks against this verifier (tested with Node 22):

```text
valid token                        -> returns sub "user_7"
same token, 2000 seconds later     -> Token expired
payload changed to role "admin"    -> Invalid signature
header changed to alg "none"       -> Unexpected alg: none
token for audience "shop-api" used
  by the "admin-api" service       -> Wrong audience
```

Step by step, every verifier must:

1. Split the token and decode the header.
2. **Check `alg` against an allowlist** chosen by the server.
3. **Verify the signature** with the right key (by `kid` for asymmetric keys).
4. Check `exp` (and `nbf`), with a small clock-skew allowance.
5. Check `iss` and `aud`.
6. Only then use `sub`, `role` and other claims.

### In production: use `jose`

The `jose` library supports all JWT/JWS/JWE algorithms, JWKS fetching and caching, and works in Node and edge runtimes.

```ts
import { SignJWT, jwtVerify, createRemoteJWKSet } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!); // at least 32 random bytes

// Issue a short-lived access token
export async function issueAccessToken(user: { id: string; roles: string[]; tenantId: string }): Promise<string> {
  return new SignJWT({ roles: user.roles, tid: user.tenantId })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer("https://auth.shop.example")
    .setAudience("shop-api")
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

// Verify our own HS256 tokens
export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],                    // allowlist
    issuer: "https://auth.shop.example",
    audience: "shop-api",
    clockTolerance: 30,
  });
  return payload; // sub, roles, tid, exp, ...
}

// Verify tokens from an external identity provider (RS256/ES256 via JWKS)
const jwks = createRemoteJWKSet(new URL("https://login.example-idp.com/.well-known/jwks.json"));
export async function verifyIdpToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {
    algorithms: ["RS256", "ES256"],
    issuer: "https://login.example-idp.com/",
    audience: "api://shop",
  });
  return payload;
}
```

The older `jsonwebtoken` package is also widely used: `jwt.verify(token, secret, { algorithms: ["HS256"], issuer, audience })`. Always pass `algorithms`.

---

## JWT pitfalls

JWTs are popular, but they are easy to misuse.

| Pitfall | What goes wrong | Defense |
| --- | --- | --- |
| **No revocation** | A stolen token works until it expires. Logout cannot "delete" it — it lives on the client | Short expiry (5–15 min) + refresh tokens; a denylist of `jti`s or a per-user `tokenVersion` checked on sensitive actions |
| **`alg: "none"`** | Some old libraries accepted unsigned tokens if the header said `none` | Always pass an algorithm allowlist |
| **Algorithm confusion** | A verifier that expects RS256 is tricked into HS256, using the **public key** as the HMAC secret — and the attacker knows the public key | Allowlist algorithms per key; use libraries that bind keys to algorithms |
| **Weak HS256 secret** | Short or guessable secrets can be brute-forced offline from one captured token | 256+ bits of randomness from a secret manager; prefer asymmetric keys across services |
| **Sensitive data in the payload** | Anyone can base64-decode it | Only IDs and coarse claims |
| **Missing `aud` check** | A token issued for service A is accepted by service B | Always verify `aud` (and `iss`) |
| **Long-lived tokens** | Days-long access tokens = days of abuse after theft | Minutes, not days |
| **Stale claims** | Role removed in the DB, but the token still says `admin` for its lifetime | Short expiry; re-check critical permissions in the DB |
| **Large tokens** | Many claims make every request heavier; cookies are limited to about 4 KB | Keep claims minimal |
| **Stored in `localStorage`** | Any XSS can read and exfiltrate it | Prefer HttpOnly cookies or in-memory storage (next sections) |

RFC 8725 ("JSON Web Token Best Current Practices") collects these rules.

---

## Sessions vs JWT: how to choose

| | Server sessions (opaque ID in a cookie) | Self-contained JWT access tokens |
| --- | --- | --- |
| State on server | Yes (session store) | No lookup needed to verify |
| Revocation | Immediate (delete the session) | Hard; wait for expiry or keep a denylist |
| Per-request cost | Store lookup (fast with Redis) | Signature check (CPU only) |
| Works across many services / domains | Needs a shared store and same site | Yes — any service with the public key can verify |
| Size on the wire | Small ID | Larger (claims + signature) |
| Mobile apps and third-party clients | Possible, but cookies are awkward | Natural (`Authorization` header) |
| Typical fit | Classic web apps, one backend, server-rendered pages, BFFs | APIs used by mobile apps, microservices, tokens from an identity provider |

My practical rule:

- **Browser app with its own backend (same site)?** Server sessions in HttpOnly cookies are simple and secure. Many teams over-engineer this with JWTs.
- **Many services, mobile apps, or an external identity provider (OIDC)?** Short-lived JWT access tokens + refresh tokens.
- A common hybrid is the **Backend-for-Frontend (BFF)**: the browser has a session cookie with the BFF; the BFF holds OAuth tokens and calls the APIs with them. The browser never sees a token.

---

## Access tokens and refresh tokens

Short-lived tokens limit damage, but nobody wants to log in every 15 minutes. The solution is two tokens:

| | Access token | Refresh token |
| --- | --- | --- |
| Purpose | Call the API | Get a new access token |
| Lifetime | Short (5–15 minutes) | Long (days to weeks), with an absolute maximum |
| Sent to | Every API request | **Only** the token endpoint (`POST /auth/refresh`) |
| Format | Often a JWT | Usually an opaque random string stored (hashed) in the database |
| Revocable | Not easily (expires soon anyway) | Yes — delete or revoke the database row |

### Refresh token rotation and reuse detection

**Rotation** means every time a refresh token is used, the server returns a **new** refresh token and marks the old one as used. **Reuse detection** means: if an **already used** refresh token shows up again, someone copied it. The server then **revokes the whole token family** (every token from that login), so both the attacker and the user must log in again. The OAuth 2.0 Security Best Current Practice (RFC 9700, 2025) requires public clients' refresh tokens to be either rotated like this or bound to the client (sender-constrained).

```mermaid
sequenceDiagram
    participant U as Real user app
    participant X as Attacker
    participant A as Auth server
    U->>A: refresh with RT1
    A-->>U: new access token and RT2, RT1 marked used
    X->>A: refresh with stolen RT1
    A->>A: RT1 already used, reuse detected
    A->>A: revoke the whole family RT1 and RT2
    A-->>X: 401 invalid token
    U->>A: refresh with RT2
    A-->>U: 401, user must log in again
```

```ts
import { createHash, randomBytes, randomUUID } from "node:crypto";

interface RefreshTokenRecord {
  tokenHash: string;     // never store the raw token
  userId: string;
  familyId: string;      // all tokens that came from one login
  expiresAt: number;
  usedAt?: number;       // set when rotated
  revokedAt?: number;
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

class RefreshTokenService {
  private records = new Map<string, RefreshTokenRecord>(); // a DB table in real life

  issue(userId: string, familyId: string = randomUUID()): string {
    const token = randomBytes(32).toString("base64url"); // 256 bits of randomness
    this.records.set(sha256(token), { tokenHash: sha256(token), userId, familyId, expiresAt: Date.now() + REFRESH_TTL_MS });
    return token;
  }

  rotate(presented: string): { userId: string; refreshToken: string } {
    const record = this.records.get(sha256(presented));
    if (!record || record.revokedAt || record.expiresAt < Date.now()) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }
    if (record.usedAt) {
      // Reuse detected: an old token was presented again. Someone may have stolen it.
      this.revokeFamily(record.familyId);
      throw new Error("REFRESH_TOKEN_REUSED");
    }
    record.usedAt = Date.now();
    return { userId: record.userId, refreshToken: this.issue(record.userId, record.familyId) };
  }

  revokeFamily(familyId: string): void {
    for (const r of this.records.values()) if (r.familyId === familyId) r.revokedAt = Date.now();
  }
}
```

Tested sequence: login gives `rt1`; a normal refresh rotates to `rt2`; the attacker then presents `rt1` → `REFRESH_TOKEN_REUSED` and the family is revoked; the real user's `rt2` → `INVALID_REFRESH_TOKEN`, so they log in again.

Production notes:

- **Hash refresh tokens** in the database (SHA-256 is fine here, because the tokens are long random values, not human passwords).
- **Make "mark as used" atomic**: `UPDATE refresh_tokens SET used_at = now() WHERE token_hash = $1 AND used_at IS NULL RETURNING ...`. Two parallel refreshes must not both succeed.
- **Allow a short grace period** (a few seconds) for the "two browser tabs refresh at the same time" case, or let the frontend coordinate refreshes, to avoid logging out real users.
- **On logout** revoke the family. On **password change**, revoke all families of the user.

### The refresh flow in an Angular app

1. API returns `401` because the access token expired.
2. An HTTP interceptor calls `POST /auth/refresh` **once** (other failing requests wait for the same refresh).
3. On success, retry the original requests with the new access token.
4. On failure, clear state and redirect to login.

(The interceptor implementation is in [HttpClient and interceptors](../06-angular-16/08-httpclient-and-interceptors.md).)

---

## Where to keep tokens in the browser, and CSRF

### The options

| Storage | XSS risk | CSRF risk | Notes |
| --- | --- | --- | --- |
| `localStorage` / `sessionStorage` | **High** — any injected script can read and send the token anywhere | None (not sent automatically) | Simple; popular; one XSS = stolen long-lived token |
| JavaScript memory (a variable) | Medium — XSS can still use it while the page is open, but not steal it for later as easily | None | Lost on reload → needs a refresh token in an HttpOnly cookie |
| **HttpOnly cookie** | Low — scripts cannot read it (XSS can still make requests from the page) | **Yes** — the browser sends it automatically | Needs `Secure`, `SameSite` and CSRF thinking |

There is no perfect place. XSS is game over for most designs (an attacker running script in your page can act as the user). The goal is to **limit the damage**: avoid letting XSS steal long-lived credentials. A common, solid setup for SPAs:

- **Access token in memory**, short-lived.
- **Refresh token in an HttpOnly, Secure, SameSite=Strict cookie** scoped to the refresh path (`Path=/auth/refresh`).
- Or a **BFF** with a session cookie, where tokens never reach the browser.

### CSRF in one paragraph

**CSRF (Cross-Site Request Forgery):** the user is logged in to `shop.example` (cookie stored). They visit `evil.example`, which contains a hidden form that POSTs to `shop.example/account/email`. The browser attaches the `shop.example` cookie automatically, and the request runs with the user's identity. Token-in-header designs are not affected, because the browser does not add the `Authorization` header by itself. **Cookie-based auth must defend against CSRF.**

### Defenses for cookie-based auth

1. **`SameSite` cookies.** `SameSite=Lax` (the default in modern Chrome when no attribute is set) stops cookies on cross-site `POST`, `PUT`, `DELETE` and on cross-site subrequests; they are still sent on top-level `GET` navigations — so **never change state on `GET`**. `SameSite=Strict` never sends cookies cross-site (safer, but links from email or other sites arrive logged-out). Note: "same-site" means the same registrable domain, so `evil.shop.example` (a subdomain you don't control) counts as same-site.
2. **CSRF tokens** for state-changing requests: the synchronizer token pattern (random token stored in the session and sent in a header or form field) or a signed double-submit cookie.
3. **Check `Origin` / `Sec-Fetch-Site`** headers on state-changing requests and reject unexpected origins.
4. **Require a custom header or JSON content type** for APIs; cross-site HTML forms cannot set custom headers, and adding them from scripts triggers a CORS preflight.

Angular's `HttpClient` has built-in support for the cookie-to-header pattern: it reads a cookie named `XSRF-TOKEN` and sends its value in the `X-XSRF-TOKEN` header on mutating requests to relative URLs. The server must set that cookie and check the header. Full coverage of CSRF, XSS and CORS is in [Web security: XSS, CSRF, CORS, CSP](../01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md).

### Setting auth cookies correctly

```ts
res.cookie("__Host-refresh", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",                            // __Host- cookies must use Path=/
  maxAge: 30 * 24 * 60 * 60 * 1000,     // 30 days
});
```

> The `__Host-` prefix requires `Secure`, `Path=/` and no `Domain` attribute. If you want to scope the cookie to `/auth/refresh`, use the `__Secure-` prefix instead (it only requires `Secure`).

---

## OAuth 2.0

### The problem it solves

You use a photo-printing website and want it to read photos from your Google Photos account. In the bad old days, the site asked for **your Google password**. Then it could do anything with your account, forever, and you could not take back access without changing your password.

**OAuth 2.0** (RFC 6749) is a framework for **delegated authorization**: a user lets an application access **some** of their resources on another service, **without sharing their password**, with **limited scope** and the ability to **revoke** it.

**Analogy:** A **valet key** for a car. It starts the car and drives it, but cannot open the trunk or glovebox. You give it to the valet instead of your master key, and you can take it back.

Important: OAuth 2.0 is about **authorization** (access to APIs). It does **not** tell the app who the user is. For login, you use **OpenID Connect**, which is built on top of OAuth 2.0 (next section).

### The four roles

| Role | Meaning | Example |
| --- | --- | --- |
| **Resource owner** | The user who owns the data | You |
| **Client** | The application that wants access | The photo-printing site, your Angular SPA, a mobile app |
| **Authorization server** | Authenticates the user, asks for consent, issues tokens | Google's OAuth server, Auth0, Okta, Keycloak, Microsoft Entra ID |
| **Resource server** | The API that holds the data and accepts access tokens | Google Photos API, your own Node API |

Clients are either **confidential** (can keep a secret, like a backend server) or **public** (cannot, like SPAs and mobile apps — anyone can read their code).

### Key terms

- **Scope:** what access is requested, for example `photos.read` or `orders:write`.
- **Access token:** the credential the client sends to the resource server.
- **Authorization code:** a short-lived, one-time code that the client exchanges for tokens.
- **Redirect URI:** where the authorization server sends the user back. Must be **pre-registered** and compared by **exact match**.
- **`state`:** a random value the client sends and checks on return, to protect the redirect against CSRF.

### Authorization Code flow with PKCE (the main flow)

This is the recommended flow for web apps, SPAs and mobile apps. **PKCE** (Proof Key for Code Exchange, RFC 7636, pronounced "pixie") protects the authorization code: if an attacker steals the code from the redirect, they cannot exchange it, because they do not have the secret **code verifier**.

```mermaid
sequenceDiagram
    participant U as User browser
    participant C as Client app
    participant AS as Authorization server
    participant RS as Resource server API
    C->>C: Create code_verifier and code_challenge = SHA256 of verifier
    C->>U: Redirect to AS /authorize with client_id, redirect_uri, scope, state, code_challenge
    U->>AS: Login and consent
    AS-->>U: Redirect to redirect_uri with code and state
    U->>C: Deliver code and state
    C->>C: Check state matches
    C->>AS: POST /token with code, code_verifier, redirect_uri
    AS->>AS: Check SHA256 of code_verifier equals code_challenge
    AS-->>C: access_token, refresh_token, id_token if OIDC
    C->>RS: GET /photos with Authorization Bearer access_token
    RS-->>C: Photos
```

Step by step:

1. The client creates a random **code verifier** (43–128 characters) and its **code challenge** = `BASE64URL(SHA256(verifier))`.
2. The client redirects the user to the authorization server's `/authorize` endpoint with `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge` and `code_challenge_method=S256`.
3. The user logs in **on the authorization server's page** (the client never sees the password) and approves the scopes.
4. The authorization server redirects back to `redirect_uri?code=...&state=...`.
5. The client checks that `state` matches what it sent.
6. The client calls `POST /token` with the `code` and the **original `code_verifier`** (confidential clients also authenticate with their client secret or a private key).
7. The authorization server hashes the verifier and compares it with the stored challenge. If it matches, it returns the tokens.
8. The client calls the API with `Authorization: Bearer <access_token>`.

Creating PKCE values in Node:

```js
import { createHash, randomBytes } from "node:crypto";

const codeVerifier = randomBytes(32).toString("base64url");          // 43 characters
const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");

// Check against the example in RFC 7636 Appendix B:
const rfcVerifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
console.log(createHash("sha256").update(rfcVerifier).digest("base64url"));
// E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM   (matches the RFC)
```

### Other grant types

| Grant | Use it for | Status |
| --- | --- | --- |
| **Authorization code + PKCE** | Users logging in to web, SPA and mobile apps | Recommended for all clients (PKCE required for public clients, recommended for confidential ones) |
| **Client credentials** | Machine-to-machine: a backend service calling another API with **its own** identity (no user) | Recommended for M2M |
| **Refresh token** | Getting new access tokens without user interaction | Standard; rotate or sender-constrain for public clients |
| **Device authorization** (RFC 8628) | Devices without a browser or keyboard (smart TVs, CLIs): "go to example.com/device and enter ABCD-EFGH" | Standard |
| **Implicit** | Old SPA flow that returned tokens in the URL fragment | **Should not be used** (RFC 9700) |
| **Resource owner password credentials** | App collects the user's password and sends it to the token endpoint | **Must not be used** (RFC 9700) |

Client credentials example:

```ts
async function getServiceToken(): Promise<string> {
  const res = await fetch("https://auth.shop.example/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.REPORTING_CLIENT_ID!,
      client_secret: process.env.REPORTING_CLIENT_SECRET!,
      scope: "orders:read",
    }),
    signal: AbortSignal.timeout(5_000),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`);
  const body = (await res.json()) as { access_token: string; expires_in: number };
  return body.access_token; // cache it until shortly before expires_in runs out
}
```

### Access token formats

- **JWT access tokens:** the API verifies them locally with the authorization server's JWKS (fast, but revocation is slow).
- **Opaque access tokens:** the API asks the authorization server's **introspection** endpoint (RFC 7662) whether the token is active (immediate revocation, but a network call — usually cached briefly).

### Security rules from the OAuth 2.0 Security BCP (RFC 9700, January 2025)

- Use the authorization code flow with **PKCE** (`S256`), not implicit or password grants.
- **Exact redirect URI matching** on the authorization server.
- Protect against CSRF with PKCE, `state` or the OIDC `nonce`.
- Keep access tokens **short-lived**, restrict their **audience**, and grant **minimal scopes**.
- For public clients, refresh tokens must be **rotated** or **sender-constrained** (for example with DPoP or mutual TLS).

**OAuth 2.1** is an IETF draft that consolidates these practices into one updated spec.

---

## OpenID Connect

**OpenID Connect (OIDC)** is an **identity layer** on top of OAuth 2.0. OAuth says "this app may read your photos". OIDC adds "and this is **who** the user is". It is what "Sign in with Google / Microsoft / Apple" uses.

What OIDC adds:

1. The **`openid` scope** in the authorization request (plus optional `profile`, `email`).
2. An **ID token**: a signed JWT that tells the **client** who logged in and how.
3. A **UserInfo endpoint** that returns profile claims for an access token.
4. **Discovery**: a JSON document at `https://issuer/.well-known/openid-configuration` that lists all endpoints and the JWKS URL.

### ID token vs access token

This is a classic interview question.

| | ID token | Access token |
| --- | --- | --- |
| Defined by | OpenID Connect | OAuth 2.0 |
| Audience (`aud`) | **The client app** (its `client_id`) | **The API** (resource server) |
| Purpose | Tells the client who the user is (login) | Lets the client call an API |
| Format | Always a JWT | JWT or opaque — the client should treat it as opaque |
| Send it to APIs? | **No** | Yes, as `Authorization: Bearer` |

Example ID token payload:

```json
{
  "iss": "https://accounts.example-idp.com",
  "sub": "248289761001",
  "aud": "shop-web-client",
  "exp": 1767229200,
  "iat": 1767225600,
  "nonce": "n-0S6_WzA2Mj",
  "auth_time": 1767225590,
  "email": "asha@example.com",
  "email_verified": true,
  "name": "Asha Rao"
}
```

The client must validate the ID token: signature (via JWKS), `iss`, `aud` equals its own client ID, `exp`, and the **`nonce`** it sent in the authorization request (protects against replay and injection).

**Identify users by `iss` + `sub`, not by email.** Emails can change and can be reused; `sub` is the stable ID per issuer.

### Using OIDC in a Node backend

For a server-side web app or BFF, use a certified library such as `openid-client` (from the author of `jose`). It handles discovery, PKCE, `state`, `nonce`, the token exchange and ID token validation. For an API that only **receives** access tokens from an identity provider, verify them with `jose` and the provider's JWKS, as shown in the JWT section.

---

## Single sign-on

**Single sign-on (SSO)** means users log in **once** at a central **identity provider (IdP)** and are then logged in to many applications (the **service providers** or relying parties). Example: one company login for email, HR, the admin portal and the CRM.

How it works, briefly: each app redirects unauthenticated users to the IdP. The IdP already has a session (its own cookie), so it immediately sends the user back with a code (OIDC) or an assertion (SAML) — no second password prompt.

| Protocol | Format | Typical use |
| --- | --- | --- |
| **OIDC** | JSON, JWT | Modern web and mobile apps, consumer logins |
| **SAML 2.0** | XML assertions | Enterprise SSO, older corporate systems |

Enterprise customers of B2B apps usually ask for SSO with their own IdP (Okta, Entra ID, Google Workspace), plus user provisioning (SCIM). Architecture details — SSO across apps, logout propagation, choosing an IdP, multi-tenant identity — are in [Auth architecture and multi-tenancy](../09-system-design/06-auth-architecture-and-multi-tenancy.md).

---

## API keys

An **API key** is a long random secret that identifies a **calling application** (not a person). It is common for server-to-server integrations and public developer APIs.

```text
GET /v1/products
Authorization: Bearer sk_live_5f3a9c...      (or a custom header like X-API-Key)
```

### Good API key design

- **Generate with a CSPRNG** (cryptographically secure random), at least 128–256 bits.
- **Add a readable prefix** (`sk_live_`, `sk_test_`) so leaked keys are recognizable and secret scanners (like GitHub's) can detect them.
- **Store only a hash** (SHA-256 is fine because keys are high-entropy random values). Show the full key to the user **once** at creation.
- Store a short **non-secret identifier** (the first characters) to display in the UI: `sk_live_5f3a…`.
- Give keys **scopes** and an **owner**, support **multiple keys** per client for **rotation**, record **last used**, and allow **revocation**.
- **Rate-limit per key.**
- **Never** embed secret keys in frontend or mobile code — they can be extracted.

```ts
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export function createApiKey(): { key: string; prefix: string; hash: string } {
  const key = `sk_live_${randomBytes(32).toString("base64url")}`;
  return { key, prefix: key.slice(0, 12), hash: createHash("sha256").update(key).digest("hex") };
}

export async function findClientByApiKey(presented: string) {
  const hash = createHash("sha256").update(presented).digest("hex");
  const client = await db.apiKeys.findByHash(hash);   // indexed lookup by hash
  if (!client || client.revokedAt) return null;
  // The lookup is by hash, so timing does not leak the key; a timingSafeEqual is
  // only needed if you compare secrets directly.
  return client;
}
```

API keys vs OAuth client credentials: API keys are simpler (no token endpoint), but they are long-lived bearer secrets. OAuth client credentials give short-lived tokens with scopes and standard tooling. Large platforms often support both.

---

## Multi-factor authentication

**Multi-factor authentication (MFA)** requires two or more **different kinds** of proof:

| Factor | Examples |
| --- | --- |
| Something you **know** | Password, PIN |
| Something you **have** | Phone with an authenticator app, hardware security key, passkey on a device |
| Something you **are** | Fingerprint, face (usually unlocks a device-bound key) |

A stolen password alone is then not enough.

### Common MFA methods

| Method | How it works | Strength |
| --- | --- | --- |
| **SMS codes** | Code sent by text message | Weakest: SIM swapping, interception, phishing |
| **TOTP** (authenticator apps) | App and server share a secret; both compute a 6-digit code from the current time | Good, but can be phished (user types the code into a fake site) |
| **Push approval** | Approve a login in an app | Good; vulnerable to "push fatigue" — use number matching |
| **WebAuthn / passkeys** | Device holds a private key bound to your domain; signs a challenge | Strongest: **phishing-resistant**, because the key only works on the real origin |

### How TOTP works (RFC 6238)

1. At setup, the server creates a random secret and shows it as a QR code. The authenticator app stores it.
2. Both sides compute `counter = floor(currentUnixTime / 30)`.
3. Both compute `HMAC-SHA1(secret, counter)`, take 4 bytes from a position given by the last byte ("dynamic truncation"), and reduce it to 6 digits.
4. The user types the app's code; the server computes the same and compares (allowing ±1 time step for clock drift).

```js
import { createHmac } from "node:crypto";

function totp(secret, timeSec, { step = 30, digits = 6, algorithm = "sha1" } = {}) {
  const counter = Math.floor(timeSec / step);
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac(algorithm, secret).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;           // dynamic truncation
  const binary = hmac.readUInt32BE(offset) & 0x7fffffff;
  return String(binary % 10 ** digits).padStart(digits, "0");
}

// RFC 6238 test vectors (SHA-1 secret "12345678901234567890", 8 digits):
const secret = Buffer.from("12345678901234567890");
console.log(totp(secret, 59, { digits: 8 }));         // 94287082
console.log(totp(secret, 1111111109, { digits: 8 })); // 07081804
console.log(totp(secret, 1234567890, { digits: 8 })); // 89005924
```

(All three match the RFC. In production, use a maintained library, encrypt stored TOTP secrets, prevent code reuse within the same time window, and rate-limit attempts.)

### MFA design tips

- Offer **passkeys/WebAuthn** where possible; they can replace passwords entirely.
- Provide **recovery codes** (one-time, stored hashed) for lost devices.
- Use **step-up authentication**: ask for MFA again before sensitive actions (changing email, payouts), even inside a session.
- Treat **MFA enrollment and removal** as sensitive actions that need re-authentication and send notifications.

---

## Authorization models

Authentication tells you **who**. Authorization decides **whether this user may do this action on this resource right now**. The rule of thumb: **deny by default, check on the server, check on every request, check every object.**

### RBAC — role-based access control

Users get **roles**; roles have **permissions**; code checks permissions (not role names).

```mermaid
classDiagram
    class User {
        +id string
        +roles Role[]
    }
    class Role {
        +name string
        +permissions Permission[]
    }
    class Permission {
        +name string
    }
    User "many" --> "many" Role : has
    Role "many" --> "many" Permission : grants
```

```ts
type Permission =
  | "orders:read" | "orders:read:any" | "orders:cancel" | "orders:ship"
  | "products:write" | "users:manage";

const ROLE_PERMISSIONS: Record<string, readonly Permission[]> = {
  customer: ["orders:read", "orders:cancel"],
  support: ["orders:read", "orders:read:any", "orders:cancel"],
  warehouse: ["orders:read:any", "orders:ship"],
  admin: ["orders:read", "orders:read:any", "orders:cancel", "orders:ship", "products:write", "users:manage"],
};

export function hasPermission(roles: readonly string[], permission: Permission): boolean {
  return roles.some((role) => ROLE_PERMISSIONS[role]?.includes(permission) ?? false);
}

console.log(hasPermission(["customer"], "orders:ship"));  // false
console.log(hasPermission(["warehouse"], "orders:ship")); // true
```

Check **permissions**, not roles, in code (`can("orders:ship")`, not `role === "admin"`). Then you can add a new role later without changing every `if`.

**Pros:** simple, easy to audit ("who can ship orders?"). **Cons:** "role explosion" when rules depend on context (region, department, time, resource owner).

### ABAC — attribute-based access control

Decisions are based on **attributes** of the user, the resource, the action and the environment, written as **policies**:

> "A support agent may refund an order **if** the order's region equals the agent's region **and** the amount is below 500 EUR **and** it is during business hours."

```ts
interface PolicyContext {
  user: { id: string; roles: string[]; region: string; tenantId: string };
  resource: { ownerId: string; region: string; amountCents: number; tenantId: string };
}

export function canRefund({ user, resource }: PolicyContext): boolean {
  if (user.tenantId !== resource.tenantId) return false;           // tenant isolation first
  if (user.roles.includes("admin")) return true;
  return (
    user.roles.includes("support") &&
    user.region === resource.region &&
    resource.amountCents < 50_000
  );
}
```

**Pros:** very flexible, fewer roles. **Cons:** harder to audit and test; policies can get complex. Policy engines (Open Policy Agent, Cedar, CASL in JavaScript) help keep policies in one place.

A third model, **ReBAC** (relationship-based, inspired by Google's Zanzibar paper), decides by relationships: "user can edit a document if they are an editor of its folder". Used by Google Drive-style sharing (OpenFGA, SpiceDB).

### Ownership checks (object-level authorization)

The most common real-world auth bug is not a broken login — it is forgetting to check **whose object this is**. This is **BOLA/IDOR** (number one in the OWASP API Security Top 10):

```ts
// ❌ Wrong: any logged-in user can read any order by changing the ID
ordersRouter.get("/:orderId", authenticate, async (req, res) => {
  res.json(await orderRepo.findById(req.params.orderId));
});

// ✅ Correct: scope the query to the owner (or check a permission for "read any")
ordersRouter.get("/:orderId", authenticate, async (req, res) => {
  const user = req.user!;
  const order = hasPermission(user.roles, "orders:read:any")
    ? await orderRepo.findById(req.params.orderId)
    : await orderRepo.findByIdForCustomer(req.params.orderId, user.id); // WHERE id = $1 AND customer_id = $2
  if (!order) throw new NotFoundError("Order", req.params.orderId);  // 404: do not reveal existence
  res.json(order);
});
```

Put these checks in the **service or repository layer**, so every caller (routes, jobs, GraphQL resolvers) gets them, and write tests that try to read other users' objects.

### Tenant isolation (multi-tenant SaaS)

In a **multi-tenant** app, many customer companies (tenants) share one system. Data from tenant A must never be visible to tenant B.

1. **Put `tenant_id` on every tenant-owned table** and include it in every query: `WHERE tenant_id = $1 AND id = $2`.
2. **Take the tenant from the authenticated identity** (token claim or session), never from a request parameter the user can change.
3. **Add composite indexes** that start with `tenant_id`.
4. **Defense in depth with PostgreSQL row-level security (RLS):**

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;  -- also apply to the table owner
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

```ts
// Inside a transaction, before running tenant queries:
await client.query("SELECT set_config('app.tenant_id', $1, true)", [req.user!.tenantId]); // true = only for this transaction
```

Now even a query that forgets the `WHERE tenant_id` cannot read other tenants' rows. Tenancy models (shared table, schema per tenant, database per tenant) are compared in [Auth architecture and multi-tenancy](../09-system-design/06-auth-architecture-and-multi-tenancy.md).

---

## Auth middleware in Express

A complete, typed setup: authenticate the token, attach the user, then authorize.

```ts
// src/types/express.d.ts
export interface AuthUser {
  id: string;
  roles: string[];
  tenantId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
```

```ts
// src/middleware/authenticate.ts
import type { RequestHandler } from "express";
import { jwtVerify, errors as joseErrors } from "jose";
import { ForbiddenError, UnauthorizedError } from "../shared/errors.js";
import { hasPermission, type Permission } from "../auth/permissions.js";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const authenticate: RequestHandler = async (req, res, next) => {
  const header = req.get("authorization");
  const match = header?.match(/^Bearer (.+)$/i);
  if (!match) {
    res.set("WWW-Authenticate", 'Bearer realm="shop-api"');
    throw new UnauthorizedError("Missing bearer token");
  }

  try {
    const { payload } = await jwtVerify(match[1]!, secret, {
      algorithms: ["HS256"],
      issuer: "https://auth.shop.example",
      audience: "shop-api",
      clockTolerance: 30,
    });
    if (typeof payload.sub !== "string" || typeof payload.tid !== "string" || !Array.isArray(payload.roles)) {
      throw new UnauthorizedError("Malformed token claims");
    }
    req.user = { id: payload.sub, tenantId: payload.tid, roles: payload.roles.map(String) };
    next();
  } catch (err) {
    if (err instanceof UnauthorizedError) throw err;
    const expired = err instanceof joseErrors.JWTExpired;
    res.set("WWW-Authenticate", `Bearer realm="shop-api", error="invalid_token"`);
    throw new UnauthorizedError(expired ? "Token expired" : "Invalid token");
  }
};

export function requirePermission(permission: Permission): RequestHandler {
  return (req, res, next) => {
    if (!req.user) throw new UnauthorizedError();
    if (!hasPermission(req.user.roles, permission)) {
      throw new ForbiddenError(`Missing permission ${permission}`);
    }
    next();
  };
}
```

```ts
// Usage (Express 5 forwards the thrown errors to the error middleware)
app.get("/health/live", (req, res) => { res.json({ ok: true }); }); // public
app.use("/v1", authenticate);                                        // everything below needs a user
app.get("/v1/orders/:orderId", ordersController.getById);            // ownership checked in the service
app.post("/v1/orders/:orderId/ship", requirePermission("orders:ship"), ordersController.ship);
app.delete("/v1/users/:userId", requirePermission("users:manage"), usersController.remove);
```

Points to notice:

- **401 vs 403** come from different middlewares: `authenticate` (who) and `requirePermission` (what). Object-level rules live in services.
- The `WWW-Authenticate` header tells clients how to authenticate (RFC 6750 defines `error="invalid_token"`).
- **Validate the claims' shape** too — a correctly signed token with unexpected claims should not crash your code.
- On Express 4, the `async` middleware must use `try/catch` + `next(err)` (see [HTTP servers and Express](06-http-servers-and-express.md#error-handling-and-async-errors)).

---

## Passport.js

**Passport** is a popular Express authentication middleware with hundreds of **strategies**: `passport-local` (username/password), `passport-jwt`, OAuth/OIDC strategies (Google, GitHub, `openid-client`'s Passport strategy), SAML and more. It standardizes "run a strategy, get a user, put it in `req.user`".

```ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await authService.verifyCredentials(email, password); // null if wrong
      return done(null, user ?? false, user ? undefined : { message: "Invalid email or password" });
    } catch (err) {
      return done(err);
    }
  }),
);

// With sessions: store only the user ID in the session
passport.serializeUser((user, done) => done(null, (user as { id: string }).id));
passport.deserializeUser(async (id: string, done) => {
  try {
    done(null, await userRepo.findById(id));
  } catch (err) {
    done(err);
  }
});

app.use(session(sessionOptions));   // express-session (see the sessions section)
app.use(passport.initialize());
app.use(passport.session());        // restores req.user from the session on each request

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ id: req.user!.id });   // only reached on success; failures get 401
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {             // since Passport 0.6, logout is async and needs a callback
    if (err) return next(err);
    res.status(204).end();
  });
});
```

Since Passport 0.6, `req.login()` regenerates the session automatically (protection against session fixation), and `req.logout()` requires a callback.

**When to use Passport:** Express apps that need several login methods (local + Google + SAML) with a common pattern. **When not:** a simple JWT-verifying API (a 20-line middleware with `jose` is clearer), or when you use an auth platform SDK. NestJS wraps Passport in `@nestjs/passport` with guards.

---

## Protecting the login endpoint

Login is the most attacked endpoint. Attacks: **brute force** (many passwords for one account), **credential stuffing** (leaked email/password pairs from other sites, tried across many accounts), and **account enumeration** (finding which emails have accounts).

### Defenses

1. **Rate limiting** on two keys:
   - per **IP** (or IP range) — slows one machine;
   - per **account** (email) — slows distributed attacks against one user.

   Rate-limiting algorithms and a Redis-backed limiter shared by all instances are explained in [Production Node.js: Rate limiting](14-production-nodejs.md#rate-limiting).
2. **Progressive delays or temporary lockouts** instead of permanent lockouts. A permanent lockout after 5 failures lets anyone lock out any user (a denial-of-service). Prefer: after N failures, require a CAPTCHA or wait an increasing time.
3. **Generic error messages:** "Invalid email or password" — the same text, status and roughly the same **time** whether the email exists or not.
4. **Equal timing:** when the user does not exist, still run a password hash against a dummy hash, so response time does not reveal existence.
5. **Breached password checks** at signup and password change.
6. **MFA**, and risk-based checks (new device, new country → step-up).
7. **Log and alert** on spikes of failures.

```ts
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

// Two separate limiters, because they stop two different attacks.
// (A single limiter keyed on "IP + email" would stop neither: an attacker could
// try one account from many IPs, or many accounts from one IP.)
const common = {
  windowMs: 15 * 60 * 1000,          // 15 minutes
  standardHeaders: "draft-8" as const,
  legacyHeaders: false,
  skipSuccessfulRequests: true,      // only failures count
  // store: a Redis store, so limits are shared by all instances
};

// 1. Per IP: slows one machine that tries many accounts (credential stuffing)
export const loginLimiterPerIp = rateLimit({
  ...common,
  limit: 50,
  keyGenerator: (req) => ipKeyGenerator(req.ip ?? ""),
});

// 2. Per account: slows a distributed brute force against one user
export const loginLimiterPerAccount = rateLimit({
  ...common,
  limit: 10,
  keyGenerator: (req) => `acct:${String(req.body?.email ?? "").trim().toLowerCase()}`,
});

app.post(
  "/auth/login",
  express.json({ limit: "10kb" }),   // parse the body first: the per-account key needs req.body.email
  loginLimiterPerIp,
  loginLimiterPerAccount,
  loginController,
);
```

```ts
// Constant-ish timing: hash even when the user does not exist
const DUMMY_HASH = await hashPassword("dummy-password-for-timing-only");

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await userRepo.findByEmail(email.trim().toLowerCase());
  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) return null;   // same path, same message for both cases
  if (needsRehash(user.passwordHash)) await userRepo.updatePasswordHash(user.id, await hashPassword(password));
  return user;
}
```

The same enumeration rule applies to **signup** and **password reset**: respond the same way whether the email exists or not, and send the details by email.

---

## A secure password reset flow

A password reset is an alternative way to log in — so it must be as strong as login.

```mermaid
sequenceDiagram
    participant U as User
    participant A as API
    participant DB as Database
    participant M as Email service
    U->>A: POST /auth/password-reset with email
    A->>DB: Find user by email
    A->>DB: Store SHA256 of a random token, expires in 30 min, single use
    A->>M: Send link with the raw token
    A-->>U: 202 Same answer whether or not the email exists
    U->>A: POST /auth/password-reset/confirm with token and new password
    A->>DB: Find unused, unexpired token by hash
    A->>DB: Update password hash, mark token used
    A->>DB: Revoke all sessions and refresh tokens of the user
    A->>M: Notify user that the password changed
    A-->>U: 204 Done, please log in
```

```ts
import { createHash, randomBytes } from "node:crypto";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const RESET_TTL_MS = 30 * 60 * 1000;

export async function requestPasswordReset(email: string): Promise<void> {
  const user = await userRepo.findByEmail(email.trim().toLowerCase());
  if (!user) return; // same response for unknown emails (no enumeration)

  const token = randomBytes(32).toString("base64url"); // 256-bit, unguessable
  await resetRepo.invalidateOpenTokens(user.id);       // only one active link at a time
  await resetRepo.create({ userId: user.id, tokenHash: sha256(token), expiresAt: new Date(Date.now() + RESET_TTL_MS) });
  await mailer.send(user.email, "Reset your password", `https://shop.example/reset-password#token=${token}`);
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
  await db.transaction(async (tx) => {
    // Atomic: only one request can use the token
    const record = await tx.resetTokens.markUsed(sha256(token)); // UPDATE ... SET used_at = now() WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now() RETURNING user_id
    if (!record) throw new AppError(400, "RESET_TOKEN_INVALID", "This reset link is invalid or has expired");
    await tx.users.updatePasswordHash(record.userId, await hashPassword(newPassword));
    await tx.sessions.revokeAllForUser(record.userId);     // log out everywhere
    await tx.refreshTokens.revokeAllForUser(record.userId);
  });
  // after commit: send a "your password was changed" email
}
```

Checklist:

- **Random, single-use, short-lived token** (15–60 minutes), stored **hashed**.
- **Same response** whether the email exists.
- **Rate-limit** reset requests per IP and per email.
- The link goes to **your** fixed domain — never build it from the request's `Host` header (host header injection can send the token to an attacker's domain).
- Put the token in the URL **fragment** (`#token=`) or make the page read and POST it quickly, so it is less likely to leak via `Referer` headers and logs.
- **Validate the new password** (length, breached-password list).
- **Revoke all sessions and refresh tokens** after the change, and **notify** the user.
- Do **not** log the user in automatically if MFA is enabled — require the second factor.

---

## How to explain this in an interview

Use this for "How does authentication work in your Node API?" or "Sessions or JWT?"

1. **Define it:** "Authentication proves who the user is; authorization decides what they may do. On failure, authentication gives 401 and authorization 403 — or 404 to hide resources."
2. **Why it exists:** "Every request to a protected API must carry proof of identity, and every action must be checked, because the client can't be trusted."
3. **How it works:** "At login I verify the password against an Argon2id or scrypt hash. Then either I create a server session in Redis and send an HttpOnly, Secure, SameSite cookie, or I issue a short-lived JWT access token plus a rotating refresh token. Middleware verifies the session or token on every request and sets `req.user`. Then permission middleware handles RBAC, and the service layer checks object ownership and tenant scope."
4. **Small example:** "A customer calls `GET /orders/42`. The middleware verifies the JWT — algorithm allowlist, signature, expiry, issuer, audience — and sets `req.user`. The service queries `WHERE id = 42 AND customer_id = user.id`, so another customer's order returns 404."
5. **Where it is useful:** "Sessions for a same-site web app or a BFF; JWTs with OIDC for mobile apps, microservices and external identity providers; client credentials or API keys for machine-to-machine."
6. **Trade-offs / gotchas:** "JWTs are hard to revoke, so I keep them short and rotate refresh tokens with reuse detection. Cookies need CSRF protection; localStorage tokens are exposed to XSS. And the most common real bug is a missing ownership check, not a broken login."

---

## Common mistakes

| Mistake | Risk | Fix |
| --- | --- | --- |
| MD5/SHA-256 or encryption for passwords | Fast offline cracking after a leak | Argon2id / scrypt / bcrypt with salt |
| `scryptSync`/`bcrypt.hashSync` in request handlers | Blocks the event loop for every user | Async APIs |
| JWT without algorithm allowlist, `aud` or `iss` checks | Forged or misused tokens accepted | Strict verification options |
| Long-lived access tokens, no revocation plan | Stolen tokens work for days | 5–15 min access tokens + rotating refresh tokens |
| Secrets or personal data in JWT payloads | Readable by anyone with the token | Only IDs and coarse claims |
| Tokens in `localStorage` | Stolen by any XSS | Memory + HttpOnly refresh cookie, or BFF |
| Cookie auth without CSRF thinking | Forged state changes | SameSite, CSRF tokens, Origin checks, no state changes on GET |
| No session regeneration on login | Session fixation | `req.session.regenerate()` (Passport 0.6+ does it) |
| Only checking "logged in" for object routes | BOLA/IDOR data leaks | Ownership/tenant checks in services and queries |
| Trusting role or tenant from the request body | Privilege escalation | Take identity from the verified session/token |
| Different login errors for unknown email vs wrong password | Account enumeration | One generic message, equal timing |
| Permanent account lockout | Attackers lock out real users | Rate limits, progressive delays, CAPTCHA, MFA |
| Reset tokens stored raw, long-lived, reusable | Account takeover | Hashed, single-use, 15–60 min, revoke sessions after reset |
| Implicit or password grants in OAuth | Token leakage, phishing | Authorization code + PKCE |
| Sending the ID token to APIs | Wrong audience, wrong purpose | ID token for the client, access token for APIs |

---

## Best practices

- **Use proven building blocks:** a password-hashing library, `jose`/`openid-client`, a managed identity provider when it fits. Do not invent crypto or protocols.
- **Hash passwords with Argon2id** (or scrypt/bcrypt), store parameters with the hash, rehash on login when they change.
- **Prefer simple server sessions** for same-site browser apps; use JWT + OIDC when you need cross-service, mobile or external IdP support.
- **Keep access tokens short-lived**, verify every claim, rotate refresh tokens and detect reuse.
- **Store browser credentials in HttpOnly, Secure, SameSite cookies** (or keep tokens out of the browser with a BFF), and defend against CSRF.
- **Authorize on the server, on every request, for every object**: permissions for actions, ownership and tenant checks for data. Deny by default.
- **Protect login, signup and reset** against brute force, stuffing and enumeration; offer MFA, ideally passkeys.
- **Revoke on risk:** password change, MFA change, or suspected theft revokes sessions and refresh tokens.
- **Log security events** (logins, failures, permission denials, token reuse) without logging secrets, and alert on anomalies.
- **Test authorization** with automated tests that try forbidden actions and other users' objects.

The broader security checklist (secret management, dependency security, auth hardening) is in Authentication and authorization.

---

## Interview questions

### Q1. What is the difference between authentication and authorization?

**What the interviewer is checking:** The basic distinction, and that you apply it per request.

**Short spoken answer:**
> "Authentication answers 'who are you?' — the user proves their identity with a password, a passkey or a token. Authorization answers 'what are you allowed to do?' — for a known user, may they do this action on this resource. Authentication comes first. In HTTP, a failed authentication is 401, and a failed authorization is 403, or 404 if I don't want to reveal that the resource exists. For example, logging in is authentication; being able to cancel only your own orders is authorization. Both are checked on the server for every request."

**Follow-up questions:**
- **Can you have authorization without authentication?** — Yes, for anonymous access rules ("public products are readable by anyone") or capability URLs, but most rules need an identity.
- **Where does OAuth fit?** — OAuth 2.0 is delegated authorization; OpenID Connect adds authentication on top.

**Common mistakes:** Using the words interchangeably; returning 403 for an expired token.

**Where this is used in real projects:** Every protected API: `authenticate` middleware, then permission and ownership checks.

### Q2. How should passwords be stored? Why not SHA-256?

**What the interviewer is checking:** Password hashing fundamentals.

**Short spoken answer (30–60 seconds):**
> "Never in plain text and never encrypted, because encryption is reversible. I store a salted, slow password hash — Argon2id first, or scrypt or bcrypt. SHA-256 is designed to be fast: GPUs compute billions of them per second, so after a database leak, common passwords are cracked quickly. A password hash like Argon2id is deliberately slow and memory-hard, with a tunable cost, so each guess is expensive. The salt is random per password and stored with the hash. It makes identical passwords produce different hashes and defeats precomputed rainbow tables. I compare with a constant-time function, use the async API so I don't block the event loop, and rehash on login when I increase the cost."

**Follow-up questions:**
- **What is a pepper?** — A secret added to all passwords and stored outside the database (in a vault). It helps only if the database leaks without the app secrets; it is defense in depth, not a replacement for proper hashing.
- **bcrypt's limitation?** — It only uses the first 72 bytes of the password; enforce a maximum length or use Argon2id.
- **Why is the salt not secret?** — Its job is uniqueness, not secrecy. Stored next to the hash is fine.

**Common mistakes:** "I use SHA-256 with a salt" (still fast); hashing with a global salt; `hashSync` in handlers.

**Where this is used in real projects:** Any system with local accounts.

### Q3. Explain session-based authentication and its security settings.

**What the interviewer is checking:** Practical cookie/session knowledge.

**Short spoken answer:**
> "After a successful login, the server creates a session in a shared store like Redis with the user ID and an expiry, and sends only a random session ID in a cookie. The browser sends the cookie automatically, and the server loads the session on each request. Revocation is easy: delete the session. For security, the cookie is HttpOnly so scripts can't read it, Secure for HTTPS only, SameSite Lax or Strict against CSRF, and ideally uses the `__Host-` prefix. I regenerate the session ID at login to prevent session fixation, have idle and absolute timeouts, and destroy the session on logout. With several instances, the store must be shared."

**Follow-up questions:**
- **What is session fixation?** — An attacker gets the victim to use a session ID the attacker knows (for example via a link), the victim logs in, and the attacker now shares the logged-in session. Regenerating the ID at login defeats it.
- **Why not the default in-memory store?** — It leaks memory, is lost on restart, and doesn't work with more than one process.

**Common mistakes:** Forgetting `trust proxy` (secure cookies not set behind a proxy); storing lots of user data in the session.

**Where this is used in real projects:** Server-rendered apps, BFFs, admin panels.

### Q4. What is a JWT, and what does its signature guarantee?

**What the interviewer is checking:** Correct mental model of JWTs.

**Short spoken answer:**
> "A JWT is a compact token with three base64url parts: a header with the algorithm, a payload with claims like `sub`, `iss`, `aud` and `exp`, and a signature over the first two parts. The signature guarantees integrity and authenticity — that the token was issued by someone with the key and hasn't been changed. It does not hide anything: anyone can decode the payload, so no secrets go in it. The benefit is that an API can verify the token locally, without a database lookup. The cost is that revocation is hard, so access tokens should be short-lived."

**Follow-up questions:**
- **What must verification check?** — Algorithm allowlist, signature with the right key (by `kid`), `exp`/`nbf` with small clock skew, `iss`, `aud`; only then trust claims.
- **What is the difference between JWS and JWE?** — JWS is signed (readable), JWE is encrypted (confidential). "JWT" usually means a JWS.

**Common mistakes:** "JWTs are encrypted"; decoding without verifying (`jwt.decode` instead of `jwt.verify`).

**Where this is used in real projects:** OIDC access and ID tokens, microservice auth, mobile APIs.

### Q5. HS256 vs RS256 — when do you use each?

**Short answer:** HS256 uses one shared secret to sign and verify. It is simple and fast, but every service that verifies can also **create** tokens, and sharing the secret across many services is risky. RS256 (or ES256/EdDSA) signs with a **private key** and verifies with a **public key**, so many services can verify without being able to mint tokens, and public keys can be published at a JWKS URL with `kid`-based rotation. Use HS256 when one service issues and verifies its own tokens; use asymmetric algorithms for identity providers and multi-service systems. Always configure an algorithm allowlist to avoid algorithm-confusion attacks.

### Q6. What are the main security pitfalls of JWTs?

**What the interviewer is checking:** Depth beyond tutorials.

**Short spoken answer (30–60 seconds):**
> "First, revocation: a JWT is valid until it expires, so a stolen token can't simply be logged out. I keep access tokens to minutes and use refresh tokens that I can revoke, or a `jti` denylist for emergencies. Second, verification bugs: accepting `alg: none`, algorithm confusion between RS256 and HS256, weak HMAC secrets, or not checking `aud` and `iss`. Third, storage: tokens in localStorage can be stolen by any XSS. Fourth, payload: it's only encoded, so no sensitive data, and claims like roles can be stale until expiry. And size: large tokens on every request."

**Follow-up questions:**
- **How do you log out a JWT user?** — Delete the client's tokens, revoke the refresh token family on the server, and rely on the short access-token lifetime; for immediate kill, check a denylist or a per-user `tokenVersion` claim.
- **What is algorithm confusion?** — A server expecting RS256 is fed an HS256 token signed with the server's public key as the HMAC secret; a naive verifier that trusts the header's `alg` accepts it.

**Common mistakes:** "JWT is stateless so it's always better."

**Where this is used in real projects:** Security reviews of any token-based system.

### Q7. Sessions or JWTs for a new web application?

**What the interviewer is checking:** Trade-off judgment, not hype.

**Short spoken answer:**
> "It depends on the architecture. For a browser app talking to its own backend on the same site, I usually prefer server sessions: an opaque ID in an HttpOnly, Secure, SameSite cookie, sessions in Redis. Revocation is instant, nothing sensitive is exposed to JavaScript, and a Redis lookup is cheap. I choose JWTs when tokens must be verified by many services without a shared store, for mobile apps, or when an external identity provider issues them via OIDC — then I keep access tokens short and use rotating refresh tokens. A good middle ground for SPAs is a backend-for-frontend: session cookie to the BFF, and the BFF holds the OAuth tokens."

**Follow-up questions:**
- **Doesn't a session lookup hurt scalability?** — Redis handles very high request rates; the lookup is rarely the bottleneck compared to your database queries.
- **What do you lose with JWTs?** — Easy revocation, small cookies, and up-to-date permissions.

**Common mistakes:** "Sessions don't scale"; storing JWTs in localStorage by default.

**Where this is used in real projects:** Architecture decisions for every new product.

### Q8. Explain access tokens, refresh tokens, rotation and reuse detection.

**What the interviewer is checking:** Token lifecycle design.

**Short spoken answer (30–60 seconds):**
> "The access token is short-lived — around 5 to 15 minutes — and is sent on every API request. The refresh token lives longer, is sent only to the token endpoint, and is stored hashed in the database so it can be revoked. With rotation, every refresh returns a new refresh token and marks the old one as used. If an old, already-used token is presented again, that means it was copied — maybe stolen — so I revoke the whole family of tokens from that login, forcing a new login. That limits a stolen refresh token to one use. I mark tokens as used atomically in SQL, and allow a short grace period for parallel refreshes from two tabs."

**Code or diagram:** see [Refresh token rotation and reuse detection](#refresh-token-rotation-and-reuse-detection).

**Follow-up questions:**
- **Where does an SPA keep the refresh token?** — In an HttpOnly, Secure, SameSite=Strict cookie scoped to the refresh endpoint (or in a BFF), not in localStorage.
- **What triggers revocation?** — Logout, password change, MFA change, admin action, reuse detection.

**Common mistakes:** Long-lived access tokens; storing refresh tokens raw; non-atomic rotation.

**Where this is used in real projects:** Mobile apps, SPAs, OIDC clients.

### Q9. Where should a SPA store tokens: localStorage or cookies?

**What the interviewer is checking:** XSS vs CSRF trade-offs.

**Short spoken answer:**
> "localStorage is readable by any JavaScript on the page, so one XSS bug can steal the token and use it from anywhere until it expires. HttpOnly cookies can't be read by scripts, which removes that theft path, but the browser sends cookies automatically, so I must handle CSRF with SameSite, CSRF tokens or Origin checks. My preferred setup is a short-lived access token in memory and the refresh token in an HttpOnly, Secure, SameSite=Strict cookie — or a BFF so tokens never reach the browser. And I still fight XSS directly with output encoding and CSP, because XSS can always act as the user while the page is open."

**Follow-up questions:**
- **Does SameSite=Lax fully stop CSRF?** — It blocks cookies on cross-site POSTs and subrequests, but not on top-level GET navigations and not from same-site subdomains, so never change state on GET and add tokens or Origin checks for sensitive actions.
- **How does Angular help?** — `HttpClient` sends the `XSRF-TOKEN` cookie value as an `X-XSRF-TOKEN` header on mutating requests to relative URLs.

**Common mistakes:** Claiming cookies are "immune to XSS" or localStorage is "immune to CSRF so it's safer".

**Where this is used in real projects:** Every SPA auth design review.

### Q10. What is CSRF, and how do you prevent it?

**Short answer:** Cross-Site Request Forgery: a malicious site makes the victim's browser send a request to your site, and the browser attaches your cookies, so the request runs as the victim. It only affects **cookie-based** (or other automatically attached) credentials. Defenses: `SameSite=Lax/Strict` cookies, never changing state with `GET`, CSRF tokens (synchronizer or signed double-submit), checking the `Origin`/`Sec-Fetch-Site` headers, and requiring JSON or a custom header for APIs. Bearer tokens in the `Authorization` header are not sent automatically, so they are not vulnerable to CSRF (but are exposed to XSS if stored in JS-readable storage).

### Q11. Explain OAuth 2.0 and the Authorization Code flow with PKCE.

**What the interviewer is checking:** Protocol understanding — a classic deep question.

**Short spoken answer (30–60 seconds):**
> "OAuth 2.0 is a framework for delegated authorization: a user lets an app access their data on another service without giving it their password, with limited scopes and the option to revoke. There are four roles: resource owner, client, authorization server and resource server. In the authorization code flow, the client redirects the user to the authorization server with its client ID, redirect URI, scopes, a `state` value and, with PKCE, a code challenge — the SHA-256 hash of a random code verifier. The user logs in and consents there. The server redirects back with a one-time code. The client checks `state`, then exchanges the code plus the original code verifier at the token endpoint. The server checks that the verifier hashes to the challenge and returns the tokens. PKCE means a stolen code is useless without the verifier, which is why it's required for public clients like SPAs and mobile apps."

**Code or diagram:** see [Authorization Code flow with PKCE](#authorization-code-flow-with-pkce-the-main-flow).

**Follow-up questions:**
- **Why not return the token directly in the redirect (implicit flow)?** — Tokens in URLs leak through history, logs and referrers, and can be injected. RFC 9700 says clients should not use it.
- **Why exact redirect URI matching?** — Pattern matching has allowed attackers to redirect codes to their own pages.
- **What is `state` for if we have PKCE?** — CSRF protection of the redirect; PKCE also provides it if the server supports PKCE, but `state` is still common and harmless.

**Common mistakes:** Calling OAuth an authentication protocol; mixing up the client and the resource server.

**Where this is used in real projects:** "Sign in with Google", integrations with third-party APIs, enterprise SSO via OIDC.

### Q12. What is the difference between OAuth 2.0 and OpenID Connect? ID token vs access token?

**What the interviewer is checking:** A very common confusion.

**Short spoken answer:**
> "OAuth 2.0 is about authorization — getting an access token to call an API. It doesn't define who the user is. OpenID Connect is an identity layer on top: with the `openid` scope, the authorization server also returns an ID token, a signed JWT about the authentication event — `sub`, `iss`, `aud` set to the client ID, `exp`, `nonce`, `auth_time`. The ID token is for the client app to know who logged in; the client validates it and then creates its own session. The access token is for the API; its audience is the API, and the client should treat it as opaque. You never send the ID token to an API as a bearer token."

**Follow-up questions:**
- **Which claim identifies the user?** — `sub`, together with `iss`. Not the email.
- **What is `nonce`?** — A random value the client sends in the authorization request and checks in the ID token, to stop replayed or injected tokens.
- **What is OIDC discovery?** — `/.well-known/openid-configuration` lists the endpoints and the JWKS URL.

**Common mistakes:** Using the access token to get user identity by decoding it; sending ID tokens to APIs.

**Where this is used in real projects:** Every "Sign in with ..." button and enterprise SSO integration.

### Q13. Which OAuth grant would you use for a backend service calling another API at night?

**Short answer:** **Client credentials.** There is no user, so the service authenticates as itself (client ID + secret, or better a private-key JWT or mTLS), gets a short-lived access token with narrow scopes (`orders:read`), caches it until shortly before expiry, and calls the API. The API checks the token's audience and scopes like any other token.

### Q14. How would you implement authentication middleware in Express?

**What the interviewer is checking:** Hands-on implementation.

**Short spoken answer:**
> "An `authenticate` middleware reads the `Authorization` header, extracts the Bearer token and verifies it with a library like `jose` — fixed algorithms, issuer, audience, expiry with a small clock tolerance. It validates the claims' shape and sets `req.user` with ID, roles and tenant; I declare that property with TypeScript declaration merging. Missing or invalid tokens give 401 with a `WWW-Authenticate` header. Then a `requirePermission('orders:ship')` factory checks permissions and gives 403. Ownership and tenant checks happen in the service layer, because they need the object. I mount `authenticate` on the protected routers only, so health checks and login stay public."

**Code:** see [Auth middleware in Express](#auth-middleware-in-express).

**Follow-up questions:**
- **Why not put roles checks inside each handler?** — Middleware makes them declarative and consistent; object-level checks still belong in services.
- **How do you test it?** — Unit-test the middleware with signed test tokens (valid, expired, wrong audience) and integration-test protected routes with supertest.

**Common mistakes:** Using `jwt.decode`; trusting a `userId` from the body; forgetting async error handling on Express 4.

**Where this is used in real projects:** Every Express API.

### Q15. What is BOLA/IDOR, and how do you prevent it?

**Short answer:** Broken Object Level Authorization (also IDOR): the API authenticates the user but does not check that the requested object belongs to them, so changing `/orders/43` to `/orders/44` exposes another user's data. Prevent it by scoping queries (`WHERE id = $1 AND customer_id = $2` or `tenant_id`), checking ownership/permissions in the service layer for every object, returning `404` for objects the user may not see, taking identity only from the verified token, and writing automated tests that try cross-user access. Random IDs reduce guessing but are not authorization.

### Q16. RBAC vs ABAC — when do you use each?

**What the interviewer is checking:** Authorization modeling.

**Short spoken answer:**
> "RBAC assigns users to roles, and roles to permissions. It's simple and easy to audit, and it fits most business apps: customer, support, warehouse, admin. I check permissions in code, not role names, so new roles don't require code changes. ABAC decides using attributes of the user, the resource, the action and the environment — like 'support can refund orders in their own region under 500 euros'. It's more flexible and avoids role explosion, but it's harder to audit and test, so I keep policies in one place, sometimes with a policy engine. In practice I combine them: RBAC for coarse actions, plus attribute checks like ownership and tenant for each object."

**Follow-up questions:**
- **What is role explosion?** — Creating roles like `support-eu-small-refunds` for every combination of conditions.
- **What is ReBAC?** — Relationship-based access, like Google Drive sharing (viewer/editor of a folder), implemented with systems such as OpenFGA or SpiceDB.

**Common mistakes:** `if (user.role === "admin")` scattered everywhere; authorization only in the frontend.

**Where this is used in real projects:** Admin portals, B2B SaaS, internal tools.

### Q17. How do you guarantee tenant isolation in a multi-tenant SaaS API?

**Short answer:** Derive the tenant from the authenticated identity (token claim or session), never from a request parameter. Put `tenant_id` on every tenant-owned table and in every query and unique index; centralize it in the repository layer (or a query helper) so it cannot be forgotten. Add PostgreSQL row-level security with a per-transaction `app.tenant_id` setting as a second line of defense. Include the tenant in cache keys, job payloads, file storage paths and logs. Test cross-tenant access explicitly. Stronger isolation (schema or database per tenant) is a system design trade-off covered in [Auth architecture and multi-tenancy](../09-system-design/06-auth-architecture-and-multi-tenancy.md).

### Q18. How do you protect a login endpoint against brute force and credential stuffing?

**What the interviewer is checking:** Practical attack awareness.

**Short spoken answer:**
> "I rate-limit failed attempts both per IP and per account, with a shared Redis store so it works across instances. Instead of permanent lockouts, which let attackers lock real users out, I use progressive delays or a CAPTCHA after several failures. The error message is always 'invalid email or password' and the timing is the same whether the account exists, so attackers can't enumerate accounts — I even hash against a dummy hash for unknown emails. I check new passwords against breached-password lists, offer or require MFA, ideally passkeys, and alert on spikes of failures, which often signal credential stuffing."

**Follow-up questions:**
- **Why is credential stuffing hard to stop by IP?** — Attackers use large botnets and residential proxies, so per-account limits, breached-password checks and MFA matter more.
- **Should signup say "email already registered"?** — Better to send an email to the address ("someone tried to register with your email") and show a neutral message.

**Common mistakes:** Revealing "user not found"; only per-IP limits; in-memory limiter with many instances.

**Where this is used in real projects:** Every public login page.

### Q19. Design a secure password reset flow.

**What the interviewer is checking:** End-to-end security thinking.

**Short spoken answer (30–60 seconds):**
> "The user submits their email, and I always answer the same way, whether or not the account exists. If it exists, I generate a 256-bit random token, store only its SHA-256 hash with a 15–60 minute expiry and single-use flag, invalidate older tokens, and email a link on my fixed domain — never built from the Host header. When the user submits the token and a new password, I atomically mark the token as used if it's valid and unexpired, validate the new password, store the new hash, revoke all sessions and refresh tokens, and send a 'password changed' notification. I rate-limit both endpoints, and if the user has MFA, they still need the second factor to log in."

**Code or diagram:** see [A secure password reset flow](#a-secure-password-reset-flow).

**Follow-up questions:**
- **Why hash the reset token?** — If the database leaks, raw tokens would let attackers reset passwords.
- **Why revoke sessions?** — If the reset was triggered because of a compromise, the attacker's sessions must end.
- **What is host header injection here?** — If the link uses `req.headers.host`, an attacker can request a reset with `Host: evil.example` and the victim's email contains a link to the attacker's site with a valid token.

**Common mistakes:** Security questions; long-lived or reusable tokens; telling the user "no account with that email".

**Where this is used in real projects:** Every account system.

### Q20. How does TOTP-based MFA work? Is it phishing-resistant?

**Short answer:** At enrollment, the server generates a random secret and shares it with the authenticator app via a QR code. Both compute `HMAC-SHA1(secret, floor(unixTime / 30))`, dynamically truncate the result and reduce it to 6 digits (RFC 6238). The server accepts the current code (and usually ±1 step for clock drift), prevents reuse of the same code, and rate-limits attempts. TOTP is **not** phishing-resistant: a fake site can ask for the code and replay it in real time. **WebAuthn/passkeys** are phishing-resistant because the browser only lets the key sign for the real origin.

### Q21. How do you design API keys for a public developer API?

**Short answer:** Generate long random keys with a CSPRNG and a recognizable prefix (`sk_live_`), show them once, store only a SHA-256 hash plus a display prefix, attach an owner and scopes, allow several active keys for rotation, record last use, support revocation, rate-limit per key, and require them in a header (never in URLs). Keep secret keys out of frontend and mobile code; for browser use, give publishable keys with very limited rights or use OAuth.

### Q22. What does Passport.js do, and when would you not use it?

**Short answer:** Passport is Express middleware with pluggable strategies (local, JWT, Google, GitHub, OIDC, SAML). A strategy verifies credentials and returns a user; Passport puts it on `req.user` and, with sessions, serializes the user ID into the session (`serializeUser`/`deserializeUser`). Since 0.6 it regenerates the session on login and `req.logout()` needs a callback. Use it when you need several login methods in a classic Express app. Skip it for a simple API that only verifies JWTs from an identity provider — a small middleware with `jose` is clearer — or when you use an auth platform's SDK.

### Q23. Review this login code.

```js
app.post("/login", async (req, res) => {
  const user = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  if (!user.rows[0]) return res.status(404).json({ error: "User not found" });
  if (md5(req.body.password) !== user.rows[0].password) return res.status(401).json({ error: "Wrong password" });
  const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email, password: user.rows[0].password }, "secret");
  res.json({ token });
});
```

**What the interviewer is checking:** Spotting many auth flaws quickly.

**Answer:**
1. **SQL injection** in the email query → parameterized query.
2. **MD5** password hashes → Argon2id/scrypt/bcrypt with salt, constant-time verify.
3. **Account enumeration:** "User not found" (404) vs "Wrong password" (401) → one generic 401 message and equal timing.
4. **Password hash in the JWT payload** → readable by anyone; include only `sub` and minimal claims.
5. **Hard-coded weak secret `"secret"`** → long random secret from a secret manager, or asymmetric keys.
6. **No expiry, issuer or audience** → `expiresIn: "15m"`, `iss`, `aud`; plus a refresh token.
7. **No rate limiting**, no input validation, no MFA support.
8. **`SELECT *`** loads unnecessary sensitive columns.
9. Token returned in JSON for the SPA to put in localStorage → consider HttpOnly cookies or a BFF.

### Q24. A user changes their password. What should happen to their existing sessions and tokens?

**Short answer:** Revoke them — delete all server sessions (optionally except the current one), revoke all refresh token families, and if you need immediate effect on JWT access tokens, bump a per-user `tokenVersion` (or `passwordChangedAt`) that the API checks on sensitive routes, or rely on the short access-token lifetime. Notify the user by email. If the change was via a reset link, also require MFA on next login if enabled.

### Q25. Why do we get 401 errors right after deploying a new auth server, and how do you design key rotation?

**Short answer:** Likely the new deployment signs with a new key that verifiers do not know yet (or verifiers cached the old JWKS), so signatures fail. Proper rotation: (1) publish the new public key in the JWKS **alongside** the old one; (2) wait until all verifiers have refreshed their JWKS cache; (3) start signing with the new key (new `kid`); (4) keep the old key in the JWKS until all tokens signed with it have expired; (5) remove it. Libraries like `jose`'s `createRemoteJWKSet` refetch the JWKS when they see an unknown `kid`, which makes this smoother. With HS256 secrets, support two secrets during the transition.

---

## Summary

- **Authentication** = who you are (401 on failure); **authorization** = what you may do (403/404). Check both on the server for every request.
- Store passwords with **Argon2id** (or scrypt/bcrypt), unique salts, tuned cost, async APIs and constant-time comparison; follow modern NIST rules (length, blocklists, no forced rotation).
- **Server sessions** (random ID in an HttpOnly, Secure, SameSite cookie; store in Redis) are simple and instantly revocable; regenerate the ID at login.
- A **JWT** is signed, not encrypted. Verify algorithm (allowlist), signature, `exp`, `iss` and `aud` — use `jose`. HS256 = shared secret; RS256/ES256 = public-key verification with JWKS and `kid`.
- JWT pitfalls: revocation, `alg: none` and algorithm confusion, weak secrets, sensitive payloads, localStorage + XSS, stale claims.
- Use **short access tokens + rotating refresh tokens with reuse detection**; store refresh tokens hashed and rotate atomically.
- Cookie-based auth needs **CSRF** defenses (SameSite, tokens, Origin checks); JS-readable storage needs strong **XSS** defenses. A BFF keeps tokens out of the browser.
- **OAuth 2.0** = delegated authorization; use **authorization code + PKCE**; client credentials for machines; implicit and password grants are out.
- **OIDC** adds identity: the **ID token** is for the client, the **access token** is for the API; identify users by `iss` + `sub`.
- **RBAC** for coarse permissions, **ABAC**/ownership/tenant checks for objects; BOLA is the top API risk; RLS adds tenant defense in depth.
- Protect login and reset: rate limits per IP and account, generic messages, equal timing, MFA (passkeys are phishing-resistant), hashed single-use reset tokens, revoke sessions after password changes.

---

## References

- OWASP Password Storage Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP Authentication Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Session Management Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Forgot Password Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- OWASP Cross-Site Request Forgery Prevention Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- OWASP API Security Top 10 (2023) — https://owasp.org/API-Security/editions/2023/en/0x11-t10/
- NIST SP 800-63B-4: Authentication and Authenticator Management — https://pages.nist.gov/800-63-4/sp800-63b.html
- Node.js `crypto` (scrypt, argon2, timingSafeEqual, randomBytes) — https://nodejs.org/api/crypto.html
- RFC 7519: JSON Web Token — https://www.rfc-editor.org/rfc/rfc7519.html
- RFC 8725: JWT Best Current Practices — https://www.rfc-editor.org/rfc/rfc8725.html
- RFC 6749: The OAuth 2.0 Authorization Framework — https://www.rfc-editor.org/rfc/rfc6749.html
- RFC 7636: Proof Key for Code Exchange (PKCE) — https://www.rfc-editor.org/rfc/rfc7636.html
- RFC 9700: Best Current Practice for OAuth 2.0 Security (January 2025) — https://www.rfc-editor.org/rfc/rfc9700.html
- RFC 6750: Bearer Token Usage — https://www.rfc-editor.org/rfc/rfc6750.html
- RFC 7662: Token Introspection — https://www.rfc-editor.org/rfc/rfc7662.html
- RFC 8628: Device Authorization Grant — https://www.rfc-editor.org/rfc/rfc8628.html
- RFC 6238: TOTP — https://www.rfc-editor.org/rfc/rfc6238.html
- OpenID Connect Core 1.0 — https://openid.net/specs/openid-connect-core-1_0.html
- MDN: Set-Cookie (SameSite, cookie prefixes) — https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
- `jose` library — https://github.com/panva/jose
- `openid-client` library — https://github.com/panva/openid-client
- express-session — https://github.com/expressjs/session
- Passport.js documentation — https://www.passportjs.org/
- express-rate-limit — https://express-rate-limit.mintlify.app/
- PostgreSQL row security policies — https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Angular HttpClient XSRF protection — https://v16.angular.io/guide/http-security-xsrf-protection
