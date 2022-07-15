import axios from "../api/axios";
import useAuth from "./AuthProvider";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, access_token: response.data.access_token };
    });
    return response.data.access_token;
  };

  return refresh;
};

export default useRefresh;
