import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";
test("retained banking example enforces finite positive withdrawal and overdraft floor", async () => {
  const source=await readFile(new URL("../archive/12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js",import.meta.url),"utf8");
  const context=vm.createContext({ console:{log(){},error(){}} });
  new vm.Script(source).runInContext(context,{ timeout:1000 });
  assert.equal(vm.runInContext('const sample = new CurrentAccount("x",100,20); sample.withdraw(110); sample.getBalance()',context),-10);
  assert.throws(()=>vm.runInContext("sample.withdraw(11)",context),/Overdraft/);
  assert.throws(()=>vm.runInContext("sample.withdraw(-1)",context),/Invalid withdrawal/);
  assert.throws(()=>vm.runInContext("sample.withdraw(NaN)",context),/Invalid withdrawal/);
  assert.throws(()=>vm.runInContext("sample.deposit(Infinity)",context),/greater than zero/);
});
