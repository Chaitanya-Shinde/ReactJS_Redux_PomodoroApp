import React  from "react";
import { Stack, Typography,Divider, Box, IconButton, Menu, MenuItem, Link } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import MyButton from "../components/MyButton";
import MyTextField from "../components/MyTextField";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";

function Homepage() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(open? null : event.currentTarget)
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
   
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%', backgroundColor:"#F2F2F2" }}>
      <Typography variant="h6" fontWeight='bold' color="#444444">{`Work Mode 🔥`}</Typography>
      <Typography variant="h1" fontWeight='bold' color="#444444">{`25:00`}</Typography>
      <LinearProgress  variant="determinate" value={50}  
        sx={{width: '300px', height:'10px', borderRadius:"5px", backgroundColor: '#D9D9D9', marginBottom:'50px',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FF7979'
          }
        }}/>
      <Stack direction='row' spacing={2} justifyItems="center" alignItems='center'>
        <Typography variant="body1" fontSize='18px' color="#444444" >{`Work length: 25 mins`}</Typography>
        <Divider orientation="vertical" variant="middle"></Divider>
        <Typography variant="body1" fontSize='18px' color="#444444">{`Break length: 5 mins`}</Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} marginTop='10px'>
        <Box width='300px' display='flex' flexDirection='row' justifyContent='space-between'>
          <MyButton className="btn" disableRipple disableElevation variant="contained" size="medium" >
            Start
          </MyButton>
          <MyButton className="btn" disableRipple disableElevation variant="contained" size="medium"  >
            Pause
          </MyButton>  
        </Box>
        <Typography variant="h6" fontWeight='bold' color="#444444" marginTop='10px'>Want to start again? <Link href='http://google.com' underline="hover" color='#FF7979'>Reset</Link></Typography>
        <IconButton aria-label="delete" size='large' id="settingsBtn" aria-controls={open ? 'settingsMenu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={  handleClick}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>
        <Menu
          elevation={0}
          id="settingsMenu"
          MenuListProps={{
            'aria-labelledby': 'settingsBtn',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableElevation
          sx={{boxShadow:"none",
            "& .MuiPaper-root": {
              backgroundColor: "#ffffff"
            }
          }}
        >
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Work length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={`25`}/>
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Break length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={`5`} />
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Number of sessions: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={`5`}/>
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Large break length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={`15`}/>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>
  </div>
    
  );
}

export default Homepage;
