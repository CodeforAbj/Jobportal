function changetypeOfUser(newValue) {
  const typeDisplay = document.getElementById("typeDisplay");
  typeDisplay.textContent =
    newValue.charAt(0).toUpperCase() + newValue.slice(1);
  const hiddenField = document.getElementById("typeOfUser");
  hiddenField.value = newValue.toLowerCase();
}
function validatePasswords() {
  const password = document.getElementById("userPasswordFieldR").value;
  const confirmPassword = document.getElementById(
    "userPasswordConfirmField"
  ).value;
  const errorOutput = document.getElementById("errorOutput");

  errorOutput.className = "";
  errorOutput.textContent = "Checking...";

  if (!password) {
    // Check if password is empty
    errorOutput.className = "alert alert-danger";
    errorOutput.textContent = "Please enter a password!";
    return false;
  }
  if (password !== confirmPassword) {
    errorOutput.className = "alert alert-danger";
    errorOutput.textContent = "Passwords do not match!";
    return false; // Prevent form submission
  }

  return true; // Allow form submission
}
