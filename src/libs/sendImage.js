export const sendImage = async (imgSrc) => {
  const localhost = import.meta.env.VITE_LOCALHOST;

  try {
    const response = await fetch(`${localhost}/imageToSpeech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64Image: imgSrc }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
