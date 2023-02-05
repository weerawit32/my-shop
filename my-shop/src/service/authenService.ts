import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

const useAuthenService = () => {
  const router = useRouter();
  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      console.log("test", email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      await signIn({ email, password });
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
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
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
