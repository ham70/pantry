import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase.js'
import { TextField, Grid, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ManualAddItemsBar() {
    const [newItem, setNewItem] = useState({name: '', quantity: ''})

    //adding item to db
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

    return (
        <Grid container spacing={1}
        sx={{
        bgcolor: "#2a75f3",
        borderRadius: 2,
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
                sx={{bgcolor: "white", borderRadius: 2}}/>
            </Grid>
            <Grid item xs={4}>
                <TextField 
                id="standard-Controlled" 
                label="qauntity"
                variant="standard"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value})}
                sx={{bgcolor: "white", borderRadius: 2}}/>
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={addItem} sx={{bgcolor: "white"}}>
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}
