import React, { useState } from "react";
import "./home.css";
import { v4 as uuidv4 } from "uuid";
import ShowDataTable from "./subComponent/ShowDataTable";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  //todo <----------------------  USE STATES  --------------------------------->

  const [data, setData] = useState([
    { id: 7172, name: "", price: "", file: "" },
  ]);
  const [dataForTable, setDataForTable] = useState([]);
  const [inputFormData, setInputFormData] = useState({
    id: "",
    name: "",
    price: "",
  });

  const [firstRowEmpty, setFirstRowEmpty] = useState(false);

  //todo <----------------------  INPUT TEXTFIELD DATA HANDLER --------------------------------->

  // This inputFormValueChangeHandler is receiving data from inputs and set into the data STATE

  const inputFormValueChangeHandler = (e, ele) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setData((oldData) =>
              oldData.map((item) => {
                if (item.id === ele.id) {
                  return {
                    ...item,
                    [name]: reader.result,
                  };
                }
                return item;
              })
            );
          }
        };

        reader.readAsDataURL(file);
      }
    }

    // Update data array

    setData((oldData) =>
      oldData.map((item) => {
        if (item.id === ele.id) {
          return {
            ...item,
            [name]: name === "price" ? parseFloat(value) : value,
          };
        }
        return item;
      })
    );
  };

  //todo <----------------------  DELETING SINGLE ROW  --------------------------------->

  const deleteRowHandler = (id) => {
    const updatedData = data.filter((ele) => ele.id !== id);
    setData(updatedData);
    setDataForTable(updatedData);

  };



  //todo <----------------------  PUSHING FORM DATA TO TABLE  --------------------------------->


   
  const pushDataHandler = (e) => {
    // console.log("Data Is pushing");
    e.preventDefault();
    setDataForTable(data);
  };




  //todo <----------------------  DELETING / EMPTY FIRST ROW  --------------------------------->

  if (firstRowEmpty === true) {
    setData((old) =>
    old.map((ele) => {
      return {
        ...ele,
        id:"",
        name: "",
        price: "",
        file:""
      };
    })
    );
    setDataForTable([])



    setFirstRowEmpty(false);
    // pushJUSTDATAHandler()
  }

  const deleteRowFirstElementHandler = (id) => {
    // console.log(id);
    // Reset inputFormData
    setFirstRowEmpty(true);
  };

  //todo <----------------------  ADDING ONE MORE ROW  --------------------------------->

  const addNewRowHandler = (e) => {
    // Assuming inputFormData is an object with the required fields
    setData((old) => [{ ...inputFormData, id: uuidv4() }, ...old]);

    // Reset inputFormData
    setInputFormData({
      id: "",
      name: "",
      price: "",
    });
  };



  return (
    <>
      <Box id="theOneContainer">
        <Box id="container_div" marginTop={10} component={"div"} width={"50vw"}>
          <Box
            id="nodeId"
            component={"h2"}
            textAlign={"center"}
            style={{ padding: "2vmax 0", color: "red" }}
          >
            Note: Red mean file is selected Yet ....
          </Box>
          <Box
            component={"form"}
            onSubmit={pushDataHandler}
            display={"flex"}
            alignItems={"flex-start"}
            gap={2}
            flexDirection={"column"}
          >
            {data &&
              data.map((ele, index) => (
                <Box
                  key={ele.id}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={5}
                >
                  <TextField
                    onChange={(e) => inputFormValueChangeHandler(e, ele)}
                    // id={ele.id}
                    value={ele.name}
                    name="name"
                    label={"Enter Name"}
                    type="string"
                    required
                    fullWidth
                  />
                  <TextField
                    onChange={(e) => inputFormValueChangeHandler(e, ele)}
                    // id={ele.id}
                    name="price"
                    label={"Enter Price"}
                    value={ele.price}

                    type="number"
                    required
                    fullWidth
                  />
                  <TextField
                    id={`text${ele.id}`}
                    type="file"
                    name="file"
                    required
                    fullWidth
                    inputProps={{
                      accept: "image/jpeg", // Specify the accepted file types (e.g., JPEG)
                    }}
                    style={{ display: "none" }}
                    onChange={(e) => inputFormValueChangeHandler(e, ele)}
                  />

                  {!ele.file && (
                    <label
                      htmlFor={`text${ele.id}`}
                      style={{
                        cursor: "pointer",
                        padding: "20px 0",
                        color: "red",
                      }}
                    >
                      Choose File
                    </label>
                  )}

                  {ele.file && (
                    <label
                      htmlFor={`text${ele.id}`}
                      style={{
                        cursor: "pointer",
                        padding: "20px 0",
                        color: "black",
                      }}
                    >
                      Choose File
                    </label>
                  )}
                  <Box display={"flex"}>
                    {data.length > 1 && (
                      <Button style={{ color: "black" }}>
                        <DeleteIcon
                          id="deleteBtn"
                          onClick={() => deleteRowHandler(ele.id)}
                        />
                      </Button>
                    )}

                    {/*todo <-----------------------------> */}

                    {data.length === 1 && (
                      <Button style={{ color: "black" }}>
                        <DeleteIcon
                          id="deleteBtn"
                          onClick={() => deleteRowFirstElementHandler(ele.id)}
                        />
                      </Button>
                    )}

                    {/* <-------------------------------> */}

                    {data.length - 1 === index && (
                      <Button onClick={addNewRowHandler}>
                        <AddIcon />
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
            <Button
              style={{ margin: "2vmax 0" }}
              variant="contained"
              type="submit"
              disabled={data.length > 0 ? false : true}
            >
              Push Data
            </Button>
          </Box>
        </Box>

        <ShowDataTable data={dataForTable} />
      </Box>
    </>
  );
};

export default Home;
