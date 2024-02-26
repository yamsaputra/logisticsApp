export async function registerUser(formData) {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log("User created successfully.");
      return { success: true, message: data.message };
    } else if (response.status === 400) {
      console.error("The E-Mail is already being used. (L2)");
      return response;
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Request to the server failed." };
  }
}

export async function loginUser(loginData) {
  try {
    const { email, password } = loginData;

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("pR - loginResponseData:", data);

    const userData = [response, data]
      console.log("pR userData:", userData.data);


    if (response.status === 200) {
      console.log("User logged in");

      return userData;
    } else {
      console.error("Error logging in user:", data.error);
      return { success: false, message: data.error };
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return data;
    /* return { success: false, message: "Error logging in user." } */
  }
}

export async function registerRoute(bringData, userID) {
  try {
    console.log("userIDPR:", userID);
    console.log("bringDataPR:", bringData);
    const requestData = {
      ...bringData,
      user_id: userID,
    };


    const response = await fetch("http://localhost:4000/bring", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log("Travel route created successfully.");
      return { success: true, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error bringing package:", error);
    return { success: false, message: "Request to the server failed." };
  }
}
