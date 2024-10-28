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

    if (!response.ok) {
      throw new Error("Failed to fetch audio from server");
    }

    // const data = await response.json();
    // return data;

    const audioBlob = await response.blob();
    console.log(audioBlob.type);

    const audioUrl = URL.createObjectURL(audioBlob);

    return { audioUrl };
  } catch (error) {
    throw error;
  }
};
