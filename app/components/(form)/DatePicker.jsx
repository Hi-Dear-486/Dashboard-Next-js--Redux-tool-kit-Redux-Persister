"use client";
import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

function FormDatePicker({ darkMode, label, name }) {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const formattedDate = selectedDate.format("MM/DD/YYYY");
    setValue(name, formattedDate);
  }, [selectedDate, setValue, name]);

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
    setValue(name, newValue ? dayjs(newValue).toISOString() : null);
  };

  const onSubmit = (data) => {
    console.log("what is in dattt", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            "& > :not(style)": {
              width: { xs: "100%", sm: "70%", md: "50%", lg: "25ch" },
            },
          }}
        >
          <DatePicker
            label={label}
            value={selectedDate}
            onChange={handleChange}
            sx={{
              bgcolor: darkMode ? "white" : "white",
              color: "black",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                {...register(name, { required: "This field is required" })}
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
          {errors[name]?.message && (
            <Typography color="error" fontSize="0.875rem">
              {errors[name]?.message}
            </Typography>
          )}
        </Box>
      </form>
    </LocalizationProvider>
  );
}

export default FormDatePicker;
