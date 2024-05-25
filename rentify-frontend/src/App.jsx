import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/adminPage/SideBar";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
