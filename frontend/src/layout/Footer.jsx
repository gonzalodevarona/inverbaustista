import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Instagram } from "@mui/icons-material";
import { AppBar } from "@mui/material";

export default function Footer() {
    return (
        <AppBar sx={{
            position: 'relative',
            bottom: 0,
            height: '10%',
            mt: 3
        }}>

            <Container maxWidth="lg">
                <Stack>
                    <Stack spacing={0}>
                        <Box textAlign='center' sx={{ fontSize: '16px', fontWeight: 'bold' }} color="white">
                            Contactanos
                        </Box>
                        <Box textAlign='center' sx={{ fontSize: '16px' }} color="white">
                            +57 3022612491
                        </Box>
                        <Box textAlign='center' sx={{ fontSize: '16px' }} color="white">
                            602 3998619
                        </Box>
                    </Stack>

                    <Typography textAlign='center' variant="p" color="white">
                        ©{new Date().getFullYear() + ' '}
                        <Link textAlign='center' color="inherit" href="https://shop.inverbautista.com.co/">
                            INVERBAUSTISTA
                        </Link>{" "} Cali, Valle del Cauca, Colombia
                    </Typography>
                    
                    <Box my={0} textAlign='center' href="https://www.instagram.com/inverbautista" color="white">
                    Siguenos en redes sociales 
                    <Link textAlign='center' color="inherit" href="https://www.instagram.com/inverbautista">
                    Siguenos en redes sociales
                    <Instagram />
                        </Link>
                    </Box>
                </Stack>

            </Container>

        </AppBar>
    );
}