const apiRequest = async (url) => {
  try {
    const responseText = await fetch(url);
    return await responseText.json();
  } catch (err) {
    return console.error("Request error:", err);
  }
};

export default apiRequest;
