"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const createValidationSchema = (name) =>
  Yup.object().shape({
    [name]: Yup.number()
      .required(`${name} is required`)
      .typeError("Must be a number")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
  });

const FormWrapper = ({ children, name }) => {
  const methods = useForm({
    resolver: yupResolver(createValidationSchema(name)),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormWrapper;
