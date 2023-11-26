import React from 'react'
import JoinCard from '../componentss/JoinCard'
import TestCard from '../componentss/TestCard'
import { datas } from '../constants/hardcode'
import { icons } from '../constants/constant'
import { Grid } from '@mui/material'

const Test = () => {
  return (
    <>
        {/* <Grid container>
            {datas.map((data) => (
                <Grid item key={data.key} container justifyContent="center" alignItems="center" style={{marginTop:'50px', width:"25%", cursor: "pointer"}}>
                  <JoinCard datas={data}/>
                </Grid>
            ))}
        </Grid> */}
        <Grid container>
            {datas.map((data) => (
                <Grid item key={data.key} container justifyContent="center" alignItems="center" style={{marginTop:'50px', width:"25%", cursor: "pointer"}}>
                  <TestCard datas={data} icons={icons}/>
                </Grid>
            ))}
        </Grid>
    </>
  )
}

export default Test