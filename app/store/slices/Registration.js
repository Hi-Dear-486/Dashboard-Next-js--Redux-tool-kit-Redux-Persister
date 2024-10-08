"use client";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  formData: {
    rollNumber: "64",
    reference: "Ali",
    proficiencyTests: [],
    languages: [],
    digitalSkills: [],
    softwareProficiency: [],
    occupation: "Software Engineer",
    idCard: "9876545678",
    name: "Muhammad zeeshan",
    father: "Boota",
    address: "Canaal road Faisalabad",
    phoneNo: "03485429204",
    email: "fullstack@gmail.com",
    gender: [],
    mobile: "03497849159",
    degree: "BSSE",
    university: "FSD",
    CGPA: "3",
    courseCompletion: "Freelancing",
    studentSignature: "zeeshan",
    dateOfBirth: "",
    date: "",
  },
};

const registrationForm = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    addmissionField: (state, { payload }) => {
      state.formData = {
        ...state.formData,
        ...payload,
      };
    },
  },
});

export const { addmissionField } = registrationForm.actions;
export const selectFormData = (state) => state.registrationForm;

export default registrationForm;
