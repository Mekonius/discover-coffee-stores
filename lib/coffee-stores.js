const getUrlForCofeeStores = async (query, latLong, limit) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQURE_Authorization}`,
    },
  };

  return await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=1000&limit=${limit}`, options)
  .then(response => response.json())
}



export const fetchCoffeeStores = async () => {  
  const jsonData = getUrlForCofeeStores('coffee', '56.1577,10.2036', 6)
  const data = await jsonData;
  return data.results;
};
