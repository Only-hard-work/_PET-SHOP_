import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/user";

class UserService {
  async getUserInfo(userId: number) {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  }
}

const userService = new UserService();
export default userService;
