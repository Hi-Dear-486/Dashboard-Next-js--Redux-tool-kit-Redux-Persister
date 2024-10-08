"use client";
import React from "react";
import FormNumberField from "../components/(form)/NumberField";
import { FormProvider, useForm } from "react-hook-form";
import FormSubmit from "../components/(form)/Submit";
import { Grid } from "@mui/material";

const Example = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("check the form registration data", data);
  };

  return (
    <FormProvider {...methods}>
      {/* Only one form tag here */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormNumberField label={"example"} name={"RollNumber"} />
          </Grid>
        </Grid>
        <FormSubmit /> {/* Make sure FormSubmit does not render a <form> */}
      </form>
    </FormProvider>
  );
};

export default Example;
