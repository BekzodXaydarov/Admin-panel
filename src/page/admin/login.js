import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoader } from "../../redux/loader";
import { Config, postRequest } from "../../services/api";
import { useUser } from "../../redux/selectors";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", password: "" },
    validate: {
      name: (value) =>
        value.length < 12 ? "Name must have at least 12 letters" : null,
      password: (value) =>
        value.length < 6 ? "Name must have at least 6 letters" : null,
    },
  });
  const onSubmit = (date) => {
    const data = JSON.stringify({
      phone_number: date.name,
      password: date.password,
    });

    postRequest("auth/login", user?.token)
      .then(({ data }) => {
        dispatch(setUser(data?.result));
        dispatch(setLoader(false));
        form.setValues({
          name: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("error=>", error);
        dispatch(setLoader(true));
        toast.error("Error");
      });
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      style={{
        margin: "0 auto",
        width: "400px",
        marginTop: "150px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login in</h1>
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <TextInput
          label="Phone_number"
          placeholder="998"
          {...form.getInputProps("name")}
          type="number"
          mt={"15px"}
        />
        <TextInput
          mt={"15px"}
          label="Password"
          placeholder="password"
          type="text"
          {...form.getInputProps("password")}
        />
        <Button type="submit" mt={"15px"} style={{ width: "100%" }}>
          Sign in
        </Button>
      </div>
    </form>
  );
}
