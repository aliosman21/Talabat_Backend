const validators = require("../Validators");

test("Country validator Correct name ", () => {
   expect(validators.validateCountry("Egypt")).toBe(true);
});

test("Country validator another country name ", () => {
   expect(validators.validateCountry("Canada")).toBe(true);
});
test("Country validator country name with numerics (not present)", () => {
   expect(validators.validateCountry("Australia31")).toBe(false);
});
test("Country validator city name (not present)", () => {
   expect(validators.validateCountry("Cairo")).toBe(false);
});
test("Country validator city name (not present)", () => {
   expect(validators.validateCountry("Alexandria")).toBe(false);
});
test("Country validator european country name", () => {
   expect(validators.validateCountry("France")).toBe(true);
});
test("Country validator south american country name", () => {
   expect(validators.validateCountry("Brazil")).toBe(true);
});
