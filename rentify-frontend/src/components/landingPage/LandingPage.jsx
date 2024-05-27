import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LZString from "lz-string";
import { ModeToggle } from '../ModeToggle';

const LandingPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const storedProperties = localStorage.getItem("properties");
        if (storedProperties) {
          const decompressedProperties = LZString.decompress(storedProperties);
          setProperties(JSON.parse(decompressedProperties));
        } else {
          const res = await axios.get(`${server}/api/properties`);
          if (res.data.success) {
            setProperties(res.data.properties);
            const compressedProperties = LZString.compress(JSON.stringify(res.data.properties));
            localStorage.setItem("properties", compressedProperties);
          }
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } 
    };
    fetchProperties();
  }, []);
  
  return (
    <div className='py-6 pt-24'>
      <div>
          {/* Hero card */}
          <div className="relative">

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-background" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1581573950452-5a438c5f390f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVudHxlbnwwfHwwfHx8Mg%3D%3D"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 dark:bg-blue-950/80 bg-primary/50 mix-blend-multiply" />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-foreground/90">Take Ease in your</span>
                    <span className="block text-background/70">Home Searching and Selling</span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-100 sm:max-w-3xl">
                  Unlock the power of Rentify and join us in revolutionizing the rental experience. Your support fuels our mission to transform renting into a seamless, empowering journey for tenants and landlords alike
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="">
                      <Link
                        to="/register"
                        className="flex w-60 pointer items-center justify-center py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-foreground bg-background/70 sm:px-8"
                      >
                        Get started
                      </Link>
                      {/* <Link
                        to="/explore"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary/70 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                      >
                        Explore
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="bg-background">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                Trusted by over many large businesses
              </p>
              <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                    alt="StaticKit"
                  />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                    alt="Transistor"
                  />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                    alt="Workcation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LandingPage
