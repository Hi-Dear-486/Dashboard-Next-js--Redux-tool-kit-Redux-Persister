"use client";
import React from "react";
import { Button, TextField, Box } from "@mui/material";

const FormSubmit = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default FormSubmit;
