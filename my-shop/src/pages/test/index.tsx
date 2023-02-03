import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useEffect, useState } from "react";

const Test = () => {
  const [user, setUser] = useState<DocumentData>();
  const docRef = doc(db, "user", "user1");
  const getUser = async () => {
    try {
      const user = await getDoc(docRef).then((user) => user.data());
      console.log("user", user);
      setUser(user);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {});

  if (user) {
    console.log("user", user.name);
  }
  return <div>Test</div>;
};

export default Test;
