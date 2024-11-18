import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignIn, SignUp, PrivateRoute, Dashboard } from "@/pages";
import Navbar from "@/components/Navbar";
import { useLoading } from "./contexts/LoadingContext";
import { Loading } from "./components/Loading";

function App() {
  const { state } = useLoading();

  return (
    <main className="main-bg w-full h-screen lg:pb-20 flex flex-col items-start lg:gap-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
      <ToastContainer />

      {state.isLoading && <Loading />}
    </main>
  );
}

export default App;
