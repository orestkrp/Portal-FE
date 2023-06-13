import { Controller, useForm } from "react-hook-form";
import "./login.scss";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { LoginSchema } from "../../validation/login";
import { CustomTextField } from "../../styled-components/custom-text-field";
import { PrimaryCustomButton } from "../../styled-components/primary-custom-button";

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
  });
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h1 className="login-form__logo">Portal</h1>
      <h2 className="login-form__title">Log in</h2>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <CustomTextField
            label="Email"
            size="small"
            type="text"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message || " "}
            {...field}
            className="login-form__input"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <CustomTextField
            label="Password"
            type="password"
            size="small"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message || " "}
            {...field}
            className="login-form__input"
          />
        )}
      />
      <PrimaryCustomButton
        className="login-form__submit"
        variant="contained"
        type="submit"
        color="primary"
      >
        Sign in
      </PrimaryCustomButton>
      <p>
        Don&apos;t have an account yet?&nbsp;
        <Link to="/register" className="login-form__link">
          Sign up
        </Link>
      </p>
    </form>
  );
};
