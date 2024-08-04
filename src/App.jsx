import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("dark", "light");
    html.classList.add(theme);
  }, [theme]);

  return (

    <div className="min-h-[100dvh] dark:bg-black  dark:text-white bg-white text-black grid grid-rows-[auto_1fr_auto]">
      <NavBar />
        <Outlet />
      <Footer />
    </div>
  );
}

export default App;
