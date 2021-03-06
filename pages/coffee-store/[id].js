import { getRouteMatcher } from "next/dist/shared/lib/router/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-stores.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log({params});


  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById =coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; 
    //dynamic id
  });
  return {
    props: {
      coffeStore: findCoffeeStoreById ? findCoffeeStoreById : {}  
      }
      ,
    };
  }


export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, neighborhood, imgUrl, locality, address } = props.coffeStore;

  const handleUpvoteButton = () => {
    console.log("Upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back To Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/Icons/places.svg"
                width="25"
                height="24"
                alt="places"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image
              src="/static/Icons/places.svg"
              width="24"
              height="24"
              alt="places"
            />
            <p className={styles.text}>{locality}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="near me"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          ) || <p>There is no content</p>}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="near me"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton}>Up vote</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
