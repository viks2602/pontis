export interface AuthContextValue {
    user: string | null | undefined;
    login: (accessToken: string) => void;
    logout: () => void;
  }