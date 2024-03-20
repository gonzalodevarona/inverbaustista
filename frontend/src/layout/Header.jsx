import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoWhite from '../assets/images/LogoWhite.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/'+route)
    };

    const logoSize = { xs: '12em', md: '16em' };

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mx: '10em' }}>

                    <Box sx={{ flexGrow: { xs: 1, md: 0 }, py: "1em" }}>
                        <Box
                            onClick={()=> handleRedirectClick('')}
                            component="img"
                            sx={{ maxHeight: logoSize, maxWidth: logoSize, cursor: "pointer" }}
                            alt="Logo Inverbautista"
                            src={LogoWhite}
                        />
                    </Box>



                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button onClick={()=> handleRedirectClick('raffles')} variant="contained" >
                            <Typography sx={{ fontSize: '2rem' }} variant='h2'>Compra ya tu ticket</Typography>
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header