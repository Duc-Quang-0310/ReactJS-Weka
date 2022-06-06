import axios from "axios";

class AxiosService {
  async login(email, password) {
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const { data } = response;
        return {
          success: data.success,
          data: data.message,
          user: data.data,
        };
      }
    } catch (e) {
      console.log(e);
      return { success: false, data: e.response.data };
    }
  }

  async signUp(email, password) {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/new-user",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (e) {
      console.log(e);
      return { success: false, data: e.response.data };
    }
  }

  async recoverPassword(email, newPassword) {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/password-recover",
        {
          email,
          newPassword,
        }
      );
      if (response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (e) {
      console.log(e);
      return { success: false, data: e.response.data };
    }
  }

  async diagnose(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/diabettes-diagnose",
        data
      );
      if (response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (e) {
      console.log(e);
      return { success: false, data: e.response.data };
    }
  }
}

export default new AxiosService();
