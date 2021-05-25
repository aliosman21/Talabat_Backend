const validators = require("../Validators");

test("Name validator small case with spaces", () => {
   expect(validators.validateName("ali amr osman")).toBe(true);
});

test("Name validator only characters no spaces", () => {
   expect(validators.validateName("aaaaaaa")).toBe(true);
});
test("Name validator mixed characters with spaces", () => {
   expect(validators.validateName("gsagd gasdgd ")).toBe(true);
});
test("Name validator with numerics", () => {
   expect(validators.validateName("sadgs3")).toBe(false);
});
test("Name validator only numerics", () => {
   expect(validators.validateName("5123")).toBe(false);
});
test("Name validator one name only", () => {
   expect(validators.validateName("Mohamed")).toBe(true);
});
test("Name validator pascal cased name with spaces", () => {
   expect(validators.validateName("Ali Amr Osman")).toBe(true);
});
