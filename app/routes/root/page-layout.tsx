import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const PageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <div>
      <button onClick={handleLogout} className="cursor-pointer">
        <img src="/assets/icons/logout.svg" className="size-6" alt="logout" />
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer border"
      >
        Dashboard
      </button>
    </div>
  );
};

export default PageLayout;
