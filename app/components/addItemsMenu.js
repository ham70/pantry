import React from 'react';
import PropTypes from 'prop-types';
import {Box, Tab, Tabs} from '@mui/material';

import ManualAddItemsBar from './manualAddItemsBar.js'

//mui tab component-----------------------------------------------------------
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

export default function AddItemsMenu() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Manual Add" {...a11yProps(0)} sx ={{color:"white"}}/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ManualAddItemsBar/>
            </CustomTabPanel>
        </Box>
    );
}