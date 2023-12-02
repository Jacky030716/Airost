import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'

const Icon = ({icon, selectedIcon, setSelectedIcon, setSport, handleSelectionChange}) => {
    const [hoveredIcon, setHoveredIcon] = useState(null)

    return (
        <Grid item xs={2} 
            onMouseEnter={() => setHoveredIcon(icon.key)}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={(event) => {
                event.stopPropagation()
                setSelectedIcon(icon.key)
                handleSelectionChange(icon.name)
            }}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "50%",
                padding: "10px",
                margin: "0 5px",
                cursor: "pointer",
                backgroundColor: selectedIcon === icon.key ? '#4394e0' :  (hoveredIcon === icon.key ? '#4394e0' : 'transparent'),
                transition: 'background-color 0.3s ease',
            }}
        >
            <img src={icon.img} alt={icon.name} style={{width: "100%"}}/>
        </Grid>
    )
}

export default Icon