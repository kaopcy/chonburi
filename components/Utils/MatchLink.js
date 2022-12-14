import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const MatchLink = ({ path, children, index }) => {
    const router = useRouter();
    const isIndex = useMemo(() => router.pathname === "/", [router.pathname]);
    const absoluteTargetPath = path.split("?")[0]
    return (
        <Link href={path} passHref={true}>
            {children({
                isMatch: index ? isIndex : router.pathname.includes(absoluteTargetPath),
            })}
        </Link>
    );
};
export default MatchLink;
