"use client";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  formData: {
    examType: [],
    examDate: "",
    examCity: "",
    firstName: "",
    surname: "",
    email: "",
    mobileNo: "",
    dateOfBirth: "",
    idCard: "",
    exDate: "",
    feeDate: "",
    paymentDate: "",
  },
};

const examBookingForm = createSlice({
  name: "examBookingForm",
  initialState,
  reducers: {
    examBookingField: (state, { payload }) => {
      state.formData = {
        ...state.formData,
        ...payload,
      };
    },
  },
});

export const { examBookingField } = examBookingForm.actions;
export const selectFormData = (state) => state.examBookingForm;

export default examBookingForm;
