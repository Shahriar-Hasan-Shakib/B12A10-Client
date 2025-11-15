// TypeScript types for User and Auth
import type { User } from 'firebase/auth';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (credentials: RegisterCredentials) => Promise<void>;
    signIn: (credentials: LoginCredentials) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    getIdToken: () => Promise<string | undefined>;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    photoURL: string;
}
