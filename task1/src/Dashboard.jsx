import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from  "./api"
function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const validateToken = async () => {
      try {
        await api.get('/users/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // If token is valid, do nothing
      } catch (error) {
        // If token is invalid or changed manually
        localStorage.removeItem('authToken');
        navigate('/');
      }
    };

    if (token) {
      validateToken();
    } else {
      navigate('/');
    }
  }, []);
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
