export function clone(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.log(error);
    return value;
  }
}