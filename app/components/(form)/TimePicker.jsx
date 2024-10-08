import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

const FormTimePicker = ({ label, darkMode }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          "& > :not(style)": {
            width: { xs: "100%", sm: "70%", md: "50%", lg: "25ch" },
          },
          bgcolor: darkMode ? "white" : "white",
        }}
      >
        <TimePicker
          label={label}
          value={selectedTime}
          onChange={(newValue) => setSelectedTime(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default FormTimePicker;
