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
              {props.CoffeeStores.map((coffeStore) => {
                return (
                  <Card
                    key={props.id}
                    name={coffeStore.name}
                    imgUrl={coffeStore.imgUrl}
                    href={`/coffee-store/${coffeStore.id}`}
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
