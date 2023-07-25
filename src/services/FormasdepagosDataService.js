import http from "./api.service";

class FormasdepagosDataService {
  getAll(params) {
    return http.get("/formasdepagos",{params});
  }

  get(id) {
    return http.get(`/formasdepagos/${id}`);
  }

  create(data) {
    return http.post("/formasdepagos", data);
  }

  update(id, data) {
    return http.put(`/formasdepagos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/formasdepagos/${id}`);
  }

  deleteAll() {
    return http.delete(`/formasdepagos`);
  }

  findByTitle(title) {
    return http.get(`/formasdepagos?title=${title}`);
  }
}

export default new FormasdepagosDataService();
