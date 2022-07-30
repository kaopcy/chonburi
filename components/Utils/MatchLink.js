import { useRouter } from "next/router";
import Link from "next/link";
const MatchLink = ({ path, children }) => {
    const router = useRouter();
    const isMatch = () => {
        const curPath = router.pathname;
        const isIndex = curPath === "/";
        console.log("curPath: ", curPath);
        console.log("isIndex: ", isIndex);
    };

    isMatch();
    return (
        <Link href={path} passHref={true}>
            {children({ isMatch: router.pathname.includes(path) })}
        </Link>
    );
};
export default MatchLink;
