import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, Tab, Tabs} from '@mui/material';

import AllItemsList from './allItemsList.js';
import SearchAppBar from './search.js';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FindItemsMenu() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All Items" {...a11yProps(0)} />
                    <Tab label="Search for Items" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <AllItemsList/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SearchAppBar/>
            </CustomTabPanel>
        </Box>
    );
}