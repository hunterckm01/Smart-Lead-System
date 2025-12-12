const sendData = async(name) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const fullName = name.trim(' ').split(' ');
    const firstName = fullName[0];
    await fetch(`${URL}/registerName`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: firstName }),
    });
}

export default sendData;