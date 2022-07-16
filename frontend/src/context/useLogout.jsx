import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./AuthProvider";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axiosPrivate("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
