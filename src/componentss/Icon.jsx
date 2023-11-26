import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'

const Icon = ({icons}) => {
    const [hoveredIcon, setHoveredIcon] = useState(null)

    return (
        <Box>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                {icons.map((icon) => (
                    <Grid item xs={2} key={icon.key} onMouseEnter={() => setHoveredIcon(icon.key)}
                    onMouseLeave={() => setHoveredIcon(null)} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                        padding: "10px",
                        margin: "0 5px",
                        cursor: "pointer",
                        backgroundColor: hoveredIcon === icon.key ? '#4394e0' : 'transparent',
                        transition: 'background-color 0.3s ease'
                    }}>
                        <img src={icon.img} alt={icon.name} style={{width: "100%"}}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Icon