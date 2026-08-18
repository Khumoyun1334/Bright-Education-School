const storageKey = "bright-pending-inquiries";

const saveLocally = (data) => {
  const existing = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
  existing.push({ ...data, createdAt: new Date().toISOString() });
  window.localStorage.setItem(storageKey, JSON.stringify(existing.slice(-20)));
};

export const submitInquiry = async (data) => {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (!endpoint) {
    saveLocally(data);
    return { local: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Request failed");
  return { local: false };
};
