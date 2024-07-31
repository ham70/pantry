import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, InputBase, List, ListItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, where, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase.js'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

export default function SearchAppBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const [items, setItems] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (searchTerm !== '') {
            const q = query(collection(db, 'items'), where('name', '==', searchTerm));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let itemsArr = [];
        
                querySnapshot.forEach((doc) => {
                    itemsArr.push({...doc.data(), id: doc.id})
                })
                    setItems(itemsArr);
                })
        }
    }, [searchTerm]);

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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        />
                    </Search>
                    </Toolbar>
                </AppBar>
            </Box>
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
        </Box>
        
    );
}