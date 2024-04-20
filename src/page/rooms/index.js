import { Button, Text, Title, Table } from "@mantine/core";
import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { setRoom } from "../../redux/rooms";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/modal/modal";
import Form from "./form";
import { PlusIcon } from "../../assets/svgs";
import { toast } from "react-toastify";
import { setLoader } from "../../redux/loader";
import { Config, getRequest } from "../../services/api";

export default function Room() {
  const rooms = useSelector((room) => room.rooms);
  const user = useSelector(({ redux }) => redux);
  const dispatch = useDispatch();
  const handleGetRooms = useCallback(
    (update) => {
      if (!update && rooms?.length) return;
      dispatch(setLoader(true));
      getRequest("room/get", user?.token)
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setRoom(data?.result));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error(err?.response?.data?.message || "Error");
        });
    },
    [dispatch, rooms?.length, user?.token]
  );
  const handleDelete = ({ id }) => {
    console.log(id);
    let data = JSON.stringify({
      room: id,
    });
    axios
      .request(Config(
        "delete",
        `room/delete/${id}`,
        data,
        "91|jPoOjiFT2oXQ1jgCiEI0Ltu0eHEPf7Itw78HmXpr6172bc08"
      ))
      .then((response) => {
        toast.success("Data is delete")
        handleGetRooms(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error")
      });
  };
  const GetRoom = () => {
    let data = "";



    axios
      .request(Config("get","room/get",data,"91|jPoOjiFT2oXQ1jgCiEI0Ltu0eHEPf7Itw78HmXpr6172bc08"))
      .then(({ data }) => {
        dispatch(setRoom(data?.result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  GetRoom();

  

  useEffect(() => {
    handleGetRooms();
  }, [handleGetRooms]);
  const rows = rooms.map((element) => {
    // console.log(element);
    return (
      <Table.Tr key={element.name}>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.name}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.room_type_name}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {element.places}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          <Button color="red" onClick={() => handleDelete(element)}>
            O`chirish
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div style={{ width: "75%" }}>
      <div
        className="room_header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Title>Xonalar/Stollar</Title>
        <Modal
          btn_title={
            <>
              <PlusIcon fill="#fff" />{" "}
              <Text ml={"15px"}>Yangi xona/stol qo`shish</Text>
            </>
          }
          title={"Yangi xona/stol qo`shish"}
          body={({ close }) => (
            <Form close={close} handleUpdate={handleGetRooms} />
          )}
        />
      </div>
      <div className="room_body" style={{ padding: "10px" }}>
        <Table striped highlightOnHover style={{ border: "1px solid black" }}>
          <Table.Thead>
            <Table.Tr style={{ border: "1px solid black" }}>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Xona/Stol raqami
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Status
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  Nechi kishilik
                </Text>
              </Table.Th>
              <Table.Th style={{ border: "1px solid black" }}>
                <Text fw={600} fz={"17px"}>
                  O'chirish
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
         <Table.Tbody>
          {rows}
         </Table.Tbody>
        </Table>
        {
        rows ? null:<Text style={{textAlign:"center"}}>Ma`lumotlar yo`q</Text>
        }
      </div>
    </div>
  );
}
