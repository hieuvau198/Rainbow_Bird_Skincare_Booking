export default function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("Role");
  window.location.href = "/";
};