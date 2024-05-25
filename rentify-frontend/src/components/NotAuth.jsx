import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[7rem] font-extrabold leading-none text-transparent">
        Not Authorized
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
        Access Denied
      </h2>
      <p>
        Sorry, you are not authorized to view this page. Please log in or contact the administrator for access.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => navigate(-1)} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => navigate("/login")} // Assuming "/login" is your login page
          variant="outline"
          size="lg"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default NotAuthorized;
