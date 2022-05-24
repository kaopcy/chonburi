import { useRouter } from "next/router";
import Link from "next/link";
const MatchLink = ({ path, children }) => {
    const router = useRouter();
    return <Link href={path} passHref={true} >{children({ isMatch: router.pathname === path })}</Link>; 
};
export default MatchLink;
