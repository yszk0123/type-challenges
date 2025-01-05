/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object

  ### Question

  Implement the type of `just-flip-object`. Examples:

  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```

  No need to support nested objects and values which cannot be object keys such as arrays

  > View on GitHub: https://tsch.js.org/4179
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
// TODO: more simple and robust solution
type FlipUnion<T> = {
  [K in keyof T]: T[K] extends string | number | boolean ? Record<`${T[K]}`, K> : never;
}[keyof T];
type Flatten<T> = Pick<T, keyof T>;
type Flip<T> = Flatten<UnionToIntersection<FlipUnion<T>>>;

type b = FlipUnion<{ a: 'foo'; b: 'bar' }>;
type c = FlipUnion<{ a: 'foo'; b: true; pi: 3.14 }>;
type d = Flatten<Flip<{ a: 'foo'; b: true; pi: 3.14 }>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/
