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
    console.error('getAccountData() - Internal Server Error 500:', error);
    throw error;
  }
};

/**
 * @description Fetches route data for RoutePage.vue from getRequestsBE.js.
 * @param {encodeURIComponent} email Input from LoginPage.vue.
 * @returns {Promise<JSON>} A promise that resolves to the route data to LoginPage.vue.
 */
export const getUserData = async (email) => {
  try {
    const response = await fetch(`http://localhost:4000/user?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('getUserData() response was not OK.');
    }
    const data = await response.json();
    console.log("getUserData() response:", response);
    console.log("getUserData() data:", data);
    return { response, data };
  } catch (error) {
    console.error('getUserData() Internal Server Error 500:', error);
    throw error;
  }
}

/**
 * @description Fetches route data for RoutePage.vue from the getRequestsBE.js file.
 * @param {String} query From the search bar.
 * @returns {JSON} A promise that resolves to the route data to the RoutePage.vue file.
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

/**
 * @description Fetches the route data for the RoutePage.vue from the getRequestsBE.js file.
 * @param {String} query 
 * @returns {Promise<JSON>} A promise that resolves to the route data to RoutePage.vue.
 */
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

/**
 * @description Fetches the route data for the RoutePage.vue from the getRequestsBE.js file.
 * @param {String} userID 
 * @returns {Promise<JSON>} A promise that resolves to the route data to RoutePage.vue.
 */
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