function validateSignup(event) {
  event.preventDefault();
  let username = document.getElementById("new-username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("new-password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert("Authentication not implemented for this demo.");
}
