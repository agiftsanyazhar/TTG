document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    let isValid = true;
    document.getElementById("fullnameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("confirmPasswordError").innerText = "";
    document.getElementById("successMessage").innerText = "";

    if (fullname === "") {
      document.getElementById("fullnameError").innerText =
        "Nama lengkap wajib diisi.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("emailError").innerText = "Email wajib diisi.";
      isValid = false;
    } else if (!validateEmail(email)) {
      document.getElementById("emailError").innerText =
        "Format email tidak valid.";
      isValid = false;
    }

    if (password === "") {
      document.getElementById("passwordError").innerText =
        "Password wajib diisi.";
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById("passwordError").innerText =
        "Password harus terdiri dari minimal 8 karakter.";
      isValid = false;
    }

    if (confirmPassword === "") {
      document.getElementById("confirmPasswordError").innerText =
        "Konfirmasi password wajib diisi.";
      isValid = false;
    } else if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").innerText =
        "Password dan konfirmasi password tidak cocok.";
      isValid = false;
    }

    if (isValid) {
      document.getElementById("successMessage").innerText =
        "Pendaftaran Berhasil.";
      document.getElementById("registrationForm").reset();
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
