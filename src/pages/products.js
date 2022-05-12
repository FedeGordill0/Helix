import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { CustomerListResults } from "src/components/customer/customer-list-results";
import { useEffect, useState } from "react";
import { ProductListResults } from "src/components/product/product-list-results";
import { ProductListToolbar2 } from "src/components/product/product-list-toolbar-2";
import { ProductListResults2 } from "src/components/product/product-list-results";
import { firebaseBuscar } from "src/utils/firebaseUtil";

export function Products() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    buscarProductos();
  }, []);

  async function buscarProductos() {
    let resultado = await firebaseBuscar("productos");
    setProductos(resultado);
  }

  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar2 />
          <Box sx={{ mt: 3 }}>
            <ProductListResults products={productos} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
