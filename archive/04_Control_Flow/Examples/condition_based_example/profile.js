const length = 800, width = 600, L = 640, W = 480;
if (length >= L && width >= W) {
  console.log("Upload");
} else if (length < L) {
  console.log("Increase Length");
} else if (width < W) {
  console.log("Increase Width");
}
