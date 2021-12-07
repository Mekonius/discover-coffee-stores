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



export const fetchCoffeeStores = async (latLong = '56.1577,10.2036') => {  
  const photos = await getListOfCoffeeStorePhotos();
  const jsonData = getUrlForCofeeStores('coffee', latLong, 6)
  const data = await jsonData;


  console.log("DataData", data);
  



  const dataModel = data.results.map((data, idx) => {
    console.log("tis" ,data);
    return {
      //...data,
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
