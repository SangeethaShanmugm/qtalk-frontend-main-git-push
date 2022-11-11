import AxioInstance from "./AxioInstance";

const register = async (userData, token) => {
  console.log(token)
  AxioInstance.interceptors.request.use(res => {
    res.headers = {
      Authorization: `Bearer ${token}`,
    };
  return res;
})
await AxioInstance.post("/auth/register", userData);
  };

const login = async (userData) => {
  const { data } = await AxioInstance.post("/auth/login", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const logout = async token => {
  let config = AxioInstance.interceptors.request.use(res => {
    res.headers = {
      Authorization: `Bearer ${token}`,
    };
    return res;
  });
  const { data } = await AxioInstance.post("/auth/logoutuser", config);
  if (data) {
    localStorage.removeItem("user");
  }
  return data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
