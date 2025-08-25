import "./App.css";
import Header from "./components/Header";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Toaster />
      <div className="">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default App;
