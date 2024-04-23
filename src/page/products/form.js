import { Button, NumberInput, TextInput } from "@mantine/core";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { getRequest } from "../../services/api";
import { useUser } from "../../redux/selectors";

export default function Form({ close, handleUpdate }) {
  const user = useUser();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", price: 0 },
    validate: {
      // name: (value) =>
      //   value.length < 12 ? "Name must have at least 12 letters" : null,
    },
  });

  const onSubmit = (data) => {
    getRequest("category/get", user?.token)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error");
      });
  };
  // const onSubmit = () => {
  //   const data = JSON.stringify({
  //     category_id: 3,
  //     measurement_id: 6,
  //     name: "Cake 4",
  //     image_path: "images/0f7e4eec-073f-4229-94f9-b19cf0b69fbb.jpg",
  //     is_infinite: 1,
  //     quantity: 3,
  //     body_price: 6000,
  //     sell_price: 6000,
  //   });
  //   axios
  //     .request(
  //       Config(
  //         "post",
  //         "product/create",
  //         data,
  //         "91|jPoOjiFT2oXQ1jgCiEI0Ltu0eHEPf7Itw78HmXpr6172bc08"
  //       )
  //     )
  //     .then(({ data }) => {
  //       toast.success("Product is Add");
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       toast.error("Error");
  //     });

  //   close();
  // };
  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput label="Name" name="name" {...form.getInputProps("name")} />
        <NumberInput
          mt="md"
          label="Price"
          placeholder="Price"
          {...form.getInputProps("price")}
        />
        <Button type="submit" variant="filled">
          Submit
        </Button>
      </form>
    </div>
  );
}
