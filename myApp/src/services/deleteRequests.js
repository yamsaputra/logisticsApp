/**
 * @description This function deletes a package from the database.
 * @param {String} routeID Receives the routeID of the route to be deleted from PackagePage.vue.
 * @returns {Promise<JSON>} A promise that resolves to the deleteRequestsBE.js file.
 */
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