const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  formData: { name: "", email: "", mobileNo: "", message: "" },
};
const contactForm = createSlice({
  name: "contactForm",
  initialState,
  reducers: {
    contactField: (state, { payload }) => {
      state.formData = {
        ...state.formData,
        ...payload,
      };
    },
  },
});

export const { contactField } = contactForm.actions;
export const selectFormData = (state) => state.contactForm;

export default contactForm;
