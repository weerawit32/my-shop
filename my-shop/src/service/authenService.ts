import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

const useAuthenService = () => {
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {}
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {}
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    signUp,
    signIn,
    logout,
  };
};

export default useAuthenService;
