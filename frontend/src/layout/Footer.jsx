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
        <AppBar sx={{
            position: 'relative',
            bottom: 0,
            height: '10%',
            mt:3
        }}>

            <Container maxWidth="lg">
                <Grid container spacing={{xs:3, md:0}}>

                    <Grid item xs={12} sm={4}>
                        <Stack>
                            <Typography textAlign='center' variant="subtitle1" color="white" gutterBottom>
                                Contactanos
                            </Typography>
                            <Typography textAlign='center' variant="p" color="white">
                                +57 3022612491
                            </Typography>
                            <Typography textAlign='center' variant="p" color="white">
                                602 3998619
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack>
                            <Typography textAlign='center' variant="p" color="white">
                                ©{new Date().getFullYear() + ' '}
                                <Link textAlign='center' color="inherit" href="https://shop.inverbautista.com.co/">
                                    INVERBAUSTISTA
                                </Link>{" "} Cali, Valle del Cauca, Colombia
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack>
                            <Typography textAlign='center' variant="p" color="white" gutterBottom>
                                Siguenos en redes sociales
                            </Typography>
                            <Link textAlign='center'  href="https://www.instagram.com/inverbautista" color="inherit">
                                <Instagram />
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>

            </Container>

        </AppBar>
    );
}