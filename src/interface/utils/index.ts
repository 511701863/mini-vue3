
declare type GetKey<T extends object> = keyof T

declare type GetValue<T extends object> = T[keyof T]

declare type DeepGetKey<T> = T extends object ? {
  [k in keyof T]: k extends string ? k | `${k}.${DeepGetKey<T[k]>}` : never;
}[keyof T] : never;
