export async function deleteRoute(routeID) {
  try {
    const response = await fetch(`http://192.168.99.100:4000/deleteRoute?routeID=${routeID}`, {
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