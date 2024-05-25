import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, EditIcon, Menu, Plus, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const SideBar = () => {
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 1024);
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

  return isTabletView ? (
    <>
      <div className="z-10 relative  pt-16 md:pt-24 pl-10">
        {/* <Button> */}
          {/* <Menu color="gray" /> */}
        {/* </Button> */}
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu color="gray" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
              <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <Plus className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/addproducts">Add Products </Link>
                    </span>
                  </span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
              <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/allproducts">All Products</Link>
                    </span>
                  </span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
              <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <EditIcon className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/allproducts">Edit Products</Link>
                    </span>
                  </span>
              </MenubarItem>
              <MenubarSeparator />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  ) : (
    <>
      <div className=" text-">
        <nav className="relative h-screen border-r pt-24 lg:block w-52">
          <div className="space-y-4 py-4">
            <div className="mx-2 py-2">
              <div className="space-y-1">
                <h2 className="mb-2 px-4 text-2xl font-semibold tracking-tight">
                  Overview
                </h2>
                <nav className="grid items-start gap-2">
                  <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <Plus className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/addproducts">Add Products </Link>
                    </span>
                  </span>
                  <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/allproducts">All Products</Link>
                    </span>
                  </span>
                  <span className="group flex items-center rounded-sm bg-foreground/90 text-background px-3 py-2 text-md font-medium hover:bg-accent hover:text-accent-foreground">
                    <EditIcon className="mr-2 h-5 w-5" />
                    <span>
                      <Link to="/seller/allproducts">Edit Products</Link>
                    </span>
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
