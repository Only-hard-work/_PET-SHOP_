import { Request, Response } from "express";
import Pet from "../models/pet.model";
import { ImageService } from "../services/image.service";

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

  async createPet(req: Request, res: Response) {
    try {
      const { name, breed, age, price, description, ownerId, type } = req.body;
      const imageUrl = await ImageService.getImageUrl(req.file);

      const pet = await Pet.create({
        name,
        breed,
        age: Number(age),
        price: Number(price),
        description,
        image: imageUrl,
        ownerId: ownerId ? Number(ownerId) : null,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json(pet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating pet", error });
    }
  },

  async updatePet(req: Request, res: Response): Promise<void> {
    try {
      const { name, breed, age, price, description, ownerId, type, image, id } =
        req.body;

      const imageUrl = req.file
        ? await ImageService.getImageUrl(req.file)
        : image;

      const pet = await Pet.findByPk(id);

      if (!pet) {
        res.status(404).json({ message: "Pet not found" });
        return;
      }

      await pet.update({
        name,
        breed,
        age: age ? Number(age) : undefined,
        price: price ? Number(price) : undefined,
        description,
        image: imageUrl,
        ownerId: ownerId ? Number(ownerId) : null,
        type,
        updatedAt: new Date(),
      });

      res.json(pet);
    } catch (error) {
      console.error("Error updating pet:", error);
      res.status(500).json({ message: "Error updating pet", error });
    }
  },

  async deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.id;

      if (!petId || isNaN(Number(petId))) {
        res.status(400).json({ message: "Invalid pet ID" });
      }

      const pet = await Pet.findByPk(petId);

      if (!pet) {
        res.status(404).json({ message: "Pet not found" });
      } else await pet.destroy();
      res.status(200).json({ message: `Pet with id ${petId} removed!` });
    } catch (error) {
      res.status(500).json({ message: "Error deleting pet", error });
    }
  },

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
