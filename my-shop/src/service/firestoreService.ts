import { app } from "@/firebase/firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const useFirestoreService = () => {
  const db = getFirestore(app);
};
