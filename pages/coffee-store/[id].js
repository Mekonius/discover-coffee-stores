import { getRouteMatcher } from "next/dist/shared/lib/router/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeStoreData from "../../data/coffee-stores.json";
import Head from "next/Head";
import styles from "../../styles/coffee-stores.module.css";
import Image from "next/image";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeStore: coffeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeStoreData.map((coffeeStore) => {
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

  const { address, name, neighbourhood, imgUrl } = props.coffeStore;
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back To Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={styles.col2}>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
