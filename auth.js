import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Get user role from Firestore
async function getUserRole(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) throw new Error("User document not found");
  return snap.data().role;
}

// Login function
async function login(redirectPage, event) {
  if (event) event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const role = await getUserRole(uid);

    // Role-based redirect
    const rolePages = {
      student: "student-home.html",
      personnel: "personnel-home.html",
      admin: "admin-dashboard.html"
    };

    if (rolePages[role] === redirectPage) {
      window.location.href = redirectPage;
    } else {
      alert("Access denied for your role");
      await signOut(auth);
    }
  } catch (err) {
    alert(err.message);
  }
}

// Export login handlers
window.loginStudent = (e) => login("student-home.html", e);
window.loginPersonnel = (e) => login("personnel-home.html", e);
window.loginAdmin = (e) => login("admin-dashboard.html", e);

// Page protection
window.protectPage = async function(allowedRoles = []) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    if (allowedRoles.length > 0) {
      const role = await getUserRole(user.uid);
      if (!allowedRoles.includes(role)) {
        alert("Access denied for your role");
        await signOut(auth);
        window.location.href = "index.html";
      }
    }
  });
};

// Logout
window.logout = function() {
  signOut(auth).then(() => window.location.href = "index.html");
};
