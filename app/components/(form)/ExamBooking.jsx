import FormAutoComplete from "@/app/components/(form)/AutoComplete";
import FormDatePicker from "@/app/components/(form)/DatePicker";
import FormNumberField from "@/app/components/(form)/NumberField";
import FormTextfield from "@/app/components/(form)/TextField";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormSubmit from "./Submit";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dateFormatter from "@/app/utils/other";
import formatDates from "@/app/utils/other";
import { useDispatch, useSelector } from "react-redux";
import {
  examBookingField,
  selectFormData,
} from "@/app/store/slices/Exambooking";
import Swal from "sweetalert2";

const CustomTypography = styled(Typography)({
  fontFamily: "Familiar Pro",
});

// Define your validation schema
const createValidationSchema = yup.object().shape({
  examType: yup.array().required("Exam Type is required"),
  examDate: yup.date().required("Exam Date is required").nullable(),
  examCity: yup.string().required("Exam City is required"),
  firstName: yup.string().required("First Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNo: yup.string().required("Mobile No is required"),
  dateOfBirth: yup.date().required("Date of Birth is required").nullable(),
  idCard: yup.string().required("ID CARD / Passport No is required"),
  exDate: yup.date().required("EX Date is required").nullable(),
  feeDate: yup.date().required("Fee Paid date is required").nullable(),
  paymentDate: yup.date().required("Payment Date is required").nullable(),
});

const FormExamBooking = ({ darkMode, ExamType }) => {
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
    const formattedData = formatDates(data);
    try {
      dispatch(examBookingField(formattedData));
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
            FOR Candidate Use
          </CustomTypography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormAutoComplete
                darkMode={darkMode}
                label={"Exam Type"}
                name="examType" // Ensure name prop is set
                courses={[
                  { title: "IELTS AC" },
                  { title: "UKVI IELTS AC" },
                  { title: "UKVI Life Skills A1" },
                  { title: "IELTS GT" },
                  { title: "UKVI IELTS GT" },
                  { title: ExamType },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormDatePicker
                darkMode={darkMode}
                label={"Exam Date"}
                name="examDate"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormTextfield
                darkMode={darkMode}
                label={"Exam City"}
                name="examCity"
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
        </Box>

        {/* Personal Details */}

        <Box component={Paper} sx={{ p: 2, ...darkModecss }}>
          <Box sx={{ mt: 2, mb: 2 }}>
            <CustomTypography variant="h6" gutterBottom>
              Personal Details
            </CustomTypography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormTextfield
                darkMode={darkMode}
                label={"First Name"}
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormTextfield
                darkMode={darkMode}
                label={"Surname"}
                name="surname"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormTextfield darkMode={darkMode} label={"Email"} name="email" />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={3}>
              <FormNumberField
                darkMode={darkMode}
                label={"Mobile No"}
                name="mobileNo"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormDatePicker
                darkMode={darkMode}
                label={"Date of Birth"}
                name="dateOfBirth"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormNumberField
                darkMode={darkMode}
                label={"ID CARD / Passport No"}
                name="idCard"
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={3}>
              <FormDatePicker
                darkMode={darkMode}
                label={"EX Date"}
                name="exDate"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormDatePicker
                darkMode={darkMode}
                label={"Fee Paid"}
                name="feeDate"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormDatePicker
                darkMode={darkMode}
                label={"Payment Date"}
                name="paymentDate"
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>

          {/* Submit Button */}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <FormSubmit />
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};

export default FormExamBooking;
