// eslint-disable-next-line @typescript-eslint/no-namespace
namespace R {
    export interface __ {
        '@@functional/placeholder': true
    }
}

// 泛型工具函数
type Pos<I extends unknown[]> = Length<I>

type Next<I extends unknown[]> = Prepend<unknown, I>

type Prev<I extends unknown[]> = Tail<I>

type IteratorTs<Index extends number = 0, From extends unknown[] = [], Temp extends unknown[] = []> =
    Pos<Temp> extends Index ? From : IteratorTs<Index, Next<From>, Next<Temp>>

type Reverse<T extends unknown[], R extends unknown[] = [], Temp extends unknown[] = []> =
    Pos<Temp> extends Length<T> ? R : Reverse<T, Prepend<T[Pos<Temp>], R>, Next<Temp>>

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]

type Append<E, T extends unknown[]> = [...T, E]

// 获取第一个参数
type Head<T extends unknown[]> =
    T extends [infer First, ...unknown[]] ? First : never

// 去除第一个参数
type Tail<T extends unknown[]> =
    // eslint-disable-next-line no-unused-vars
    ((...args: T) => unknown) extends ((arg0: any, ...tail: infer TailResult) => unknown)
    ? TailResult
    : []

// 判断Tail是否消耗完毕
type HasTail<T extends unknown[]> =
    T extends ([] | [unknown]) ? false : true

// 获取参数长度
type Length<T extends unknown[]> = T['length']

// 在元组的头部增加新类型
type Prepend<E, T extends unknown[]> =
    // eslint-disable-next-line no-unused-vars
    ((head: E, ...args: T) => unknown) extends ((...args: infer U) => unknown)
    ? U
    : T

// 在元组的头部删除
type Drop<N extends number, T extends unknown[], Temp extends unknown[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, Temp>>,
    1: T
}[Length<Temp> extends N ? 1 : 0]

// 占位分析
type Cast<X, Y> = X extends Y ? X : Y

type GapOf<T1 extends unknown[], T2 extends unknown[], TN extends unknown[], I extends unknown[]> =
    T1[Pos<I>] extends R.__
    ? Append<T2[Pos<I>], TN>
    : TN

type GapsOf<T1 extends unknown[], T2 extends unknown[], TN extends unknown[] = [], I extends unknown[] = []> = {
    0: GapsOf<T1, T2, GapOf<T1, T2, TN, I>, Next<I>>
    1: Concat<TN, Cast<Drop<Pos<I>, T2>, unknown[]>>
}[
    Pos<I> extends Length<T1> ? 1 : 0
]

type PartialGaps<T extends unknown[]> = {
    [K in keyof T]?: T[K] | R.__
}

type CleanedGaps<T extends unknown[]> = {
    [K in keyof T]: NonNullable<T[K]>
}
type Gaps<T extends unknown[]> = CleanedGaps<PartialGaps<T>>

type Curry<P extends unknown[], R> =
    <T extends unknown[]>(...args: Cast<T, Gaps<P>>) =>
        GapsOf<T, P> extends [unknown, ...unknown[]]
        ? Curry<GapsOf<T, P>, R>
        : R
// 柯里化
declare function curry<P extends unknown[], R>(fn: (...args: P) => R): Curry<P, R>
