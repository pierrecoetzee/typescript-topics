// Without generics - you'd need separate functions
function getFirstString(arr: string[]): string {
  return arr[0];
}
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// With generics - one function for all types
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Usage - TypeScript infers the type
const firstString = getFirst(["hello", "world"]); // Type: string
const firstNumber = getFirst([1, 2, 3]); // Type: number
const firstUser = getFirst([{id: 1, name: "John"}]); // Type: {id: number, name: string}