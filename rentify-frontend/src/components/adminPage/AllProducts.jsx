import { server } from "@/main";
import axios from "axios";
import {
  Delete,
  DeleteIcon,
  Edit2Icon,
  EditIcon,
  LucideDelete,
  PlusSquare,
  Trash2Icon,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SkeletonCard } from "@/components/ui/skeleton"; 

const AllProducts = () => {
  const [properties, setProperties] = useState([]);
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage, setPropertiesPerPage] = useState(7);
  const sellerId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (sellerId) {
          const res = await axios.get(`${server}/api/properties/${sellerId}`);
          console.log(res);
          if (res.data.success) {
            setProperties(res.data.properties);
          }
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchProperties();
  }, [change]);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const updatePropertiesPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setPropertiesPerPage(7); // Desktop view
      } else if (width >= 768) {
        setPropertiesPerPage(3); // Tablet view
      } else {
        setPropertiesPerPage(3); // Mobile view
      }
    };

    window.addEventListener("resize", updatePropertiesPerPage);

    // Call handler right away so state gets updated with initial window size
    updatePropertiesPerPage();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updatePropertiesPerPage);
  }, []);

  const handleDelete = async (propertyId) => {
    console.log(propertyId);
    try {
      await axios.delete(`${server}/api/properties/${propertyId}`);
      setProperties(
        properties.filter((property) => property.id !== propertyId)
      );
      toast.success("Property deleted successfully");
        setChange(change+1)
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };
  if (loading) {
    return (
      <div className="pt-16 pb-10 pl-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
  <div className="bg-background">
  <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 className="text-3xl font-bold text-foreground">Our Properties</h2>
    {properties.length === 0 ? (
          <div className="mt-8 text-2xl text-center text-gray-500">
            No properties found. Please add properties first.
          </div>
        ) : (
          <>
           <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {paginatedProperties ?
        paginatedProperties.map((property) => (
          <div key={property.id}>
            <div className="relative">
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <img
                  src={property.image[0]}
                  alt={property.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="relative mt-4 flex">
                <div className="basis-2/3">
                  <h3 className="text-sm font-medium text-foregound/80">
                    {property.place}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {property.area} Sq. ft
                  </p>
                </div>
                <div className="flex w-full justify-evenly">
                  <div className="mt-3">
                    <Link to={`/seller/editProducts/${property._id}`}>
                      <button className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-2 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
                        <EditIcon color="black" strokeWidth={1} />
                      </button>
                    </Link>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-2 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      <Trash2Icon color="red" strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 inset-x-0 h-96 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-25"
                />
                <p className="relative text-lg font-semibold text-white">
                  ₹{property.price}
                </p>
              </div>
            </div>
          </div>
        )):(<>No Properties Found Please Add properties first</>)}
      <div className="relative">
        <Link to="/seller/addProducts">
          <div className="relative w-full h-96 rounded-lg overflow-hidden border flex justify-center items-center">
            <PlusSquare size={64} strokeWidth={1} />
          </div>
        </Link>
      </div>
    </div>
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
          </>)}
   
  </div>
</div>
);
};

export default AllProducts;
