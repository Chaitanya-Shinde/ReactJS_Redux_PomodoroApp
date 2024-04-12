import {Button, styled} from '@mui/material'

const MyButton = styled(Button)(()=>({
    color: "#444444",
    backgroundColor: "#D9D9D9",
    border:"none",
    fontSize: "25px",
    textTransform: "none",
    fontWeight: 'bold',
    padding: "0rem",
    paddingRight: "20px",
    paddingLeft: "20px",
    whiteSpace: "nowrap",
    "&:hover":{
      backgroundColor: "#BABABA",
    },  
    "&:active":{
      backgroundColor: '#FF7979'
    }
    
    
  }))

  export default MyButton