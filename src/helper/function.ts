export function pipe<T>(...func: any) {
  return function(x: T) {
    return func.reduce((v: T, f: Function) => {
      return f(v) as T
    }, x);
  }
}

export const curryingGetByField = (field: string) => (objects: any[]) => objects.map(object => object[field] || undefined)