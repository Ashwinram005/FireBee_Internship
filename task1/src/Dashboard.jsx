import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the auth token from localStorage (or sessionStorage)
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      <button
        onClick={handleLogout}
        className=" bg-amber-500 p-1 rounded-md hover:cursor-pointer "
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
