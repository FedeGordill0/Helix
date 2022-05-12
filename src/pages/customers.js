import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { useEffect, useState } from "react";
import { firebaseBuscar } from "src/utils/firebaseUtil";

export function Customers() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    let resultado = await firebaseBuscar("clientes");
    setClientes(resultado);
  }

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={clientes} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
