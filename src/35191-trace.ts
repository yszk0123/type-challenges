/*
  35191 - Trace
  -------
  by csharpython (@csharpython) #中級

  ### 質問

  行列において、トレースは主対角成分の総和です。
  それを型システムを使って求めたいです。
  しかし、型で数を足すのは難しいため、代わりに主対角成分のユニオン型を求めてください。

  例：
  ```ts
  type Arr = [
    [1,2],
    [3,4]
  ]
  type Test = Trace<Arr> // expected to be 1 | 4
  ```

  > GitHubで確認する：https://tsch.js.org/35191/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Head<T> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T> = T extends [unknown, ...infer Rest] ? Rest : never;
type Take1x1<T extends unknown[][]> = Head<Head<T>>;
type DropFirstColumn<T extends unknown[][]> = T extends [
  infer FirstRow extends unknown[],
  ...infer RestRow extends unknown[][],
]
  ? [Tail<FirstRow>, ...DropFirstColumn<RestRow>]
  : [];
type DropFirstColumnAndRow<T extends unknown[][]> = Tail<DropFirstColumn<T>>;
type TraceArray<T extends unknown[][]> = T extends [
  infer FirstRow,
  ...infer RestRow extends unknown[][],
]
  ? [Head<FirstRow>, ...TraceArray<DropFirstColumn<RestRow>>]
  : [];
type Trace<T extends unknown[][]> = TraceArray<T>[number];

type a = DropFirstColumn<[[1, 2], [3, 4]]>;
type b = DropFirstColumn<[[], []]>;
type c = Take1x1<[[1, 2], [3, 4]]>;
type d = DropFirstColumnAndRow<[[1, 2], [3, 4]]>;
type e = Trace<[[1, 2], [3, 4]]>;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trace<[[1, 2], [3, 4]]>, 1 | 4>>,
  Expect<Equal<Trace<[[0, 1, 1], [2, 0, 2], [3, 3, 0]]>, 0>>,
  Expect<Equal<Trace<[['a', 'b', ''], ['c', '', ''], ['d', 'e', 'f']]>, 'a' | '' | 'f'>>,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/35191/answer/ja
  > 解答を見る：https://tsch.js.org/35191/solutions
  > その他の課題：https://tsch.js.org/ja
*/
