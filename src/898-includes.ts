/*
  898 - Includes
  -------
  by null (@kynefuk) #初級 #array

  ### 質問

  JavaScriptの`Array.include`関数を型システムに実装します。この型は、2 つの引数を受け取り、`true`や`false`を出力しなければなりません。

  例えば：

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHubで確認する：https://tsch.js.org/898/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Is<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Includes<T extends readonly unknown[], U> = T extends [
  infer Head,
  ...infer Rest,
]
  ? Is<Head, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
// type Includes<T extends readonly unknown[], U> = Is<T[number], U>;
type a = Includes<['Kars', 'a'], 'Kars'>;
type b = Includes<[{}], { a: 'A' }>;
type c = Includes<[boolean], false>;
type d = boolean extends false ? 1 : 0;
type e = [] extends [] ? 1 : 0;
type f = Includes<[], false>;
type g = Includes<[1 | 2], 1>;
type h = Includes<[1], 1 | 2>;
type i1 = Is<{ readonly a: 'A' }, { a: 'A' }>;
type i2 = Is<{ a: 'A' }, { readonly a: 'A' }>;
type aaa = [1, 2][1];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/898/answer/ja
  > 解答を見る：https://tsch.js.org/898/solutions
  > その他の課題：https://tsch.js.org/ja
*/
