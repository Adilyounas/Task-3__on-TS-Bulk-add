import React, { useState } from "react";
import "./home.css";
import { v4 as uuidv4 } from "uuid";
import ShowDataTable from "./subComponent/ShowDataTable";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [data, setData] = useState([{ id: 7172, name: "", price: "" }]);
  const [dataForTable, setDataForTable] = useState([]);

  const [inputFormData, setInputFormData] = useState({
    id: "",
    name: "",
    price: "",
  });

  //this will set the values of inputFormData

  const inputFormValueChangeHandler = (e,ele) => {
    const name = e.target.id;
    let value = e.target.value;
    
    
    if (name==="file") {
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

  const deleteRowHandler = (id) => {
    const updatedData = data.filter((ele) => ele.id !== id);
    setData(updatedData);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // Assuming inputFormData is an object with the required fields
    setData((old) => [{ ...inputFormData, id: uuidv4() }, ...old]);

    // Reset inputFormData
    setInputFormData({
      id: "",
      name: "",
      price: "",
    });
  };

  //todo <----------------------Danger line--------------------------------->

  // todo<------------------------------------------------------------------------->

  const pushDataHandler = () => {
    console.log("Data Is pushing");
    console.log(data);
    setDataForTable(data)
  };

  return (
    <>
     <Box id="theOneContainer" >
     <Box
        component={"div"}
        width={"100%"}
        minHeight={"50vh"}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        flexDirection={"column"}
        marginTop={10}
      >
        <Box component={"div"} width={"50vw"}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Select Image</TableCell>

                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.map((ele, index) => (
                  <TableRow key={ele.id}>
                    <TableCell>
                      <TextField
                        onChange={(e) => inputFormValueChangeHandler(e, ele)}
                        id="name"
                        label={"Enter Name"}
                        type="string"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        onChange={(e) => inputFormValueChangeHandler(e, ele)}
                        id="price"
                        label={"Enter Price"}
                        type="number"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="file"
                        type="file"
                        inputProps={{
                          accept: "image/jpeg", // Specify the accepted file types (e.g., JPEG)
                        }}
                       
                        style={{ display: "none" }}
                        onChange={(e) => inputFormValueChangeHandler(e, ele)}
                        fullWidth
                      />
                      <label
                        htmlFor="file"
                        style={{ cursor: "pointer", padding: "20px 0" }}
                      >
                        Choose File
                      </label>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"}>
                        {data.length > 1 && (
                          <Button style={{ color: "black" }}>
                            <DeleteIcon
                              id="deleteBtn"
                              onClick={() => deleteRowHandler(ele.id)}
                            />
                          </Button>
                        )}

                        {data.length - 1 === index && (
                          <Button onClick={formSubmitHandler}>
                            <AddIcon />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <Button
          onClick={pushDataHandler}
          style={{ margin: "2vmax 0" }}
          variant="contained"
          disabled={data.length > 0 ? false : true}
        >
          Push Data
        </Button>
      </Box>


      <ShowDataTable data={dataForTable} />
     </Box>
    </>
  );
};

export default Home;
