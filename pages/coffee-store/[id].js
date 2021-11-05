import { getRouteMatcher } from "next/dist/shared/lib/router/utils";
import { useRouter } from "next/router";
import Link from 'next/link'

const CoffeeStore = () => {
    const router = useRouter();
    console.log("router", router.query.id)
    return <div> 
        <p>
        CoffeStore Page{router.query.id}
        <Link href="/">
            <p>Back To Home</p>
        </Link>
        </p>
    </div>
}

export default CoffeeStore; 