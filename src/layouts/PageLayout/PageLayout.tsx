import { Flex, Box, Spinner } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Sidebar from "./../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = pathname !== "/auth" && !user && !loading;

    const checkingUserIsAuth = !user && loading;

    if (checkingUserIsAuth) return <PageLayoutSpinner />;
    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {/* sidebar on the left*/}
            {canRenderSidebar && (
                <Box w={{ base: "70px", md: "240px" }} alignItems={"center"}>
                    <Sidebar />
                </Box>
            )}
            {/* Navbar*/}
            {canRenderNavbar ? <Navbar /> : null}
            {/* page content on the right*/}
            <Box
                flex={1}
                w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}
            >
                {children}
            </Box>
        </Flex>
    );
};

export default PageLayout;

const PageLayoutSpinner = () => {
    return (
        <Flex
            flexDir="column"
            h="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Spinner size="xl" />
        </Flex>
    );
};
