import http from "./api.service";

class FacturasDataService {
  getAll(params) {
    return http.get("/facturas",{params});
  }

  get(id) {
    return http.get(`/facturas/${id}`);
  }

  create(data) {
    return http.post("/facturas", data);
  }

  update(id, data) {
    return http.put(`/facturas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/facturas/${id}`);
  }

  deleteAll() {
    return http.delete(`/facturas`);
  }

  findByTitle(title) {
    return http.get(`/facturas?title=${title}`);
  }
}

export default new facturasDataService();
