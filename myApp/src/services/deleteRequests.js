export async function deleteRoute(routeID) {
  try {
    const response = await fetch(`http://localhost:4000/deleteRoute?routeID=${routeID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
}