"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

export default function FormTextfield({ darkMode, label, rows, name }) {
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
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        label={label}
        variant="filled"
        multiline
        rows={rows || 0}
        {...register(name)}
        sx={{
          bgcolor: darkMode ? "white" : "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: darkMode ? "lightgray" : "white",
            },
            "&:hover fieldset": {
              borderColor: darkMode ? "lightgray" : "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: darkMode ? "lightgray" : "white",
            },
          },
          maxWidth: "17rem",
        }}
        InputProps={{
          style: { color: darkMode ? "black" : "black" },
        }}
        error={!!errors[name]} // Access the errors correctly
        helperText={errors[name]?.message} // Access the message correctly
      />
    </Box>
  );
}
