export function isAdmin(user) {
  if (!user?.email) return false;

  const raw = import.meta.env.VITE_ADMIN_EMAILS || "";
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return list.includes(user.email.toLowerCase());
}
