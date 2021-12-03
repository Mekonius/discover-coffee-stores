import { createApi } from 'unsplash-js';

// on your node server
const unspalshApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESSKEY,
  //...other fetch options
});




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


//TODO:; USE FOURSQAURE PICTURE API INSTEAD.
const getListOfCoffeeStorePhotos = async () => {
  const photos = await unspalshApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
    orientation: 'landscape',
  });

  const unspalshResult = photos.response.results
  return unspalshResult.map(result => result.urls['small'])
}



export const fetchCoffeeStores = async () => {  
  const photos = await getListOfCoffeeStorePhotos();
  const jsonData = getUrlForCofeeStores('coffee', '56.1577,10.2036', 6)
  const data = await jsonData;



  //TODO: FIX ...DATA AND CALL PROPS INSTEAD
  return data.results.map((data, idx) => {
    console.log("DataLAYER",data);
    return {
      ...data,
      id: data.fsq_id || "",
      addres: data.location.address || "",
      name: data.name || "",
      neighborhood: data.location.neighborhood || data.location.locality || "",
      locality: data.location.locality || "",
      imgUrl: photos[idx]
    }
  });
};
