import http from "./api.service";

class CategoriasDataService {
  getAll(params) {
    return http.get("/categorias",{params});
  }

  get(id) {
    return http.get(`/categorias/${id}`);
  }

  create(data) {
    return http.post("/categorias", data);
  }

  update(id, data) {
    return http.put(`/categorias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categorias/${id}`);
  }

  deleteAll() {
    return http.delete(`/categorias`);
  }

  findByTitle(title) {
    return http.get(`/categorias?title=${title}`);
  }
}

export default new CategoriasDataService();
