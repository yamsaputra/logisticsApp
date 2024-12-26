// GET Request to fetch account data in AccountPage.vue
export const getAccountData = async () => {
  try {
    const response = await fetch('http://localhost:4000/person');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


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