const mandateEndpoint = import.meta.env.VITE_MANDATE_ENDPOINT || "/api/mandate";

export const fetchMockResults = async (fullName) => {
  const response = await fetch(mandateEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Mandate request failed");
  return Array.isArray(payload.results) ? payload.results : [];
};
