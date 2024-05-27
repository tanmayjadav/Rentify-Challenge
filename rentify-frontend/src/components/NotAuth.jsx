import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const NotAuthorized = () => {
  const location = useLocation();
  const { userTypeRequired } = location.state
  const navigate = useNavigate();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[7rem] font-extrabold leading-none text-transparent">
        Not Authorized
      </span>
      <h2 className="my-2 font-heading text-3xl font-bold">
        Access Denied
      </h2>
      <p>
        Sorry, you are not authorized to view this page. Please log in or contact the administrator for access.
      </p>
      <p>
        Log In as <span className="text-xl font-bold">{userTypeRequired}</span> to Access this page and content on it !!
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => navigate(-1)} variant="default" size="lg">
          Go back
        </Button>
        <Button onClick={() => navigate("/explore")} variant="outline" size="lg">
          Explore
        </Button>
        <Button
          onClick={() => navigate("/login")} // Assuming "/login" is your login page
          variant=""
          size="lg"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

