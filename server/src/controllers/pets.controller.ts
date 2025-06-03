import { Request, Response } from "express";
import { NOW, Op } from "sequelize";
import Pet from "../models/pet.model";

export default {
  // Получить всех питомцев с пагинацией и фильтрацией
  async getAllPets(req: Request, res: Response) {
    try {
      const pets = await Pet.findAll();
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Получить питомца по ID
  async getPetById(req: Request, res: Response) {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.json(pet);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pet", error });
    }
  },

  // Создать нового питомца (для админа)
  async createPet(req: Request, res: Response) {
    try {
      const { name, breed, age, price, description, image, ownerId, type } =
        req.body;

      const pet = await Pet.create({
        name,
        breed,
        age: Number(age),
        price: Number(price),
        description,
        image,
        ownerId: ownerId ? Number(ownerId) : null,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({ message: "Error creating pet", error });
    }
  },

  // Обновить питомца (для админа)
  async updatePet(req: Request, res: Response) {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }

      const updatedPet = await pet.update(req.body);
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: "Error updating pet", error });
    }
  },

  // Удалить питомца (для админа)
  async deletePet(req: Request, res: Response) {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (pet) {
        await pet.destroy();
        res.json({ message: "Pet deleted successfully" });
      } else res.status(404).json({ message: "Pet not found" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting pet", error });
    }
  },

  // Получить популярных питомцев
  async getPopularPets(req: Request, res: Response) {
    try {
      const pets = await Pet.findAll({
        order: [["rating", "DESC"]],
        limit: 5,
      });
      res.json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error fetching popular pets", error });
    }
  },
};
