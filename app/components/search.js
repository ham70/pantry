import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, AppBar, Box, Toolbar, InputBase, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase.js';

import Item from './item.js';

//mui search bar component--------------------------------------------------------------
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

    //we retrieve all items and then filter them based on names
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

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{borderRadius: 4, bgcolor: "#2a75f3"}}>
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
            <Box sx={{py:2}}>
                <Paper elevation={6} sx={{ borderRadius: 4, bgcolor: "#363535", color:"white"}}>
                    <List>
                        {filteredItems.map((item, index) => (
                            <ListItem key={index}>
                                <Item key={index} item={item} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
}
