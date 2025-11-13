import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { type User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as _signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@src/config/firebase";
import type { AuthContextType, LoginCredentials, RegisterCredentials } from "@src/types";
import { AuthContext } from "@src/hooks";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const signUp = async ({ email, password, name, photoURL }: RegisterCredentials) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL || "" });
        setUser(userCredential.user);

        // Get and store the auth token
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', token);
    };
    const signIn = async ({ email, password }: LoginCredentials): Promise<void> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Get and store the auth token
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', token);
    };
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        // Get and store the auth token
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', token);
    };
    const signOut = async () => {
        await _signOut(auth);
        // Clear auth token from localStorage
        localStorage.removeItem('authToken');
    };
    const getIdToken = async () => {
        return user?.getIdToken();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            // Store or remove token based on auth state
            if (currentUser) {
                const token = await currentUser.getIdToken();
                localStorage.setItem('authToken', token);
            } else {
                localStorage.removeItem('authToken');
            }

            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value: AuthContextType = { loading, user, signUp, signIn, signOut, signInWithGoogle, getIdToken };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
