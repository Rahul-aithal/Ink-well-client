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
    <div className="min-h-screen min-w-screen dark:bg-zinc-900 dark:text-white bg-zinc-100 text-black grid grid-rows-[auto_1fr_auto]">
      <NavBar />
      <main className="md:">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
