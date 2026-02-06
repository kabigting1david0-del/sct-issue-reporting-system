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

  const form = event.target;
  const select = form.querySelector("select");
  const textarea = form.querySelector("textarea");

  if (!select || !textarea) {
    alert("Form error.");
    return;
  }

  const category = select.value;
  const toEmail = getAssignedEmail(category);

  if (!toEmail) {
    alert("No assigned personnel for this category.");
    return;
  }

  emailjs.sendForm(
    "service_9uy34u8",
    "template_0vqldng",
    form,
    "xjCLN6pfkwHRa0yIu"
  ).then(() => {
    redirectThankYou();
  }).catch(error => {
    console.error(error);
    alert("Email failed to send.");
  });
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

function submitIssueWithFile(event) {
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

        return emailjs.send("service_9uy34u8", "template_0vqldng", {
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

function saveAssignments() {
  const fields = [
    "englishEmail",
    "mathEmail",
    "scienceEmail",
    "filipinoEmail",
    "apEmail",
    "tleEmail",
    "readingEmail",
    "mapehEmail",
    "clveEmail",
    "hrEmail",
    "gradeschoolEmail", 
    "HsshshEmail", 
    "laboratoryEmail",
    "cashierEmail",
    "registrarEmail",
    "guidanceEmail",
    "clinicEmail",
    "canteenEmail",
    "drrmoEmail",
    "gsEmail",
    "disciplineGS",
    "disciplineHS",
    "disciplineSHS"
  ];

  fields.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      localStorage.setItem(id, input.value);
    }
  });

  alert("Email assignments saved successfully.");
}

function getAssignedEmail(category) {
  const map = {
  "English": "englishEmail",
  "Mathematics": "mathEmail",
  "Science": "scienceEmail",
  "Filipino": "filipinoEmail",
  "Araling Panlipunan": "apEmail",
  "Technology and Livelihood Education": "tleEmail",
  "Reading": "readingEmail",
  "MAPEH": "mapehEmail",
  "Christian Living and Values Education": "clveEmail",

  "Human Resources": "hrEmail",
  "Grade School Library": "gradeschoolEmail",
  "High School and Senior High School Library": "HsshshEmail",
  "Laboratory": "laboratoryEmail",
  "Cashier": "cashierEmail",
  "Registrar": "registrarEmail",
  "Guidance Office": "guidanceEmail",
  "School Clinic": "clinicEmail",
  "School Canteen": "canteenEmail",

  "Grade School Level": "disciplineGS",
  "High School Level": "disciplineHS",
  "Senior High School Level": "disciplineSHS",

  "Safety - DRRMO": "drrmoEmail",
  "Safety - General Services": "gsEmail"
};


  const key = map[category];
  return key ? localStorage.getItem(key) : null;
}

function redirectThankYou() {
  const path = window.location.pathname;

  if (path.includes("student-")) {
    window.location.href = "student-thankyou.html";
  } else if (path.includes("personnel-")) {
    window.location.href = "personnel-thankyou.html";
  }
}
window.goToIndex = goToIndex;
window.goToAdminLogin = goToAdminLogin;
window.goToStudentLogin = goToStudentLogin;
window.goToPersonnelLogin = goToPersonnelLogin;
window.goStudentHome = goStudentHome;
window.goPersonnelHome = goPersonnelHome;

function submitAcademicIssue(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const subjectKey = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const assignments = JSON.parse(localStorage.getItem("academicAssignments"));

  if (!assignments || !assignments[subjectKey]) {
    alert("No assigned email for this subject.");
    return;
  }

  emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    to_email: assignments[subjectKey],
    first_name: firstName,
    last_name: lastName,
    email: email,
    subject: subjectKey,
    message: message
  })
  .then(() => {
    window.location.href = "student-thankyou.html";
  })
  .catch(() => {
    alert("Failed to send email.");
  });
}




