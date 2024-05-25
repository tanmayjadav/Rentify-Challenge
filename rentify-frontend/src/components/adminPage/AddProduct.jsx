import BreadCrumb from "@/components/Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Select from 'react-select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useLayoutEffect, useState } from "react";
import SearchableDropdown from "../ui/searchableDropdown";
import { placeOptions } from "../../../public/placeOptions";
import { server } from "@/main";
// import { MultiSelect } from "@/components/ui/multi-select"; // Assuming you have a multi-select component

const breadcrumbItems = [
  // { title: "Property", link: "/admin/properties" },
  { title: "Add", link: "/seller/addproducts" },
];

const formSchema = yup.object({
  place: yup.string().min(1).required(),
  area: yup.number().required("Area is required").positive(),
  bedrooms: yup.number().required("Bedrooms are required").positive().integer(),
  bedrooms: yup
    .number()
    .required("Number of Nearby Hospitals are required")
    .positive()
    .integer(),
  bedrooms: yup
    .number()
    .required("Number of Nearby Schools/Colleges are required")
    .positive()
    .integer(),
  bathrooms: yup
    .number()
    .required("Bathrooms are required")
    .positive()
    .integer(),
  price: yup.number().required("Price is required").positive().integer(),
  description: yup.string().required(),
  image: yup.array().of(yup.string()).required(),
});

const AddProperty = () => {
  const [sellerId, setSellerId] = useState("");
  useEffect(() => {
    setSellerId(localStorage.getItem('userId'));
  }, []); 

  const form = useForm({
    defaultValues: {
      place: "",
      area: 0,
      bedrooms: 0,
      bathrooms: 0,
      nearbyHospitals: 0,
      nearbyColleges: 0,
      price: 0,
      description: "",
      image: [],
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const [images, setImages] = useState([]);

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 3) {
      toast.error("You can only upload a maximum of 3 images");
      return;
    }
    const imagePromises = Array.from(files).map((file) =>
      convertToBase64(file)
    );
    const imageBase64Array = await Promise.all(imagePromises);
    setImages(imageBase64Array);
    form.setValue("image", imageBase64Array);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    console.log({...data, sellerId})
    try {
      const res = await axios.post(`${server}/api/addproperties`, {...data, sellerId});
      if (res.data.success){
        toast.success("Property added");
        form.reset(); 
      setImages([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Add Property`} description={""} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full xl:w-2/3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="font-bold">Choose Images of your Properties (max 3) </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-evenly">
  {images && images.map((image, index) => (
    <img key={index} src={image} alt={`Preview ${index + 1}`} width={"150px"}/>
  ))}
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      name="color"
                      options={placeOptions}
                      onChange={(selectedOption) => field.onChange(selectedOption.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Area in sq.ft."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of bedrooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of bathrooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nearbyHospitals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Nearby Hospitals</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of nearby hospitals"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nearbyColleges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Nearby Colleges</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of nearby colleges"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="$$$" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      <Toaster position="bottom-left" />
    </div>
  );
};

export default AddProperty;
