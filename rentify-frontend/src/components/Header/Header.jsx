import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { ModeToggle } from "../ModeToggle";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserLocalStorage } from "../redux/slice/userSlice";
import axios from "axios";
import { server } from "@/main";
import { Cookie, Menu } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 710);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const checkAuthentication = () => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    if (isLoggedIn) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      dispatch(deleteUserLocalStorage());
      setIsLoggedIn(false);
      toast.success("User Logout");
      navigate("/");
    } else {
      toast.error("Login First");
    }
  };
  return (
    <>
      <header className=" top-0 bg-background fixed z-50 shadow-[0_17px_17px_-25px_rgba(0,0,0,0.3)] dark:shadow-[0_17px_17px_-25px_rgba(255,255,255,0.4)] w-screen pl-3 md:pl-8 pr-3 md:pr-8 flex justify-between items-center">
        <div className="text-lg font-bold flex justify-center items-center">
          <Link to="/" className=" dark:bg-white">
            <img
              className="block h-12 sm:h-16 w-28 sm:w-44"
              src={logo}
              alt="Logo"
            />
          </Link>
          {isTabletView ? (
            <></>
          ) : (
            <>
              <div className="pl-6 h-full md:flex space-x-4">
                <Link
                  to="/"
                  className="text-foreground h-full border-b-2 border-transparent hover:border-primary cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="/aboutus"
                  className="text-foreground border-b-2 border-transparent hover:border-primary cursor-pointer"
                >
                  About Us
                </Link>
                <Link
                  to="/explore"
                  className="text-foreground border-b-2 border-transparent hover:border-primary cursor-pointer"
                >
                  Explore
                </Link>
              </div>
            </>
          )}
        </div>
        <nav className="flex space-x-4">
          {isTabletView ? (
            <>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Menu color="gray" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link
                        to="/"
                        className="text-foreground h-full border-b-2 border-transparent hover:border-primary cursor-pointer"
                      >
                        Home
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Link
                        to="/aboutus"
                        className="text-foreground border-b-2 border-transparent hover:border-primary cursor-pointer"
                      >
                        About Us
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Link
                        to="/explore"
                        className="text-foreground border-b-2 border-transparent hover:border-primary cursor-pointer"
                      >
                        Explore
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    {!isLoggedIn ? (
                      <>
                        <MenubarItem>
                          <Link
                            to="/register"
                            className="bg-primary text-background font-bold py-2 px-4 rounded"
                          >
                            Get Started
                          </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                          <Link
                            to="/login"
                            className="bg-primary text-background font-bold py-2 px-4 rounded"
                          >
                            Login
                          </Link>
                        </MenubarItem>
                      </>
                    ) : (
                      <>
                        <MenubarItem>
                          <button
                            className="bg-primary text-background font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </MenubarItem>
                      </>
                    )}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </>
          ) : (
            <>
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/register"
                    className="bg-primary text-background font-bold py-2 px-4 rounded"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-primary text-background font-bold py-2 px-4 rounded"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button
                  className="bg-primary text-background font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </>
          )}
          <ModeToggle/>
        </nav>
      </header>
      <Toaster richColors position="bottom-left" />
    </>
  );
};

export default Header;
