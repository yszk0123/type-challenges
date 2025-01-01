/*
  59 - Get Optional
  -------
  by Zheeeng (@zheeeng) #上級 #utils #infer

  ### 質問

  オプショナルなフィールドのみを残す高度なユーティリティ型 `GetOptional<T>` を実装してください。

  例えば

  ```ts
  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
  ```

  > GitHubで確認する：https://tsch.js.org/59/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Is<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type OptionalKey<T> = {
  [K in keyof T]: Is<T[K], Required<T>[K]> extends false ? K : never;
}[keyof T] &
  string;
type GetOptional<T> = Pick<T, OptionalKey<T>>;
type a = GetOptional<{ foo: number }>;
type b = GetOptional<{ foo: number; bar?: string }>;
type c = GetOptional<{ foo: undefined; bar?: undefined }>;
type c0 = Required<{ foo: number; bar?: string }>;
type c1 = Required<{ foo: undefined; bar?: undefined }>;
type c2 = OptionalKey<{ foo: number; bar?: string }>;
type c3 = OptionalKey<{ foo: undefined; bar?: undefined }>;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/59/answer/ja
  > 解答を見る：https://tsch.js.org/59/solutions
  > その他の課題：https://tsch.js.org/ja
*/
