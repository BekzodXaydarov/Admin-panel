import { Button, Flex, Image, Table, Text, Title } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useProduct, useUser } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loader";
import { setProduct } from "../../redux/product";
import { Config, deleteRequest, getRequest } from "../../services/api";
import { toast } from "react-toastify";
import { Eye, PlusIcon, Reload } from "../../assets/svgs";
import Form from "./form";
import Modal from "../../components/modal/modal";
import axios from "axios";

export default function Product() {
  const user = useUser();
  const product = useProduct();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const handleGetProducts = useCallback(
    (update) => {
      if (!update && product?.length) return;
      dispatch(setLoader(true));
      getRequest("product/get", user?.token)
        .then(({ data }) => {
          dispatch(setLoader(false));
          dispatch(setProduct(data?.result));
        })
        .catch((err) => {
          dispatch(setLoader(false));
          toast.error("Error");
        });
    },
    [dispatch, product?.length, user?.token]
  );
  const handleDelete = (id) => {
    deleteRequest(`product/delete/${id}`, user?.token)
      .then(({ data }) => {
        toast.success("Product is delete");
        handleGetProducts(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };
  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);
  const rows = product.map((elem) => {
    return (
      <Table.Tr style={{ border: "1px solid black" }} key={elem.name}>
        <Table.Td style={{ border: "1px solid black" }}>{elem.name}</Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {elem.sell_price}
        </Table.Td>
        <Table.Td style={{ border: "1px solid black" }}>
          {elem.category.name}
        </Table.Td>
        <Table.Td
          onClick={() =>
            setImage("https://epos-admin.dadabayev.uz/" + elem?.image_path)
          }
          style={{ border: "1px solid black" }}
        >
          <Modal
            title={"Product rasmi"}
            btn_title={
              <Flex align={"center"} gap={10}>
                <Eye /> <Text>Rasmni Ko'rish</Text>
              </Flex>
            }
            body={({ close }) => (
              <Image
                src={image}
                w={300}
                h={300}
                style={{
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            )}
          />
        </Table.Td>
        <Table.Td>
          <Button color="red" onClick={() => handleDelete(elem.id)}>
            O`Chirish
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div style={{ width: "75%", padding: "20px" }}>
      {/* produt head */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>Maxsulotlar</Title>
        <Button onClick={() => handleGetProducts(true)}>
          <Flex align={"center"} gap={10}>
            <Reload fill="#fff" />
            <span>Ma'lumotlarni Yangilash</span>
          </Flex>
        </Button>
        <Modal
          btn_title={
            <>
              <PlusIcon fill="#fff" />{" "}
              <Text ml={"15px"}>Maxsulot qo`shish</Text>
            </>
          }
          title={"Maxsulot qo`shish"}
          body={({ close }) => (
            <Form close={close} handleUpdate={handleGetProducts} />
          )}
        />
      </div>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        mt={"20px"}
        style={{ border: "1px solid black" }}
      >
        <Table.Thead>
          <Table.Th style={{ border: "1px solid black" }}>
            <Text fw={600}>Maxsulot nomi</Text>
          </Table.Th>
          <Table.Th style={{ border: "1px solid black" }}>
            <Text fw={600}>Maxsulot narxi</Text>
          </Table.Th>
          <Table.Th style={{ border: "1px solid black" }}>
            <Text fw={600}>Maxsulot Kategoriya</Text>
          </Table.Th>
          <Table.Th style={{ border: "1px solid black" }}>
            <Text fw={600}>Maxsulot Rasmi</Text>
          </Table.Th>
          <Table.Th style={{ border: "1px solid black" }}>O`chirish</Table.Th>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          <Table.Td style={{ border: "1px solid black" }}>
            <Text fw={600}>Maxsulotlar</Text>
          </Table.Td>
          <Table.Td style={{ border: "1px solid black" }}>
            <Text fw={600}>{product.length}</Text>
          </Table.Td>
        </Table.Tfoot>
      </Table>
    </div>
  );
}
