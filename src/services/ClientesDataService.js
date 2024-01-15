import http from "./api.service";

class ClientesDataService {
  getAll(params) {
    return http.get("/clientes",{params});
  }

  get(id) {
    return http.get(`/clientes/${id}`);
  }

  create(data) {
    return http.post("/clientes", data);
  }

  update(id, data) {
    return http.put(`/clientes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clientes/${id}`);
  }

  deleteAll() {
    return http.delete(`/clientes`);
  }

  findByTitle(title) {
    return http.get(`/clientes?title=${title}`);
  }
}

export default new ClientesDataService();
