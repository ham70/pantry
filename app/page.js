'use client';
import React, { useState, useEffect } from 'react';

import { Container, Typography, TextField, Grid, IconButton, Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from './firebase'

import AddItemsMenu from './components/addItemsMenu.js'
import FindItemsMenu from './components/findItemsMenu.js'

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({name: '', quantity: ''})


  //handling database actions====================================================================================
  //add items to db
  const addItem = async (e) => {
    e.preventDefault()
    console.log("db addition attempt");
    setNewItem({name: '', quantity: ''});
    
    if(newItem.name !== '' && newItem.quantity !== ''){
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
    }
  }

  //read items from db
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArr);
    })
  })


  //delete items from db
  const deleteItem = async (id) => {
    console.log("db deletion attempt");
  
    try {
      await deleteDoc(doc(db, "items", id))
      console.log("document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  //hmlt to be rendered on screen=============================================================================
  return (
    <Container 
    sx={{
      bgcolor: "grey",
      height: "100vh", 
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