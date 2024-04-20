import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoader } from "../../redux/loader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://epos-admin.dadabayev.uz/api/auth/login",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer Bearer 21|1wQQrOXLjbOAPaQRlBPb7mMAQVpxF10I6uiBJLZO567d04ec",
      },
      data: data,
    };

    axios
      .request(config)
      .then(({ data }) => {
        dispatch(setUser(data?.result));
        dispatch(setLoader(false));
        form.setValues({
          name: "",
          password: "",
        });
        navigate('/');
      })
      .catch((error) => {
        console.log("error=>", error);
        dispatch(setLoader(true));
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
