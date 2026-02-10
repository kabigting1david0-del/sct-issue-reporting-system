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
    "English": { name: "englishName", email: "englishEmail" },
    "Mathematics": { name: "mathName", email: "mathEmail" },
    "Science": { name: "scienceName", email: "scienceEmail" },
    "Filipino": { name: "filipinoName", email: "filipinoEmail" },
    "Araling Panlipunan": { name: "apName", email: "apEmail" },
    "Technology and Livelihood Education": { name: "tleName", email: "tleEmail" },
    "Reading": { name: "readingName", email: "readingEmail" },
    "MAPEH": { name: "mapehName", email: "mapehEmail" },
    "Christian Living and Values Education": { name: "clveName", email: "clveEmail" },

    "Human Resources": { name: "hrName", email: "hrEmail" },
    "Grade School Library": { name: "gradeschoolName", email:"gradeschoolEmail" },
    "High School and Senior High School Library": {name:"HsshshsName", email:"HsshshEmail" },
    "Laboratory": { name: "laboratoryName", email: "laboratoryEmail" },
    "Cashier": { name: "cashierName", email: "cashierEmail" },
    "Registrar": { name: "registrarName", email: "registrarEmail" },
    "Guidance Office": { name: "guidanceName", email: "guidanceEmail" },
    "School Clinic": { name: "clinicName", email: "clinicEmail" },
    "School Canteen": { name: "canteenName", email: "canteenEmail" },

    "Grade School Level": { name: "disciplineGSName", email: "disciplineGS" },
    "High School Level": { name: "disciplineHSName", email: "disciplineHS" },
    "Senior High School Level": { name: "disciplineSHSName", email: "disciplineSHS" }
  };

  const assignments = {};

  for (const key in map) {
    const nameInput = document.getElementById(map[key].name);
    const emailInput = document.getElementById(map[key].email);

    if (emailInput && emailInput.value.trim() !== "") {
      assignments[key] = {
        name: nameInput ? nameInput.value.trim() : "N/A",
        email: emailInput.value.trim()
      };
    }
  }

  localStorage.setItem("emailAssignments", JSON.stringify(assignments));
  alert("Assignments (names and emails) saved successfully.");
}

function loadAssignments() {
  const assignments = JSON.parse(localStorage.getItem("emailAssignments"));

  if (!assignments) return;

  const map = {
    "English": { name: "englishName", email: "englishEmail" },
    "Mathematics": { name: "mathName", email: "mathEmail" },
    "Science": { name: "scienceName", email: "scienceEmail" },
    "Filipino": { name: "filipinoName", email: "filipinoEmail" },
    "Araling Panlipunan": { name: "apName", email: "apEmail" },
    "Technology and Livelihood Education": { name: "tleName", email: "tleEmail" },
    "Reading": { name: "readingName", email: "readingEmail" },
    "MAPEH": { name: "mapehName", email: "mapehEmail" },
    "Christian Living and Values Education": { name: "clveName", email: "clveEmail" },

    "Human Resources": { name: "hrName", email: "hrEmail" },
    "Grade School Library": { name: "gradeschoolName", email: "gradeschoolEmail" },
    "High School and Senior High School Library": { name: "HsshshsName", email: "HsshshEmail" },
    "Laboratory": { name: "laboratoryName", email: "laboratoryEmail" },
    "Cashier": { name: "cashierName", email: "cashierEmail" },
    "Registrar": { name: "registrarName", email: "registrarEmail" },
    "Guidance Office": { name: "guidanceName", email: "guidanceEmail" },
    "School Clinic": { name: "clinicName", email: "clinicEmail" },
    "School Canteen": { name: "canteenName", email: "canteenEmail" },

    "Grade School Level": { name: "disciplineGSName", email: "disciplineGS" },
    "High School Level": { name: "disciplineHSName", email: "disciplineHS" },
    "Senior High School Level": { name: "disciplineSHSName", email: "disciplineSHS" }
  };

  for (const category in assignments) {
    const entry = assignments[category];
    const fields = map[category];

    if (!fields) continue;

    const nameInput = document.getElementById(fields.name);
    const emailInput = document.getElementById(fields.email);

    if (nameInput) nameInput.value = entry.name || "";
    if (emailInput) emailInput.value = entry.email || "";
  }
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
  const subjectSelect =
  form.querySelector("#subject") ||
  form.querySelector("#services");


  const assignments = JSON.parse(localStorage.getItem("emailAssignments")) || {};

  let assignedEmail = null;
  let assignedName = null;
  let selectedText = "OTHER";

  if (subjectSelect) {
    selectedText =
      subjectSelect.options[subjectSelect.selectedIndex].text;

    const assignedPerson = assignments[selectedText];

    if (!assignedPerson) {
      alert("No assigned personnel found for this category.");
      return;
    }

    assignedEmail = assignedPerson.email;
    assignedName = assignedPerson.name;
  } else {
    const fallback = assignments["Human Resources"];
    if (fallback) {
      assignedEmail = fallback.email;
      assignedName = fallback.name;
    }
  }

  if (!assignedEmail) {
    alert("No assigned email found.");
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
    assigned_name: assignedName,
    full_name:
      form.querySelectorAll("input")[0].value +
      " " +
      form.querySelectorAll("input")[1].value,
    sender_email:
      form.querySelector("input[type='email']")?.value || "N/A",
    category: selectedText,
    message: form.querySelector("textarea").value,
    attachment: attachment
  };

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
      alert("Email failed.");

      const isStudent = location.pathname.includes("student");
      window.location.href = isStudent
        ? "student-thankyou.html"
        : "personnel-thankyou.html";
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

function sendAssignments(event) {
  event.preventDefault();

  const data = {};

  document.querySelectorAll("[data-key]").forEach(input => {
    data[input.dataset.key] = input.value;
  });

emailjs.send(
  "service_9uy34u8",
  "template_0vqldng",
    data
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
}


function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

if (location.pathname.includes("admin-dashboard")) {
  loadAssignments();
}







