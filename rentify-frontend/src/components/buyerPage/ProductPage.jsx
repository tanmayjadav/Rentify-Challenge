import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Heart, HeartIcon, MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { server } from "@/main";
import { SkeletonCard } from "../ui/skeleton";
import { Toaster, toast } from "sonner";

const ProductPage = () => {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const buyerId = localStorage.getItem("userId");
  const [seller, setSeller] = useState([]);

  const InterestHandler = async () => {
    const path = `${server}/api/property/${id}`;
    const val = await axios.get(`${server}/api/profile/${buyerId}`);
    if (val.data.success) {
      const buyer = val.data.user;
      // console.log(buyer)
      const object = {
        path,
        buyerFirstName: buyer.firstName,
        buyerLastName: buyer.lastName,
        sellerLastName: seller.lastName,
        sellerFirstName: seller.firstName,
        sellerEmail: seller.email,
        buyerEmail: buyer.email,
        sellerPhone: seller.phoneNumber,
        buyerPhone: buyer.phoneNumber,
      };
      const emailRes = await axios.post(`${server}/api/sendmail`, object);
      if (emailRes.data.success) {
        toast.success("Email Sent Successfully");
      }
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const val = await axios.get(`${server}/api/property/interest/${id}`);
      const res = await axios.get(`${server}/api/property/${id}`);
      if (val.data.success) {
        setSeller(val.data.property.sellerId);
      }
      if (res.data.success) {
        setProperty(res.data.property);
        setLoading(false);
      }
    };
    fetchPropertyDetails();
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
    <div className="bg-background pt-20 sm:pt-28 ">
      {property && (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Property image */}
            <div>
              <img
                src={property.image}
                alt={property.description}
                className="rounded-md w-full object-contain"
              />
            </div>

            {/* Property info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight ">
                {property.place}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Property information</h2>
                <p className="text-xl">Description: {property.description}</p>
              </div>

              <div className="mt-3">
                <h2 className="sr-only">Property information</h2>
                <p className="text-xl md:text-3xl">Price: ₹{property.price}</p>
              </div>

              <div className="mt-6">
                {/* Additional property details */}
                <div>
                  <h3 className="text-sm text-gray-500">
                    Bedrooms:{" "}
                    <span className="font-semibold">{property.bedrooms}</span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">
                    Bathrooms:{" "}
                    <span className=" font-semibold">{property.bathrooms}</span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">
                    Area:{" "}
                    <span className="font-semibold">{property.area} sqft</span>
                  </h3>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger className="w-2/5">
                      <Button variant="outline" className="mt-3 w-full">
                        View Sellers Details Here
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <p>
                        <strong>Name:</strong> {seller.firstName}{" "}{seller.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {seller.email}
                      </p>
                      <p>
                        <strong>Phone Number:</strong>{" "}
                        {seller.phoneNumber}
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-4 flex gap-4 items-center">
                  <Button
                    onClick={() => {
                      InterestHandler(seller);
                    }}
                    className="max-w-md flex-1 border border-transparent rounded-md py-6 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Interested
                  </Button>
                  {/* <span className="font-bold ">{property.likes}{" "}Likes</span>
                  <Button className="h-full bg-background text-foreground hover:bg-red-500">
                    <Heart />
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="Left Bottom" />
    </div>
  );
};

export default ProductPage;
