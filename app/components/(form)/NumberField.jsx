"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

const FormNumberField = ({ label, darkMode, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        "& > :not(style)": {
          width: { xs: "100%", sm: "70%", md: "50%", lg: "25ch" },
        },
      }}
    >
      <TextField
        label={label}
        type="number"
        variant="filled"
        {...register(name)} // register the field using the name prop
        sx={{
          bgcolor: darkMode ? "#fff" : "#fff",
          color: "#333",
          "& .MuiInputBase-input": {
            color: darkMode ? "#333" : "#333",
          },
          width: "100%",
        }}
        error={!!errors[name]} // Access the errors correctly
        helperText={errors[name]?.message} // Access the message correctly
      />
    </Box>
  );
};

export default FormNumberField;
