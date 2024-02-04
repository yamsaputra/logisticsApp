export async function loginUser(email, password) {
  try {
    const userData = {
      email,
      password,
    };

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User logged in");
      return { success: true, message: data.message, user: data.user };
    } else {
      console.error("Error logging in user:", data.error);
      return { success: false, message: data.error };
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return { success: false, message: "Error logging in user." };
  }
}

export async function registerUser(formData) {
  try {
    const { firstName, lastName, age, email, password } = formData;

    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, age, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User created successfully.");
      return { success: true, message: data.message };
    } else {
      console.error("Error registering user:", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Error registering user." };
  }
}
