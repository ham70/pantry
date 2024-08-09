import React from 'react';
import { ListItem, Box, Typography, IconButton } from '@mui/material';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.js';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Item = ({ item }) => {
    //delete item for db
    const deleteItem = async (id) => {
        console.log("db deletion attempt");

        try {
            await deleteDoc(doc(db, "items", id));
            console.log("document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    //updating item quantity in db
    const updateItem = async (id, amount, add) => {
        console.log("item update attempt");

        if(add){//if add is true then the + button was clicked and we increment quantity
            amount++;
        }
        else{
            amount = amount - 1;
            if(amount == 0){
                deleteItem(id);
                return;
            }
        }

        try {
            await updateDoc(doc(db, "items", id), {quantity: amount});
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    return (
        <ListItem>
            <Box display="grid" gridTemplateColumns="1fr auto auto auto" alignItems="center" width="100%" sx={{
                borderRadius: 4,
                px:3,
                bgcolor: "black"
            }}>
                <Typography>{item.name}</Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => updateItem(item.id, item.quantity, false)} sx={{color: "white"}}><RemoveCircleIcon/></IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => updateItem(item.id, item.quantity, true)} sx={{color: "white"}}><AddCircleIcon/></IconButton>
                </Box>
                <IconButton 
                    variant="outlined"
                    sx={{color: "#DE5556"}}
                    onClick={() => deleteItem(item.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default Item;