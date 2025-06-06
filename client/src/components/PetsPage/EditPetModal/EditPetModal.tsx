import { useState, useRef, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  CircularProgress,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Modal,
} from "@mui/material";
import { RootState, useAppDispatch } from "../../../stores/configureStore";
import { useSelector } from "react-redux";
import { Pet } from "../../../types";
import { updatePet } from "../../../actions/pet.actions";

type PetFormData = {
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  age: number;
  price: number;
  description: string;
};

type PetEditModalProps = {
  open: boolean;
  onClose: () => void;
  pet: Pet;
};

export const PetEditModal = ({ open, onClose, pet }: PetEditModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<PetFormData>({
    mode: "onChange",
    defaultValues: {
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      price: pet.price,
      description: pet.description,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (pet) {
      reset({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        price: pet.price,
        description: pet.description,
      });
      if (pet.image) setPreviewImage(pet.image);
    }
  }, [pet, reset, onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setPreviewImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<PetFormData> = async (data) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", pet.id.toString());
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("breed", data.breed);
      formData.append("age", data.age.toString());
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("ownerId", user.id.toString());

      if (selectedFile) {
        formData.append("image", selectedFile);
      } else {
        formData.append("image", previewImage || "");
      }

      await dispatch(updatePet(formData));
      onClose();
    } catch (error) {
      console.error("Error updating pet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Редактировать питомца
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              src={previewImage || undefined}
              sx={{
                width: 200,
                height: 200,
                bgcolor: previewImage ? "transparent" : "grey.200",
                mb: 2,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              variant="rounded"
              onClick={triggerFileInput}
            >
              {!previewImage && (
                <Typography variant="caption" color="text.secondary">
                  Нажмите для изменения фото
                </Typography>
              )}
            </Avatar>

            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <Button variant="outlined" onClick={triggerFileInput} color="secondary" sx={{ mb: 1 }}>
              Изменить фото
            </Button>
          </Box>

          {/* Form Fields */}
          <Stack spacing={3}>
            <TextField
              label="Имя питомца"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message || " "}
              {...register("name", {
                required: "Обязательное поле",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />

            <Controller
              name="type"
              control={control}
              rules={{ required: "Выберите тип" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Тип животного</InputLabel>
                  <Select {...field} label="Тип животного" value={field.value}>
                    <MenuItem value="dog">Собака</MenuItem>
                    <MenuItem value="cat">Кошка</MenuItem>
                    <MenuItem value="other">Другое</MenuItem>
                  </Select>
                  {errors.type && (
                    <Typography color="error" variant="caption">
                      {errors.type.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <TextField
              label="Порода"
              fullWidth
              error={!!errors.breed}
              helperText={errors.breed?.message || " "}
              {...register("breed", {
                required: "Обязательное поле",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Возраст (лет)"
                type="number"
                fullWidth
                error={!!errors.age}
                helperText={errors.age?.message || " "}
                {...register("age", {
                  required: "Обязательное поле",
                  min: {
                    value: 0,
                    message: "Возраст не может быть отрицательным",
                  },
                  max: {
                    value: 30,
                    message: "Введите реальный возраст",
                  },
                })}
              />

              <TextField
                label="Цена ($)"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message || " "}
                {...register("price", {
                  required: "Обязательное поле",
                  min: {
                    value: 0,
                    message: "Цена не может быть отрицательной",
                  },
                })}
              />
            </Box>

            <TextField
              label="Описание"
              multiline
              rows={4}
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message || " "}
              {...register("description", {
                required: "Обязательное поле",
                minLength: {
                  value: 10,
                  message: "Минимум 10 символов",
                },
                maxLength: {
                  value: 500,
                  message: "Максимум 500 символов",
                },
              })}
            />
          </Stack>

          {/* Form Actions */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !isValid}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              sx={{ minWidth: 180 }}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
