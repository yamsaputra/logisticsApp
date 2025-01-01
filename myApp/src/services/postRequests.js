// Services for POST requests on the Frontend side.

/**
 *
 * @param {*} formData
 * @returns
 */
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
      console.log("registerUser: User created successfully 201.");
      return { success: true, message: data.message };
    } else if (response.status === 400) {
      console.error("registerUser: The E-Mail is already being used 400.");
      return response;
    }

    return data;
  } catch (error) {
    console.error("registerUser: Internal Server Error 500:", error);
    return { success: false, message: "Request to the server failed." };
  }
}

/**
 *
 * @param {*} loginData
 * @returns
 */
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
    console.log("loginUser: loginResponseData:", data);

    console.log("loginUser: data:", data);

    if (response.status === 200) {
      console.log("loginUser: User logged in 200.");

      return { response, data };
    } else {
      throw new Error("loginUser: Response was not OK:", response);
    }
  } catch (error) {
    console.error("loginUser: Internal Server Error 500:", error);
    return data;
  }
}

/**
 *
 * @param {*} bringData
 * @param {*} userID
 * @returns
 */
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
    console.error("registerRoute: Internal Server Error 500:", error);
    return { success: false, message: "Request to the server failed." };
  }
}

/**
 *
 * @param {*} rideID
 * @param {*} userID
 * @returns
 */
export async function bookRoute(rideID, userID) {
  try {
    console.log("rideIDPR:", rideID);
    console.log("userIDPR:", userID);
    const requestData = {
      user_id: userID,
      ride_id: rideID,
    };

    const response = await fetch("http://localhost:4000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log("bookRoute: Route booked successfully 201.");
      return { success: true, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("bookRoute: Internal Server Error 500:", error);
    return { success: false, message: "Request to the server failed." };
  }
}
