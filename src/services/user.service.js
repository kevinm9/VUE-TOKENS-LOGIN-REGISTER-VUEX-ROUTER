import api from './api.service';

class UserService {
  getPublicContent() {
    return api.get('/test/all');
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();
