import api from "./api.service";

class AuthService {
  login(user) {
    return api.post("/login",user)
      .then((response) => {
        return response.data.data;
      })
  }
  
  logout() {
    return api.get("/logout").then((response) => {
      return response.data;
    });
  }

  getUser() {
    return api.get("/user");
  }

  register(user) {
    return api.post("/auth/signup", user).then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();