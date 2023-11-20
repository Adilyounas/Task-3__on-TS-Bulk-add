import React from "react";
import "./showDatatable.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ShowDataTable = (props) => {
  const { data } = props;

  return (
    <Box>
      {data.length > 0 ? (
        <Box id="formContainer_div" component={"div"} width={"50vw"}>
          <Table width="100%">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bolder", fontSize: "20px" }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontSize: "20px" }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontSize: "20px" }}
                  align="right"
                >
                  Image
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((ele) => (
                  <TableRow key={ele.id} id="showdatatableTableRowId">
                    <TableCell
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                      align="left"
                    >
                      {ele.name}
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                      align="center"
                    >
                      {ele.price}
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                      align="right"
                    >
                      <img
                        src={ele.file}
                        alt={ele.file}
                        width={70}
                        id="tableImgId"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <h1>No Item Added Yet</h1>
      )}
    </Box>
  );
};

export default ShowDataTable;
