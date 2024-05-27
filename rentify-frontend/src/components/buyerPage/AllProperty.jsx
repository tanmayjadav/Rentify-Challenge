import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
// import { addToCart } from "@/slice/cartSlice";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { server } from "@/main";
import { Toaster, toast } from "sonner";

const AllProperty = ({ properties, text }) => {
  // const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [placeFil, setPlaceFil] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState([]);
  const propertiesPerPage = 4;
  const [updatedProperties, setUpdatedProperties] = useState(
    properties.map((property) => ({ ...property, likes: 0 }))
  );

  const handleLike = async (propertyId) => {
    try {
      if (likedPosts.includes(propertyId)) {
        toast("You have already liked this post.");
        return;
      }
      // Make the API call to like the post
      const response = await axios.put(
        `${server}/api/property/like/${propertyId}`
      );
      if (response.data.success) {
        // Update the local state to mark the post as liked
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, propertyId]);

        // Update the likes count for the property
        setUpdatedProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === propertyId
              ? { ...property, likes: property.likes + 1 }
              : property
          )
        );

        // Update the SearchedProperties state
        setSearchedProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === propertyId
              ? { ...property, likes: property.likes + 1 }
              : property
          )
        );
      } else {
        console.error("Failed to like property:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to like property:", error);
    }
  };

  const sortProperties = (properties, sortBy) => {
    switch (sortBy) {
      case "lowToHigh":
        return properties.slice().sort((a, b) => a.price - b.price);
      case "highToLow":
        return properties.slice().sort((a, b) => b.price - a.price);
      default:
        return properties;
    }
  };

  const filterProperties = (properties, placeFil) => {
    if (!placeFil) return properties;
    return properties.filter((property) => property.place === placeFil);
  };

  const searchProperties = (properties, searchKey) => {
    if (!searchKey) return properties;
    return properties.filter(
      (property) =>
        property.place.toLowerCase().includes(searchKey.toLowerCase()) ||
        property.description.toLowerCase().includes(searchKey.toLowerCase())
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePlaceFilterChange = (e) => {
    setPlaceFil(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    const filtered = filterProperties(properties, placeFil);
    const searched = searchProperties(filtered, searchKey);
    setSearchedProperties(sortProperties(searched, sortBy));
    setCurrentPage(1);
    // setUpdatedProperties();
  }, [properties, searchKey, sortBy, placeFil]);

  const [SearchedProperties, setSearchedProperties] = useState(properties);

  const totalPages = Math.ceil(SearchedProperties.length / propertiesPerPage);
  const paginatedProperties = SearchedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="bg-background py-10 sm:py-0">
        <div className="max-w-2xl mx-auto px-4 sm:py-8 sm:pt-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-6 sm:pt-0  flex justify-between flex-col sm:flex-row items-center">
            <h2 className="text-xl font-bold hidden md:block">{text}</h2>
            <Input
              value={searchKey}
              placeholder="Search Here..."
              onChange={handleSearchChange}
              className="w-1/2"
            />
          </div>

          <div className="flex gap-5 flex-col pb-6 sm:pb-0 sm:flex-row justify-between items-center mt-4">
            <div className="flex items-center justify-end">
              <label htmlFor="sortBy" className="mr-2">
                Sort by:
              </label>
              <select
                id="sortBy"
                className="py-1 text-sm border rounded-md dark:text-background"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Select</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
            <div className="flex items-center justify-end">
              <label htmlFor="placeFilter" className="mr-2">
                Place
              </label>
              <select
                id="placeFilter"
                className="py-1 text-sm border rounded-md dark:text-background"
                value={placeFil}
                onChange={handlePlaceFilterChange}
              >
                <option value="">All</option>
                {Array.from(
                  new Set(properties.map((property) => property.place))
                ).map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {paginatedProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            paginatedProperties.map((property) => (
              <div key={property._id}>
                <Link to={`/buyer/${property._id}`}>
                  <div className="relative">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                      <img
                        src={property.image[0]}
                        alt={property.description}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium truncate">
                        {property.place}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {property.description}
                      </p>
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
                </Link>
                {console.log(property.likes)}
                <div className="mt-6 flex gap-4 items-center">
                  <Link
                    to={`/buyer/${property._id}`}
                    className="relative w-full flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Interested
                    <span className="sr-only">, {property.place}</span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{property.likes}</span>
                    <Button
                      onClick={() => handleLike(property._id)}
                      className="p-2 bg-background text-foreground hover:bg-red-400"
                    >
                      <Heart />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8 mb-8 bg-foreground/90 text-background flex justify-center">
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
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      <Toaster position="bottom-left"/>
      </div>
    </>
  );
};
export default AllProperty;
