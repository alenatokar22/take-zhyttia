export const withBase = (p) =>
  `${import.meta.env.BASE_URL}${String(p || "").replace(/^\//, "")}`;