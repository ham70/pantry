'use client';
import React from 'react';

import { Container, Typography, Box } from "@mui/material";

import AddItemsMenu from './components/addItemsMenu.js'
import FindItemsMenu from './components/findItemsMenu.js'

export default function Home() {

  //hmlt to be rendered on screen=============================================================================
  return (
    <Container 
    sx={{
      background: "grey",
      minHeight: "100vh", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 2
      }}>
      <Typography variant = "h2" sx={{p:3}}>
        Pantry.app
      </Typography>
      <Box 
      sx={{
        py:1
        }}>
      </Box>
      <AddItemsMenu/>
      <FindItemsMenu/>
    </Container>
  );
}