function validateLogin(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "passwort123") {
    alert("Login erfolgreich!");
  } else {
    alert("Falscher Benutzername oder Passwort");
  }
}
