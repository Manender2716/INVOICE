export async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
  });

  const payload =
    response.status === 204
      ? null
      : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.error || "The request could not be completed."
    );
  }

  return payload;
}
