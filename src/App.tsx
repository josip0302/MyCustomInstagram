import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Toaster } from "@/components/ui/toaster";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
function App() {
    const [authUser] = useAuthState(auth);
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? <HomePage /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/auth"
                        element={authUser ? <Navigate to="/" /> : <AuthPage />}
                    />
                    <Route path="/:username" element={<ProfilePage />} />
                </Routes>
                <Toaster />
            </PageLayout>
        </>
    );
}

export default App;
