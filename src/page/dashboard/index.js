import { Title } from "@mantine/core";
import React, { useState } from "react";

export default function Dashboard() {
  const [departments, setDepartments] = useState({
    label: "Afitsantlar",
    value: "0",
  });
  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <Title>Hisobotlar {departments?.label} bo'yicha</Title>
    </div>
  );
}
