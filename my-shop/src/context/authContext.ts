import { createContext, ReactNode, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const authContext = createContext(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const value = { user, setUser };
//   onAuthStateChanged(auth, (currenUser) => {
//     console.log(currenUser);
//   });

//   return <authContext.Provider>{children}</authContext.Provider>;
// };
