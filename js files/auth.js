document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("auth-form");
  const authMessage = document.getElementById("auth-message");

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const otp = document.getElementById("otp").value.trim();
    const securityQuestion = document
      .getElementById("security-question")
      .value.trim();

    if (username && otp && securityQuestion) {
      authMessage.textContent = "Authentication successful!";
      authMessage.style.color = "green";
    } else {
      authMessage.textContent = "Please fill in all fields correctly.";
      authMessage.style.color = "red";
    }
  });
});
