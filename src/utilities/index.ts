export function clone(value: any) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.log(error);
    return value;
  }
}