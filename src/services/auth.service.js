import api from "./api.service";
import TokenService from "./token.service";

class AuthService {
  login(user) {
    return api.post("/login",user)
      .then((response) => {
        return response.data.data;
      })
  }
  
  logoutapi() {
    return api.get("/logout").then((response) => {
      TokenService.removeUser();
      return response.data;
    });
  }

  getUser() {
    return api.get("/user");
  }

  logout() {
    TokenService.removeUser();
  }
  
  register(user) {
    return api.post("/auth/signup", user);
  }
}

export default new AuthService();