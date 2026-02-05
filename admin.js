import { db } from "./firebase.js";
import { doc, setDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveAssignment(category, name, email) {
  await setDoc(doc(db, "assignments", category), {
    name: name,
    email: email
  });
}
