import FormExamBooking from "@/app/components/(form)/ExamBooking";
import { Box } from "@mui/material";
import React from "react";

const PTEBooking = ({ darkMode }) => {
  return (
    <Box>
      <FormExamBooking darkMode={darkMode} ExamType={"PTE"} />
    </Box>
  );
};

export default PTEBooking;
