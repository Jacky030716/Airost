import React from 'react'
import { Box, Typography } from '@mui/material'

const UserCardItem = ({title, data, bgColor}) => {
  return (
    <Box 
        display="flex" 
        flexDirection="row" 
        justifyContent="space-between" 
        sx={{padding: "8px 12px", borderRadius: "4px", width: "100%", backgroundColor: bgColor ? `${bgColor}` : ""}}
        >
        <Typography ml={1} mt="2px" width="40%">
            {title}
        </Typography>
        <Typography ml={1} mt="2px" width="5%">
            :
        </Typography>
        <Typography ml={1} mt="2px" width="55%">
            {data}
        </Typography>
    </Box>
  )
}

export default UserCardItem