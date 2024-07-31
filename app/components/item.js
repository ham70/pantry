import React from 'react';
import { ListItem, Box, Button, Typography, IconButton, ButtonGroup } from '@mui/material';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.js';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Item = ({ item }) => {
    const deleteItem = async (id) => {
        console.log("db deletion attempt");

        try {
            await deleteDoc(doc(db, "items", id));
            console.log("document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

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
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" sx={{
                border: "solid",
                borderRadius: 4,
                px:3
            }}>
                <Typography>{item.name}</Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => updateItem(item.id, item.quantity, false)}><RemoveCircleIcon/></IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => updateItem(item.id, item.quantity, true)}><AddCircleIcon/></IconButton>
                </Box>
                <IconButton 
                    variant="outlined"
                    onClick={() => deleteItem(item.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default Item;