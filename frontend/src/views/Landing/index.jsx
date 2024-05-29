import { Typography, Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import Constants from '../../utils/Constants';
import Carousel from 'react-material-ui-carousel';
import image0 from '../../assets/images/foto0.jpeg';
import image1 from '../../assets/images/foto1.jpeg';
import image2 from '../../assets/images/foto2.jpeg';
import image3 from '../../assets/images/foto3.jpeg';
import image4 from '../../assets/images/foto4.jpeg';
import image5 from '../../assets/images/foto5.jpeg';
import image6 from '../../assets/images/foto6.jpeg';
import image7 from '../../assets/images/foto7.jpeg';
import image8 from '../../assets/images/foto8.jpeg';
import image9 from '../../assets/images/foto9.jpeg';
import image10 from '../../assets/images/foto10.jpeg';
import image11 from '../../assets/images/foto11.jpeg';
import image12 from '../../assets/images/foto12.jpeg';
import image13 from '../../assets/images/foto13.jpeg';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/' + route)
    };

    const pictures = [
        image0,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
        image11,
        image12,
        image13
    ]
    const theme = useTheme();
    const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));


    return (
        <Box mt="12em">


            <Stack >
                <Typography sx={{ backgroundColor: Constants.secondaryMain, py: 3 }}
                    color='white'
                    variant='h1'>
                    Más de 30 años entregandole premios a los colombianos
                </Typography>
                <Carousel
                    autoPlay
                    swipe
                    navButtonsAlwaysVisible
                >
                    {pictures.map((image) => (
                        <Box
                            disabled
                            key={image}
                            component='img'
                            height={isMediumSize ? 'auto' : '70vh'}
                            width={isMediumSize ? '100%' : 'auto'}
                            src={image}
                        />
                    ))}
                </Carousel>

                <Typography textAlign='center' fontSize='1.7rem'
                    variant='subtitle1'>
                    InverBautista es una empresa caleña con un respaldo de más de 30 años de experiencia, comprometida con el desarrollo de nuestra región a través de generacion de nuevas fuentes de empleo o sustitutos de ingreso para las familias vallecaucanas y mejoramiento de la calidad de cada una de ellas.
                </Typography>

                {isMediumSize && <Button  onClick={() => handleRedirectClick('raffles')} variant="contained" >
                    <Typography sx={{ fontSize: '2rem' }} variant='h2'>Compra ya tu ticket</Typography>
                </Button>}


            </Stack>

        </Box>
    )
}

export default Landing