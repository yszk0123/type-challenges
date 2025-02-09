/*
  2059 - Drop String
  -------
  by CaptainOfPhB (@CaptainOfPhB) #hard #template-literal #infer

  ### Question

  Drop the specified chars from a string.

  For example:

  ```ts
  type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'
  ```

  > View on GitHub: https://tsch.js.org/2059
*/

/* _____________ Your Code Here _____________ */

type DropString<S, R> = R extends `${infer A}${infer B}`
  ? DropString<DropStringSegment<S, A>, B>
  : S;
type DropStringSegment<S, R extends string> = [S] extends [
  `${infer A}${R}${infer B}`,
]
  ? `${DropStringSegment<A, R>}${DropStringSegment<B, R>}`
  : [S] extends [`${R}${infer Rest}`]
    ? DropStringSegment<Rest, R>
    : [S] extends [`${infer Rest}${R}`]
      ? DropStringSegment<Rest, R>
      : S;
type a = DropString<'butter fly!', ''>;
type b = DropString<'butter fly!', ' '>;
type c = DropString<'butter fly!', 'but'>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2059/answer
  > View solutions: https://tsch.js.org/2059/solutions
  > More Challenges: https://tsch.js.org
*/
