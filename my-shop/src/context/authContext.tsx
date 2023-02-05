import { createContext, ReactNode, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

type authContextType = {
  uid: string;
  name: string;
};

export const authContext = createContext<authContextType>({
  uid: "",
  name: "",
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    uid: "",
    name: "",
  });

  useEffect(() => {
    const unSubscibe = onAuthStateChanged(auth, (currenUser) => {
      if (currenUser) {
        setUser({
          uid: currenUser?.uid,
          name: currenUser?.displayName,
        });
      } else {
        setUser({
          uid: null,
        });
      }

      if (currenUser && ["/login", "/register"].includes(router.pathname)) {
        router.push("/");
      }
    });

    return () => {
      unSubscibe();
    };
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthProvider;
