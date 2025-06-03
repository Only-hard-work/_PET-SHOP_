// Добавьте новый компонент FilterPanel
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material';

interface FilterPanelProps {
  filters: {
    priceRange: [number, number];
    type: string;
    breed: string;
    age: [number, number];
    sortBy: string;
  };
  onFilterChange: (name: string, value: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Filters
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => onFilterChange('priceRange', value)}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
        />
      </Box>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Pet Type</InputLabel>
        <Select
          value={filters.type}
          label="Pet Type"
          onChange={(e: SelectChangeEvent) => onFilterChange('type', e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="dog">Dogs</MenuItem>
          <MenuItem value="cat">Cats</MenuItem>
          <MenuItem value="bird">Birds</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sortBy}
          label="Sort By"
          onChange={(e: SelectChangeEvent) => onFilterChange('sortBy', e.target.value)}
        >
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="age">Age</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Age Range</Typography>
        <Slider
          value={filters.age}
          onChange={(_, value) => onFilterChange('age', value)}
          valueLabelDisplay="auto"
          min={0}
          max={15}
        />
      </Box>
    </Paper>
  );
};
