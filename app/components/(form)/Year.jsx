"use client";

import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormContext } from "react-hook-form";

function FormYearPicker({ darkMode, label, name }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (newValue) => {
    setSelectedYear(newValue);
    if (newValue) {
      const yearString = newValue.year().toString();
      setValue(name, yearString, { shouldValidate: true }); // Trigger validation on change
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          "& > :not(style)": {
            width: { xs: "100%", sm: "70%", md: "50%", lg: "25ch" },
          },
        }}
      >
        <DatePicker
          label={label}
          value={selectedYear}
          onChange={handleChange}
          sx={{
            bgcolor: darkMode ? "whitesmoke" : "#fff",
            color: "#333",
          }}
          views={["year"]}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              {...register(name)}
              InputProps={{}}
            />
          )}
        />
        {errors[name]?.message && (
          <Typography color="error" fontSize="0.875rem">
            {errors[name]?.message}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default FormYearPicker;
