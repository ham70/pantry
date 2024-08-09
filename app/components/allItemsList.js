import React, { useState, useEffect } from 'react';
import {Box, List, Paper} from '@mui/material';

import { collection, query, onSnapshot} from "firebase/firestore";
import {db} from '../firebase.js'

import Item from './item.js';

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

    return (
        <Box>
            <Paper elevation={6} sx={{ borderRadius: 4, bgcolor: "#363535", color:"white"}}>
                <List>
                    {items.map((item, index) => (
                        <Item key={index} item={item}/>
                    ))}
                </List>
            </Paper>
        </Box>
    )
}