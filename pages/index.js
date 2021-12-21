import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useState, useEffect } from "react";

// data source
export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const {handleTrackLocation, latLong, locationErrorMsg, isFindingLocation  } = useTrackLocation(); 

  const [coffeeStores, setCoffeeStores] = useState('');

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);




  useEffect(() => {
    async function fetchData(){
      if(latLong){
        try{
          const fetchedCoffeStores = await fetchCoffeeStores(latLong);
          setCoffeeStores(fetchedCoffeStores);
          //set coffee stores
        }
        catch(error){
          //set error
          console.log({ error });
          setCoffeeStoresError(error,message);
        }
      }
    }
    


  }, [latLong])

  const handleOnBannerClick = () => { 
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>coffee cornnoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnBannerClick}
          />
          {coffeeStoresError && <p>something went wrong: {coffeeStoresError }</p>}
          {locationErrorMsg && <p>something went wrong: {locationErrorMsg }</p>}

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="coffe cat"
            width={700}
            height={700}
          />
        </div>

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Coffee Stores near you</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Londons coffee Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
