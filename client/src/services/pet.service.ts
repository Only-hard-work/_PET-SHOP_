import axios from "axios";
import { Pet } from "../types";

const API_URL = process.env.REACT_APP_API_URL + "/api/pets";

class PetService {
  async getAllPets(): Promise<Pet[]> {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getPetById(id: number): Promise<Pet> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async createPet(petData: FormData): Promise<Pet> {
    const response = await axios.post(`${API_URL}/new`, petData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }

  async serchPets(query: string): Promise<Pet[]> {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
  }
}

export default new PetService;
