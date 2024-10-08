"use client";
const { configureStore } = require("@reduxjs/toolkit");
import contactForm from "./slices/Contact";
import examBookingForm from "./slices/Exambooking";
import registrationForm from "./slices/Registration";
const store = configureStore({
  reducer: {
    registrationForm: registrationForm.reducer,
    examBookingForm: examBookingForm.reducer,
    contactForm: contactForm.reducer,
  },
});

export default store;
