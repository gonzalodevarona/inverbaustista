import React, { useState } from 'react';
import { Button, Box, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Carousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const buttonStyle = {
    "&:hover": {
      backgroundColor: "none"
    }, '&:focus': {
      outline: 'none',
    }, '&:active': {
      outline: 'none',
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent:'center' }}>

      <Button sx={buttonStyle} onClick={handlePrevClick} startIcon={<ArrowBackIosIcon />} />

      <Stack spacing={5} alignItems='center'>
        <Typography variant="h1" sx={{ textAlign: 'start', mb: "1em" }}>Evento {title}</Typography>
        <Box
          component="img"
          sx={{
            maxWidth: {xs: '100%', md: '50em'},
          }}
          src={images[currentIndex]} alt={`Image ${currentIndex}`}
        />

      </Stack>
      <Button sx={buttonStyle} onClick={handleNextClick} startIcon={<ArrowForwardIosIcon />} />

    </Box>
  );
};

export default Carousel;
