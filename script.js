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
