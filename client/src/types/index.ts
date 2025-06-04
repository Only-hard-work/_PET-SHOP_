export interface Pet {
  id: number;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: number;
  price: number;
  description: string;
  image: string;
  rating?: number;
  ownerId?: number;
}

export interface PetsState {
  items: Pet[];
  favorites: number[];
  isLoading: boolean;
  error: string | null;
}

export interface PetState {
  pet: Pet;
  isLoading: boolean;
  error: string | null;
}
