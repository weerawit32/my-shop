import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
// import { useRouter } from "next/router";

const useAuthenService = () => {
  // const router = useRouter();
  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {}
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("result", result);
    } catch (e) {
      console.log("error", e);
    }
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
