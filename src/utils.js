function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join("");
}

function isInstanceOf(value, klass) {
  if (!(value instanceof klass)) {
    throw new Error("The filled value isn't a " + klass + ".");
  }
}

function isNumber(value) {
  if (typeof value !== "number") {
    throw new Error("The filled value isn't a number. " + value);
  }
}

function isString(value) {
  if (typeof value !== "string") {
    throw new Error("The filled value isn't a string. " + value);
  }
}

export { capitalize, isInstanceOf, isNumber, isString };
