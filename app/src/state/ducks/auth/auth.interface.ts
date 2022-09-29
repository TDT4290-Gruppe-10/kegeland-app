export interface AuthState {
  loading: boolean;
  userInfo: unknown;
  userToken: string | null;
  error: string | null;
  success: boolean;
}
