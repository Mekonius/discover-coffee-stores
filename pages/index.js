import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
// data source
import CoffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: {
      CoffeeStores: CoffeeStoresData,
    },
  };
}


const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3XHcBlCR1uUPGQj4wNnvVMwLwwSTxiV6jwEPgoreloyk='
  }
};

fetch('https://api.foursquare.com/v3/places/search?query=coffee%20store&ll=56.15443,10.20531&radius=1000&sort=RATING&limit=10', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

export default function Home(props) {
  console.log("props:", props);
  const handleOnBannerClick = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>coffee cornnoisseur test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerClick}
        />

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="coffe cat"
            width={700}
            height={700}
          />
        </div>

        {props.CoffeeStores.length > 0 && (
          <>
          <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.CoffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
