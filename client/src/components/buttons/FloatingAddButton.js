import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const FloatingAddButton = ({ onClick = () => {} }) => {
    return (
        <div className="fixed bottom-4 right-4 z-10">
            <SpeedDial
                ariaLabel="Add a folder"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={onClick}
            >
            </SpeedDial>
        </div>

    );
}

export default FloatingAddButton;
