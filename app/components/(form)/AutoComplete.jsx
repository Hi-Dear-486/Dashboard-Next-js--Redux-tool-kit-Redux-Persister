"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function FormAutoComplete({
  label,
  darkMode,
  courses,
  gender,

  name,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        "& > :not(style)": {
          width: { xs: "100%", sm: "70%", md: "50%", lg: "25ch" },
        },
        margin: "0 auto",
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={courses || gender}
            getOptionLabel={(option) => option.title || ""}
            isOptionEqualToValue={(option, value) =>
              option.title === value?.title
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="filled"
                sx={{ bgcolor: darkMode ? "white" : "white" }}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            )}
            onChange={(_, value) => {
              field.onChange(value ? [value] : []); // Wrap value in an array
            }}
            value={field.value[0] || null} // Ensure only one value is displayed
          />
        )}
      />
    </Box>
  );
}
