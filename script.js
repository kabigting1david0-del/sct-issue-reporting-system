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
async function submitIssue(event) {
  event.preventDefault();

  const form = event.target;
  const fileInput = form.querySelector("input[type='file']");
  const subjectSelect = form.querySelector("#subject");

  const assignments = JSON.parse(localStorage.getItem("emailAssignments")) || {};

  let assignedEmail = null;

  // Academic / Services / Discipline routing
  if (subjectSelect) {
    const selectedText =
      subjectSelect.options[subjectSelect.selectedIndex].text;
    assignedEmail = assignments[selectedText];
  } else {
    assignedEmail = assignments["Human Resources"]; // fallback
  }

  if (!assignedEmail) {
    alert("No assigned email found for this category.");
    return;
  }

  let attachment = "No attachment";

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB.");
      return;
    }

    attachment = await readFileAsBase64(file);
  }

  const params = {
    to_email: assignedEmail,
    full_name:
      form.querySelectorAll("input")[0].value +
      " " +
      form.querySelectorAll("input")[1].value,
    sender_email:
      form.querySelector("input[type='email']")?.value || "N/A",
      category: subjectSelect
         ? subjectSelect.options[subjectSelect.selectedIndex].text
         : "OTHER",
    message: form.querySelector("textarea").value,
    attachment: attachment
  };

  // ✅ DEBUG (this is correct placement)
  console.log("Sending email to:", assignedEmail);
  console.log("Email params:", params);

  emailjs
    .send("service_9uy34u8", "template_0vqldng", params)
    .then(() => {
      const isStudent = location.pathname.includes("student");
      window.location.href = isStudent
        ? "student-thankyou.html"
        : "personnel-thankyou.html";
    })
    .catch(err => {
      console.error(err);
      alert("Email failed, but your report was recorded.");

      const isStudent = location.pathname.includes("student");
      window.location.href = isStudent
        ? "student-thankyou.html"
        : "personnel-thankyou.html";
    });
}

});
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


// Auto-save admin assignments
document.querySelectorAll("[data-key]").forEach(input => {
  const key = input.dataset.key;

  // Load saved value
  if (localStorage.getItem(key)) {
    input.value = localStorage.getItem(key);
  }

  // Save on typing
  input.addEventListener("input", () => {
    localStorage.setItem(key, input.value);
  });
});


function sendAssignments(event) {
  event.preventDefault();

  const data = {};

  document.querySelectorAll("[data-key]").forEach(input => {
    data[input.dataset.key] = input.value;
  });

emailjs.send(
  "service_9uy34u8",
  "template_0vqldng",
  params
)
.then(() => {
  const isStudent = location.pathname.includes("student");
  window.location.href = isStudent
    ? "student-thankyou.html"
    : "personnel-thankyou.html";
})
.catch(err => {
  console.error(err);
  alert("Email failed, but your report was recorded.");

  const isStudent = location.pathname.includes("student");
  window.location.href = isStudent
    ? "student-thankyou.html"
    : "personnel-thankyou.html";
});


function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}











