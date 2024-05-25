import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "./components/redux/store.js";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Aboutus from "./components/landingPage/Aboutus.jsx";
import Seller from "./components/adminPage/Seller.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import AddProperty from "./components/adminPage/AddProduct.jsx";
import AllProducts from "./components/adminPage/AllProducts.jsx";
import EditProperty from "./components/adminPage/EditProduct.jsx";
import Explore from "./components/buyerPage/Explore.jsx";
import ProductPage from "./components/buyerPage/ProductPage.jsx";
import NotAuthorized from "./components/NotAuth.jsx";

let persistor = persistStore(store);
// export const server = "https://sevasetu-zpdg.onrender.com";
export const server = "https://rentify-challenge.onrender.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/explore" element={<Explore/>} />
        <Route element={<ProtectedRoute userTypeRequired="buyer" />}>
          <Route path="/buyer/:id" element={<ProductPage/>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute userTypeRequired="seller" />}>
        <Route path="/seller" element={<Seller />}>
          <Route path="/seller/addProducts" element={<AddProperty />} />
          <Route path="/seller/allProducts" element={<AllProducts />} />
          <Route path="/seller/editProducts/:id" element={<EditProperty />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
