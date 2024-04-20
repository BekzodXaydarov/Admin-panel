import { Button, NumberInput, Select } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Config } from "../../services/api";

export default function Form({ handleUpdate, close }) {
  const [id, setId] = useState(0);
  const [poeple, setPoeple] = useState(0);
  const [status, setStatus] = useState("");
  const onSubmit = () => {
    const data = JSON.stringify({
      name: id,
      room_type_id: id,
      places: poeple,
      room_type_name: status,
    });
    axios
      .request(
        Config(
          "post",
          "room/create",
          data,
          "91|jPoOjiFT2oXQ1jgCiEI0Ltu0eHEPf7Itw78HmXpr6172bc08"
        )
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Data is add");
        handleUpdate(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });

    close();
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <NumberInput
        defaultValue={0}
        placeholder="Xona/Stol raqami"
        label="Xona/Stol raqami"
        onChange={(e) => setId(e)}
        value={id}
      />
      <NumberInput
        mt={"15px"}
        defaultValue={0}
        placeholder="Nechi kishilik"
        label="Nechi kishilik"
        onChange={(e) => setPoeple(e)}
        value={poeple}
      />
      <Select
        mt={"15px"}
        data={[
          { value: "Xona", label: "Xona" },
          { value: "Stol", label: "Stol" },
        ]}
        placeholder="Joy Turi"
        label="Joy Turi"
        onChange={(e) => setStatus(e)}
        value={status}
      />
      <Button onClick={() => onSubmit()} color="blue" ml={"75%"} mt={"20px"}>
        Yuborish
      </Button>
    </form>
  );
}
