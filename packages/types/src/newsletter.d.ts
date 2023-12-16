type ReturnStatus = void | unknown;

export interface Api {
  subscribe: (email: string) => Promise<ApiResponse["subscribe"]>;
}
// @ts-expect-error
export interface Services extends Api {
  subscribe: (payload: { email: string }) => Promise<unknown>;
}

export type ApiResponse = {
  subscribe: ReturnStatus;
};
