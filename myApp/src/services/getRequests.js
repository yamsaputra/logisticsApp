/**
 * @description Fetches account data for AccountPage.vue from getRequestsBE.js.
 * @returns {Promise<JSON>} A promise that resolves to the account data.
 */
export const getAccountData = async () => {
  try {
    const response = await fetch('http://localhost:4000/person');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('gR - getAccountData - Error fetching data:', error);
    throw error;
  }
};

/**
 * @description Fetches route data for RoutePage.vue from the  getRequestsBE.js file.
 * @param {encodeURIComponent} email 
 * @returns {JSON} A promise that resolves to the route data to the getRequests.js file.
 */
export const getUserData = async (email) => {
  try {
    const response = await fetch(`http://localhost:4000/user?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    console.log(data);
    console.log(response);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * @description Fetches route data for RoutePage.vue from the getRequestsBE.js file.
 * @param {*} query From the search bar.
 * @returns 
 */
export const getRouteData = async (query) => {
  try {
    const response = await fetch(`http://localhost:4000/route?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);
    console.log(response);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const getRouteArray = async (query) => {
  try {
    const response = await fetch(`http://localhost:4000/routes?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('getRequest error:', error);
    throw error;
  }
}

export const getUserRoutes = async (userID) => {
  try {
    const response = await fetch(`http://localhost:4000/userroutes?userID=${userID}`);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('getRequest error:', error);
    throw error;
  }
}