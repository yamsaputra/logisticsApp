// Services for POST requests on the Frontend side communicating with the Backend services.

/**
 * @description This function sends a POST request to the backend to register a new user.
 * @param {formData} formData
 * @returns {Promise<JSON>} A promise that resolves to the registerUser function.
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
    console.error("registerUser() Internal Server Error 500:", error);
    return { success: false, message: "Internal Server Error 500, please try again later." };
  }
}

/**
 * @description This function sends a Fetch POST request to the backend and receives a JSON as a promise.
 * @param {JSON} loginData
 * @returns {Promise<JSON>} A promise that resolves to the loginUser function to LoginPage.vue.
 * @returns {status} 200 when user successfully logins.
 * @returns {status} 401 when user inputs incorrect password.
 * @returns {status} 404 when E-Mail is not found in database.
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
      return { status: response.status, data };
    } else if (response.status === 401 || response.status === 404) {
      console.error("loginUser() Response was not OK:", response);
      return { status: response.status, message: "E-Mail not found 404 or password incorrect 401", data };
    } else {
      console.error("loginUser() Response was not OK:", response);
      return { status: response.status, message: "An unexpected error occurred.", data };
    }
  } catch (error) {
    console.error("loginUser() Internal Server Error 500:", error);
    return data;
  }
}

/**
 * @description This function sends a Fetch POST request to the backend to register a new route.
 * @param {formData} bringData
 * @param {String} userID
 * @returns {Promise<JSON>} A promise that resolves to registerRoute() in BringPage.vue.
 * @returns {status} 201 when a route is registered succesfully.
 * @returns {status} 500 when a route fails to register or an Internal Server Error occurs.
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
      console.log("registerRoute() Created 201: Travel route created successfully.");
      return { success: true, message: data.message, status: 201 };
    }

    return data;
  } catch (error) {
    console.error("registerRoute() Internal Server Error 500: Failed to register route.", error);
    return { success: false, message: "Internal Server Error 500, please try again later.", status: 500 };
  }
}

/**
 * @description This function sends a Fetch POST request to the backend to book a route.
 * @param {Int} rideID
 * @param {String} userID
 * @returns {Promise<JSON>} A promise that resolves to bookRoute() in RoutePage.vue.
 * @returns {status} 201 when a route is created successfuly.
 * @returns {status}
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
