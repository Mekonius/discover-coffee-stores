import { createApi } from 'unsplash-js';

// on your node server
const unspalshApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY,
  //...other fetch options
});


const getUrlForCofeeStores = async (query, latLong, limit) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env. NEXT_PUBLIC_FOURSQURE_Authorization}`,
    },
  };
  return await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=10000&limit=${limit}`, options)
  .then(response => response.json())
}

let count = 12;


//TODO:; USE FOURSQAURE PICTURE API INSTEAD.
const getListOfCoffeeStorePhotos = async () => {
  const photos = await unspalshApi.search.getPhotos({
    query: 'resturant',
    perPage: count,
    orientation: 'landscape',
  });

  const unspalshResult = photos.response.results
  return unspalshResult.map(result => result.urls['small'])
}



export const fetchCoffeeStores = async (latLong = '51.50737102218657,-0.127675300572631') => {  
  const photos = await getListOfCoffeeStorePhotos();
  const jsonData = getUrlForCofeeStores('resturant', latLong, count)
  const data = await jsonData;

  const dataModel = data.results.map((data, idx) => {
    return {
      ...data,
      id:  data.fsq_id || "",
      address: data.location.address || "",
      name: data.name || "",
      neighborhood: data.location.neighborhood || data.location.locality || "",
      locality: data.location.locality || "",
      imgUrl: photos[idx],
    }
  });

  return dataModel
};
