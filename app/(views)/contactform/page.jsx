import { yupResolver } from "@hookform/resolvers/yup";
import FormAutoComplete from "@/app/components/(form)/AutoComplete";
import FormDatePicker from "@/app/components/(form)/DatePicker";
import FormNumberField from "@/app/components/(form)/NumberField";
import FormSubmit from "@/app/components/(form)/Submit";
import FormTextfield from "@/app/components/(form)/TextField";
import { Box, Paper, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { contactField, selectFormData } from "@/app/store/slices/Contact";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const CustomTypography = styled(Typography)({
  fontFamily: "Familiar Pro",
});

// Validation schema
const createValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileNo: yup
    .string()
    .matches(/^[0-9]+$/, "Must be a number")
    .required("Mobile number is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters long"),
});

const ContactForm = ({ darkMode }) => {
  const { formData } = useSelector(selectFormData);
  const darkModecss = {
    bgcolor: darkMode ? "#424242" : "white",
    color: darkMode ? "white" : "black",
  };

  const methods = useForm({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      ...formData,
    },
  });

  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    try {
      dispatch(contactField(data));
      Swal.fire({
        icon: "success",
        title: "Submission Successful",
        text: "Your data has been submitted successfully!",
        confirmButtonText: "Ok",
      }).then(() => {
        reset();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your data. Please try again.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box component={Paper} sx={{ ...darkModecss, p: 2 }}>
          <CustomTypography variant="h6" gutterBottom mb={2}>
            Contact Us
          </CustomTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormTextfield darkMode={darkMode} label="Name" name="name" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextfield darkMode={darkMode} label="Email" name="email" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormNumberField
                darkMode={darkMode}
                label="Mobile No"
                name="mobileNo"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextfield
                darkMode={darkMode}
                label="Message"
                name="message"
                rows={8}
              />
            </Grid>
          </Grid>
          <FormSubmit />
        </Box>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
