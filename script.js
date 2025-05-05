let registeredUsers = JSON.parse(localStorage.getItem("parents")) || [];

function toggleForm() {
  document.getElementById("loginForm").classList.toggle("hidden");
  document.getElementById("registerForm").classList.toggle("hidden");
}

function showForgotPassword() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("forgotForm").classList.remove("hidden");
}

function showLoginFromForgot() {
  document.getElementById("forgotForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

function resetPassword(event) {
  event.preventDefault();
  const email = document.getElementById("resetEmail").value;
  const user = registeredUsers.find(u => u.email === email);
  if (user) {
    alert(`A password reset link has been sent to ${email}`);
  } else {
    alert("Email not found.");
  }
  showLoginFromForgot();
}

function handleRegister(event) {
  event.preventDefault();

  const parentName = event.target[0].value;
  const email = event.target[1].value;
  const password = event.target[2].value;

  const studentName = event.target[3].value;
  const department = event.target[4].value;
  const year = event.target[5].value;
  const roll = event.target[6].value;
  const section = event.target[7].value;
  const dob = event.target[8].value;

  const newUser = {
    email,
    password,
    parentName,
    student: {
      studentName,
      department,
      year,
      roll,
      section,
      dob,
      attendance: `${Math.floor(Math.random() * 11) + 90}%`
    }
  };

  registeredUsers.push(newUser);
  localStorage.setItem("parents", JSON.stringify(registeredUsers));

  alert("Registered Successfully!");
  toggleForm();
}

function showDashboard(e) {
  e.preventDefault();
  const enteredEmail = document.getElementById("parentId").value;
  const enteredPassword = document.getElementById("password").value;

  const user = registeredUsers.find(
    u => u.email === enteredEmail && u.password === enteredPassword
  );

  if (user) {
    document.getElementById("studentName").textContent = user.student.studentName;
    document.getElementById("department").textContent = user.student.department;
    document.getElementById("year").textContent = user.student.year;
    document.getElementById("attendance").textContent = user.student.attendance;

    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("parentId").value = '';
  document.getElementById("password").value = '';
}
