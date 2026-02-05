/* =========================
   LOGIN REDIRECTS
========================= */

function loginStudent() {
  window.location.href = "student-home.html";
}

function loginPersonnel() {
  window.location.href = "personnel-home.html";
}

function loginAdmin() {
  window.location.href = "admin-dashboard.html";
}

/* =========================
   ISSUE SUBMISSION
========================= */

function submitIssue(event) {
  event.preventDefault();

  // Detect which page submitted the form
  const page = window.location.pathname;

  if (page.includes("student")) {
    window.location.href = "student-thankyou.html";
  } 
  else if (page.includes("personnel")) {
    window.location.href = "personnel-thankyou.html";
  }
  else {
    alert("Submission error: page not recognized.");
  }
}
/* =========================
   STUDENT NAVIGATION
========================= */

function goStudentHome() {
  window.location.href = "student-home.html";
}

function goToStudentLogin() {
  window.location.href = "student-login.html";
}

/* =========================
   PERSONNEL NAVIGATION
========================= */

function goPersonnelHome() {
  window.location.href = "personnel-home.html";
}

function goToPersonnelLogin() {
  window.location.href = "personnel-login.html";
}

/* =========================
   ADMIN NAVIGATION
========================= */

function goToAdminLogin() {
  window.location.href = "admin-login.html";
}

/* =========================
   GLOBAL NAVIGATION
========================= */

function goToIndex() {
  window.location.href = "index.html";
}


import { db } from "./firebase.js";
import { doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

function submitIssue(event) {
  event.preventDefault();

  const category = document.getElementById("service").value.toLowerCase();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const file = document.getElementById("file").files[0];

  const storage = getStorage();
  const fileRef = ref(storage, `issues/${Date.now()}_${file.name}`);

  uploadBytes(fileRef, file)
    .then(() => getDownloadURL(fileRef))
    .then(url => {
      return getDoc(doc(db, "assignments", category)).then(docSnap => {
        if (!docSnap.exists()) throw "No assignment found";

        return emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
          to_email: docSnap.data().email,
          category: category,
          first_name: firstName,
          last_name: lastName,
          email: email,
          message: message,
          file_url: url
        });
      });
    })
    .then(() => {
      window.location.href = "personnel-thankyou.html";
    })
    .catch(err => alert(err));
}
