"use client";
import FormAutoComplete from "@/app/components/(form)/AutoComplete";
import FormDatePicker from "@/app/components/(form)/DatePicker";
import FormNumberField from "@/app/components/(form)/NumberField";
import FormSubmit from "@/app/components/(form)/Submit";
import FormTextfield from "@/app/components/(form)/TextField";
import FormYearPicker from "@/app/components/(form)/Year";
import { Box, Paper, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addmissionField,
  selectFormData,
} from "@/app/store/slices/Registration";
import Swal from "sweetalert2";
import formatDates from "@/app/utils/other";

const CustomTypography = styled(Typography)({
  fontFamily: "Familiar Pro",
});

const createValidationSchema = Yup.object().shape({
  rollNumber: Yup.number()
    .required("Roll Number is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  reference: Yup.string().required("Reference is required"),

  proficiencyTests: Yup.array().required(
    "At least one proficiency test is required"
  ),

  languages: Yup.array().required("At least one language is required"),

  digitalSkills: Yup.array().required("At least one digital skill is required"),

  softwareProficiency: Yup.array().required(
    "At least one software proficiency is required"
  ),

  occupation: Yup.string().required("Occupation is required"),

  idCard: Yup.number()
    .required("National ID Card No is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  name: Yup.string().required("Name is required"),

  father: Yup.string().required("Father's name is required"),

  address: Yup.string().required("Address is required"),

  phoneNo: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits"),

  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),

  gender: Yup.array().required("Gender is required"),

  mobile: Yup.number()
    .required("Mobile number is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  degree: Yup.string().required("Degree is required"),

  year: Yup.number()
    .required("Year is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  university: Yup.string().required("Board/University is required"),

  CGPA: Yup.number()
    .required("Grade/CGPA is required")
    .typeError("Must be a number")
    .positive("Must be a positive number"),

  courseCompletion: Yup.string().required(
    "Plan after course completion is required"
  ),

  studentSignature: Yup.string().required("Student Signature is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .typeError("Must be a valid date"),
  date: Yup.date()
    .required("Date is required")
    .typeError("Must be a valid date"),
});

const RegistrationForm = ({ darkMode }) => {
  const { formData } = useSelector(selectFormData);
  const darkModecss = {
    bgcolor: darkMode ? "#424242" : "white",
    color: darkMode ? "white" : "black",
  };

  const methods = useForm({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      ...formData,
      gender: formData.gender || [], // Default to an empty array
    },
  });

  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const formatdata = formatDates(data);
    try {
      dispatch(addmissionField(formatdata));
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
    <>
      <Box component={Paper} sx={{ ...darkModecss, p: 2 }}>
        <CustomTypography variant="h6" gutterBottom mb={2}>
          FOR OFFICE USE ONLY
        </CustomTypography>
        <FormProvider {...methods}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormNumberField
                  darkMode={{ darkMode }}
                  label={"Roll No"}
                  name={"rollNumber"}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormTextfield
                  darkMode={{ darkMode }}
                  label={"Reference"}
                  name={"reference"}
                />
              </Grid>
            </Grid>

            {/* Select courses */}
            <Box component={Paper} sx={{ ...darkModecss, p: 2, mt: 2 }}>
              <CustomTypography variant="h6" gutterBottom>
                Select Courses
              </CustomTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormAutoComplete
                    darkMode={{ darkMode }}
                    label={"Language Proficiency Tests"}
                    courses={[
                      { title: "IELTS" },
                      { title: "Duolingo" },
                      { title: "ELLT" },
                      { title: "PTE" },
                    ]}
                    name={"proficiencyTests"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormAutoComplete
                    darkMode={{ darkMode }}
                    label={"Languages"}
                    courses={[
                      { title: "English" },
                      { title: "Korean" },
                      { title: "German" },
                      { title: "SEO" },
                    ]}
                    name={"languages"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormAutoComplete
                    darkMode={{ darkMode }}
                    label={"Digital Skills"}
                    courses={[
                      { title: "Digital Marketing" },
                      { title: "Web Development" },
                      { title: "Graphics" },
                      { title: "SEO" },
                    ]}
                    name={"digitalSkills"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormAutoComplete
                    darkMode={{ darkMode }}
                    label={"Software Proficiency"}
                    courses={[
                      {
                        title: "QuickBook",
                      },
                      { title: "AutoCAD" },
                      { title: "MS Office" },
                      { title: "Other" },
                    ]}
                    name={"softwareProficiency"}
                  />
                </Grid>
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
                    darkMode={{ darkMode }}
                    label={"Occupation"}
                    name={"occupation"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormNumberField
                    darkMode={{ darkMode }}
                    label={"National ID Card No"}
                    name={"idCard"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Name"}
                    name={"name"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Father"}
                    name={"father"}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Address"}
                    name={"address"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormNumberField
                    darkMode={{ darkMode }}
                    label={"Ph No"}
                    name={"phoneNo"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Email"}
                    name={"email"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormDatePicker
                    darkMode={{ darkMode }}
                    label={"Date of Birth"}
                    name={"dateOfBirth"}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={3}>
                  <FormAutoComplete
                    darkMode={{ darkMode }}
                    label={"Gender"}
                    courses={[
                      { title: "Male" },
                      { title: "Female" },
                      { title: "Other" },
                    ]}
                    name={"gender"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormNumberField
                    darkMode={{ darkMode }}
                    label={"Mobile #:"}
                    name={"mobile"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}></Grid>
                <Grid item xs={12} sm={3}></Grid>
              </Grid>
            </Box>

            <Box component={Paper} sx={{ p: 2, ...darkModecss }}>
              <Box sx={{ mt: 2, mb: 2 }}>
                <CustomTypography variant="h6" gutterBottom>
                  Qualification
                </CustomTypography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Degree"}
                    name={"degree"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormYearPicker
                    darkMode={{ darkMode }}
                    label={"Year"}
                    name={"year"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Board/University"}
                    name={"university"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Grade/CGPA"}
                    name={"CGPA"}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box component={Paper} sx={{ p: 2, ...darkModecss }}>
              <Box sx={{ mt: 2, mb: 2 }}>
                <CustomTypography variant="h6" gutterBottom>
                  What's your Plan
                </CustomTypography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"After this Course Completion"}
                    name={"courseCompletion"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormTextfield
                    darkMode={{ darkMode }}
                    label={"Student Signature"}
                    name={"studentSignature"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormDatePicker
                    darkMode={{ darkMode }}
                    label={"Date"}
                    name={"date"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormSubmit />
                </Grid>
              </Grid>
            </Box>
          </form>
        </FormProvider>
        {/* Closing the form here */}
      </Box>
    </>
  );
};

export default RegistrationForm;
