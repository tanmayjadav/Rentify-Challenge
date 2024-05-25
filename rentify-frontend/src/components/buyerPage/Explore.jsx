import React, { useEffect, useState } from "react";
import { SkeletonCard } from "../ui/skeleton";
import { server } from "@/main";
import axios from "axios";
// import AllProducts from '../adminPage/AllProducts';
import AllProperty from "./AllProperty";
import LZString from "lz-string";

const Explore = () => {
  const [properties, setProperties] = useState([]);
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      const decompressedProperties = LZString.decompress(storedProperties);
      setProperties(JSON.parse(decompressedProperties));
      setLoading(false);
    }else{

    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${server}/api/properties`);
        if (res.data.success) {
          setProperties(res.data.properties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }
  }, []);

  if (loading) {
    return (
      <div className="pt-36 pb-10 pl-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="w-full mx-auto px-10 overflow-y-auto md:overflow-hidden">
        {properties && (
          <>
            {" "}
            {console.log(properties[0])}
            <AllProperty properties={properties} text="All Properties" />
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
