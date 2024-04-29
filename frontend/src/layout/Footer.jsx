import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Instagram } from "@mui/icons-material";
import { AppBar } from "@mui/material";

export default function Footer() {
    return (
        <AppBar  sx={{position: 'relative',
        bottom: 0,
        height: '10%'}}>

            <Container maxWidth="lg">
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={4}>
                        <Stack textAlign='center'>
                            <Typography variant="subtitle1" color="white" gutterBottom>
                                Contactanos
                            </Typography>
                            <Typography variant="p" color="white">
                                +57 3022612491
                            </Typography>
                            <Typography variant="p" color="white">
                                602 3998619
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="p" color="white">
                            ©{new Date().getFullYear() + ' '}
                            <Link color="inherit" href="https://shop.inverbautista.com.co/">
                                INVERBAUSTISTA
                            </Link>{" "} Cali, Valle del Cauca, Colombia
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack textAlign='center'>
                            <Typography variant="p" color="white" gutterBottom>
                                Siguenos en redes sociales
                            </Typography>
                            <Link textAlign='center' href="https://www.instagram.com/inverbautista" color="inherit">
                                <Instagram />
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>

            </Container>

        </AppBar>
    );
}