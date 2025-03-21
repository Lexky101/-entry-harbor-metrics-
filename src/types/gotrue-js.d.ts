declare module 'gotrue-js' {
  export interface GoTrueUser {
    email: string;
    user_metadata: {
      full_name?: string;
      avatar_url?: string;
    };
    logout(): Promise<void>;
  }

  interface GoTrueSession {
    user: GoTrueUser;
  }

  interface GoTrueSubscription {
    unsubscribe: () => void;
  }

  interface GoTrueAuthResponse {
    data: {
      user: GoTrueUser;
      session: GoTrueSession;
      subscription: GoTrueSubscription;
    };
    error: Error | null;
  }

  interface GoTrueOAuthOptions {
    provider: 'google' | 'github' | 'gitlab' | 'bitbucket';
    options?: {
      redirectTo?: string;
      queryParams?: {
        access_type?: 'offline' | 'online';
        prompt?: 'consent' | 'select_account' | 'none';
      };
    };
  }

  class GoTrue {
    constructor(config: {
      APIUrl: string;
      audience: string;
      setCookie: boolean;
    });

    currentUser(): GoTrueUser | null;
    onAuthStateChange(callback: (event: 'SIGNED_IN' | 'SIGNED_OUT', session: GoTrueSession | null) => void): GoTrueAuthResponse;
    login(email: string, password: string, remember?: boolean): Promise<GoTrueUser>;
    signInWithOAuth(options: GoTrueOAuthOptions): Promise<GoTrueAuthResponse>;
    signup(email: string, password: string, data?: Record<string, any>): Promise<GoTrueUser>;
    logout(): Promise<void>;
  }

  export default GoTrue;
} 