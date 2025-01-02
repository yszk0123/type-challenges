/*
  399 - Tuple Filter
  -------
  by Ryo Hanafusa (@softoika) #上級 #tuple #infer

  ### 質問

  タプル`T`から指定された型`F`をフィルタリングする`FilterOut<T, F>`を実装します。

  例えば、

  ```ts
  type Filtered = FilterOut<[1, 2, null, 3], null>; // [1, 2, 3]
  ```

  > GitHubで確認する：https://tsch.js.org/399/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Is<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type FilterOut<T extends unknown[], F> = T extends [infer Head, ...infer Rest]
  ? [...([Head] extends [F] ? [] : [Head]), ...FilterOut<Rest, F>]
  : [];
type a = FilterOut<[], never>;
type b0 = FilterOut<[never], never>;
type b = FilterOut<['a'], never>;
type c = FilterOut<['a', 'b'], never>;
type d = FilterOut<['a', 'b'], 'b'>;
type e = FilterOut<
  [never, 1, 'a', undefined, false, null],
  never | null | undefined
>;
type f = FilterOut<
  [number | null | undefined, never],
  never | null | undefined
>;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<
    Equal<
      FilterOut<
        [never, 1, 'a', undefined, false, null],
        never | null | undefined
      >,
      [1, 'a', false]
    >
  >,
  Expect<
    Equal<
      FilterOut<[number | null | undefined, never], never | null | undefined>,
      [number | null | undefined]
    >
  >,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/399/answer/ja
  > 解答を見る：https://tsch.js.org/399/solutions
  > その他の課題：https://tsch.js.org/ja
*/
