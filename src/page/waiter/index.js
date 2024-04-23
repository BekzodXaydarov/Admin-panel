import { Button, Flex, Table, Title, Text } from "@mantine/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWaiter } from "../../redux/waiter";
import { setLoader } from "../../redux/loader";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Reload } from "../../assets/svgs";
import { useUser, useWaiter } from "../../redux/selectors";

export default function Waiter() {
  const waiters = useWaiter();
  const user = useUser();
  const dispatch = useDispatch();
  const handleGetWaiters = useCallback(
    (update) => {
      if (!update && waiters?.length) return;
      dispatch(setLoader(true));
      getRequest("user/get", user?.token)
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setWaiter(data?.result));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    },
    [dispatch, waiters?.length, user?.token]
  );

  useEffect(() => {
    handleGetWaiters();
  }, [handleGetWaiters]);
  const rows = waiters.map((element) => {
    return (
      <Table.Tr key={element.name}>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.is_active === 1 ? (
            <Button color="blue">Active</Button>
          ) : (
            <Button color="red">Active emas</Button>
          )}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.full_name}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.phone_number}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          <Button color="red">O`chirish</Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div
      style={{ width: "75%", height: "100vh", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Title>Ofitsiantlar</Title>
        <Button onClick={() => handleGetWaiters(true)}>
          <Flex align={"center"} gap={10}>
            <Reload fill="#fff" />
            <span>Ma'lumotlarni Yangilash</span>
          </Flex>
        </Button>
      </div>
      <div style={{ padding: "15px", overflow: "auto", height: "94vh" }}>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{
            border: "1px solid black",
          }}
        >
          <Table.Thead>
            <Table.Tr style={{ border: "1px solid black" }}>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Status
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Ofitsiant ismi
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Ofitsiant Raqami
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Ishdan olish
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Tfoot>
            <Table.Tr style={{ border: "1px solid black" }}>
              <Table.Td style={{ border: "1px solid black" }}>
                <Text fw={600}>Umumiy ishchilar soni</Text>
              </Table.Td>
              <Table.Td style={{ border: "1px solid black" }}>
                <Text fw={600}>{waiters.length} kishi</Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      </div>
    </div>
  );
}
