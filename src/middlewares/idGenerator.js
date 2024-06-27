// ====================================================== //
// ===== function that helps in generating random ID ==== //
// ====================================================== //
function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Start with a capital letter
  let id = letters.charAt(Math.floor(Math.random() * letters.length));

  // Add 4 more alphanumeric characters
  for (let i = 0; i < 4; i++) {
    id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }

  return id;
}
export { generateId };
