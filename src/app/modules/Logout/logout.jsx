export default function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenRole");
  window.location.href = "/";
};