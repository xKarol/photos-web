type ReturnStatus = void | unknown;

export interface Api {
  subscribe: (email: string) => Promise<ReturnStatus>;
}
// @ts-expect-error
export interface Services extends Api {
  subscribe: (payload: { email: string }) => Promise<unknown>;
}
