export const submitInquiry = async (data) => {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Request failed");
  return response.json();
};
