import http from "../http-common";

class UserDataService {

  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }

  logout() {
    return http.get("/logout");
  }

  getUser() {
    return http.get("/user");
  }

}

export default new UserDataService();
