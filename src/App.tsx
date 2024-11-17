import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignIn, SignUp, PrivateRoute, Dashboard } from "@/pages";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <main className="main-bg w-full h-screen pb-20 flex flex-col items-start gap-20 absolute top-0 left-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
