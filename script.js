/* =========================
   LOGIN REDIRECTS
========================= */

function loginStudent(e) {
  e?.preventDefault();
  window.location.href = "student-home.html";
}

function loginPersonnel(e) {
  e?.preventDefault();
  window.location.href = "personnel-home.html";
}

function loginAdmin(e) {
  e?.preventDefault();
  window.location.href = "admin-dashboard.html";
}

/* =========================
   NAVIGATION
========================= */

function goToIndex() {
  window.location.href = "index.html";
}

function goToStudentLogin() {
  window.location.href = "student-login.html";
}

function goToPersonnelLogin() {
  window.location.href = "personnel-login.html";
}

function goToAdminLogin() {
  window.location.href = "admin-login.html";
}

/* =========================
   SAVE ASSIGNMENTS (ADMIN)
========================= */

function saveAssignments() {
  const map = {
    English: "englishEmail",
    Mathematics: "mathEmail",
    Science: "scienceEmail",
    Filipino: "filipinoEmail",
    "Araling Panlipunan": "apEmail",
    "Technology and Livelihood Education": "tleEmail",
    Reading: "readingEmail",
    MAPEH: "mapehEmail",
    "Christian Living and Values Education": "clveEmail",

    "Human Resources": "hrEmail",
    "Grade School Library": "gradeschoolEmail",
    "High School and Senior High School Library": "HsshshEmail",
    Laboratory: "laboratoryEmail",
    Cashier: "cashierEmail",
    Registrar: "registrarEmail",
    "Guidance Office": "guidanceEmail",
    "School Clinic": "clinicEmail",
    "School Canteen": "canteenEmail",

    "Safety - DRRMO": "drrmoEmail",
    "Safety - General Services": "gsEmail",

    "Grade School Level": "disciplineGS",
    "High School Level": "disciplineHS",
    "Senior High School Level": "disciplineSHS"
  };

  const assignments = {};

  for (const key in map) {
    const input = document.getElementById(map[key]);
    if (input && input.value.trim() !== "") {
      assignments[key] = input.value.trim();
    }
  }

  localStorage.setItem("emailAssignments", JSON.stringify(assignments));
  alert("Assignments saved successfully.");
}

/* =========================
   GET ASSIGNED EMAIL
========================= */

function getAssignedEmail(category) {
  const data = JSON.parse(localStorage.getItem("emailAssignments"));
  return data ? data[category] : null;
}

/* =========================
   SUBMIT ISSUE (NO FIREBASE STORAGE)
========================= */

function submitIssue(event) {
  event.preventDefault();

  const category = document.getElementById("service").value;
  const toEmail = getAssignedEmail(category);

  if (!toEmail) {
    alert("No assigned email for this category.");
    return;
  }

  emailjs.sendForm(
    "service_9uy34u8",
    "template_0vqldng",
    event.target,
    "xjCLN6pfkwHRa0yIu"
  )
  .then(() => redirectThankYou())
  .catch(() => alert("Failed to send email."));
}

/* =========================
   THANK YOU REDIRECT
========================= */

function redirectThankYou() {
  if (location.pathname.includes("student")) {
    location.href = "student-thankyou.html";
  } else {
    location.href = "personnel-thankyou.html";
  }
}

/* =========================
   EXPOSE TO HTML (IMPORTANT)
========================= */

window.loginStudent = loginStudent;
window.loginPersonnel = loginPersonnel;
window.loginAdmin = loginAdmin;
window.goToIndex = goToIndex;
window.goToStudentLogin = goToStudentLogin;
window.goToPersonnelLogin = goToPersonnelLogin;
window.goToAdminLogin = goToAdminLogin;
window.saveAssignments = saveAssignments;
window.submitIssue = submitIssue;






