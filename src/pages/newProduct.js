import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { firebaseCrear } from "src/utils/firebaseUtil";

const newProduct = () => {
  const crearProducto = (producto) => {
    firebaseCrear("productos", producto);
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Escribe un nombre válido"),
      description: Yup.string().max(255).required("Escribe una descripción válida"),
      price: Yup.string().max(255).required("Escribe un precio válido"),
    }),
    onSubmit: (producto) => {
      crearProducto(producto);
      router.push("/products");
    },
  });

  return (
    <>
      <Head>
        <title>Registrar Producto</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/products" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Productos
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Registrar Producto
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2"></Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nombre"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Descripción"
              margin="normal"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Precio"
              margin="normal"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.price}
              variant="outlined"
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default newProduct;
