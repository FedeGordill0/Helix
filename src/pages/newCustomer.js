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

const newCustomer = () => {
  const crearCliente = (cliente) => {
    firebaseCrear("clientes", cliente);
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Escribe un email válido")
        .max(255)
        .required("Escribe un email válido"),
      firstname: Yup.string().max(255).required("Escribe un nombre válido"),
      lastname: Yup.string().max(255).required("Escribe un apellido válido"),
      phone: Yup.string().max(255).required("Escribe un teléfono válido"),
    }),
    onSubmit: (cliente) => {
      crearCliente(cliente);
      router.push("/customers");
      debugger;
    },
  });

  return (
    <>
      <Head>
        <title>Registrar Cliente</title>
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
          <NextLink href="/customers" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Clientes
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Registrar Cliente
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstname && formik.errors.firstname)}
              fullWidth
              helperText={formik.touched.firstname && formik.errors.firstname}
              label="Nombre"
              margin="normal"
              name="firstname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstname}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastname && formik.errors.lastname)}
              fullWidth
              helperText={formik.touched.lastname && formik.errors.lastname}
              label="Apellido"
              margin="normal"
              name="lastname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastname}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Teléfono"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="phone"
              value={formik.values.phone}
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

export default newCustomer;
