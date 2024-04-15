import {TextField} from '@mui/material'
import React from 'react'
function MyTextField(props){
    return <TextField 
        {...props}
        InputProps={{
            inputProps: { 
                min: 1,
                max: 60,
                style:{padding: 10}, 
                
            }, 
            sx:{
                fontSize:"15px",
                borderColor: "#000000", width: "70px", height:"30px", fontWeight:"300",
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000",
                borderWidth: "1px",
                },
                "&.MuiInputBase-input-MuiOutlinedInput-input":{
                    padding: "0px 0px"
                },
                "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                    borderWidth: "1px",
                },
                },
            }
        }}
    />
}

export default MyTextField;