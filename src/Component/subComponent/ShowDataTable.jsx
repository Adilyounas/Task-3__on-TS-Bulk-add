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
     {
        data.length >0 ?( <Box textAlign="center" component={"div"} width={"50vw"}>
        <Table width="100%" >
          <TableHead >
            <TableRow >
              <TableCell >Name</TableCell>
              <TableCell  >Price</TableCell>
              <TableCell >Image</TableCell>
              {/* <TableCell>Delete</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((ele) => (
                <TableRow key={ele.id}>
                  <TableCell >{ele.name}</TableCell>
                  <TableCell>{ele.price}</TableCell>
                  <TableCell>
                    <img src={ele.file} alt={ele.file} width={70} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>): <h1>No Item Added Yet</h1>
     }
    </Box>
  );
};

export default ShowDataTable;
