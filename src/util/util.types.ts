export type Modify<T, R> = Record<keyof T, R>;
export type PickReference<T, K extends keyof T> = T[K];