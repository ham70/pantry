'use client';
import React, { useState, useEffect } from 'react';

import { Container, Typography, TextField, Grid, IconButton, Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from './firebase'

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({name: '', quantity: ''})


  //handling database actions====================================================================================
  //add items to db
  const addItem = async (e) => {
    e.preventDefault()
    console.log("db addition attempt");

    if(newItem.name !== '' && newItem.quantity !== ''){
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({name: '', quantity: ''});
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
      bgcolor: "blue",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 2
      }}>
      <Typography variant = "h2" sx={{p:3}}>
        Pantry.app
      </Typography>
      <Grid container spacing={1}
      sx={{
        bgcolor: "green",
        display: "flex",
        alignItems: "center",
        m: 0,
        width: "100%",
        p: 1
        }}>
        <Grid item xs={6}>
          <TextField
            id="standard-Controlled" 
            label="enter item" 
            variant="standard"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value})}
            sx={{bgcolor: "red"}}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            id="standard-Controlled" 
            label="qauntity"
            variant="standard"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value})}
            sx={{bgcolor: "red"}}/>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={addItem}>
            <CheckCircleOutlineIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Box 
      sx={{
        py:1
        }}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Box>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <Button 
                  variant="outlined"
                  onClick={() => deleteItem(item.id)}>
                  X
                </Button>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}