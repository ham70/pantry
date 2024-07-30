import React, { useState, useEffect } from 'react';
import {Box, List, ListItem, Button} from '@mui/material';

import { collection, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase.js'

export default function AllItemsList() {
    const [items, setItems] = useState([]);

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


    return (
        <Box>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                        <Button 
                        variant="outlined"
                        onClick={() => deleteItem(item.id)}>
                        X
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}