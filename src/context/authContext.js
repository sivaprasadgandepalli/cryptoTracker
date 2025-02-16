import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();
const LOCAL_STORAGE_KEY = "authUser";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userData = {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                };
                sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
                setUser(userData);
            } else {
                sessionStorage.removeItem(LOCAL_STORAGE_KEY);
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Google Sign-In
    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    // Email/Password Sign-Up
    const signUpWithEmail = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during email/password sign-up:", error);
            throw error; // Re-throw the error for handling in the UI
        }
    };

    // Email/Password Login
    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during email/password login:", error);
            throw error; // Re-throw the error for handling in the UI
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                googleSignIn,
                signUpWithEmail,
                loginWithEmail,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};