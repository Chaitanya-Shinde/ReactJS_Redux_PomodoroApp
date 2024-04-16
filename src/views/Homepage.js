import React  from "react";
import { connect } from 'react-redux';
import { updateSettings , startStopTimer, pauseTimer, resetTimer, tickTimer } from "../redux/Timer/timerAction.js";
import { Stack, Typography,Divider, Box, IconButton, Menu, MenuItem, Link } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import MyButton from "../components/MyButton";
import MyTextField from "../components/MyTextField";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect} from "react";

function Homepage({ settings, updateSettings, timer, isRunning, isWorkSession, startStopTimer, pauseTimer, resetTimer, tickTimer, sessionsLeft, isLargeBreak, maxTimer }) {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [phaseText, setPhaseText] = useState('')
  const handleClick = (event) => {
    setAnchorEl(open? null : event.currentTarget)
    handlePause()
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingChange = (e, settingName) => {
    let newValue = parseInt(e.target.value);
    if (newValue <= 0 || newValue>60 || isNaN(newValue)) {
      
      newValue = 1; // Set value to 1 if it's 0 or not a number
      if(settingName !== 'sessions'){
        //alert('Please enter a value from 1 - 60');
        newValue = minutesToSeconds(1);
      }else{
        //alert('Please enter a valid positive number');
        newValue = 4
      }
      updateSettings({ ...settings, [settingName]: newValue });
    }else{
      if(settingName !== 'sessions'){
        newValue = minutesToSeconds(newValue);
      }
      updateSettings({ ...settings, [settingName]: newValue });
    }
  };

  // Effect to store settings in local storage
  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  }, [settings]);

  const minutesToSeconds=(minutes)=>{
    return minutes* 60; //multiply by 60 to get seconds
  }

  const secondsToMinutes = (seconds) => {
    return Math.floor(seconds / 60); // Divide by 60 to get minutes
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [tickTimer]);

  

  const handleStartStop = () => {
    startStopTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleReset = () => {
    resetTimer();
  };

 
  
  useEffect(()=>{
    if (isWorkSession) {
      setPhaseText('Work mode 🔥');
    } else if (!isWorkSession && sessionsLeft > 0 && !isLargeBreak) {
      setPhaseText('Take a break 💤');
    } else if(isLargeBreak) {
      setPhaseText(`All sessions completed! 🥳🎉 \n Time before next run starts 👇`);
    }
  }, [isWorkSession, sessionsLeft, isLargeBreak])

  return (
   
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%', backgroundColor:"#F2F2F2" }}>
      <Typography variant="h6" fontWeight='bold' color="#444444">{phaseText}</Typography>
      <Typography variant="h1" fontWeight='bold' color="#444444">{`${secondsToMinutes(timer)}:${(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`}</Typography>
      <LinearProgress  variant="determinate" value={(timer/maxTimer)*100 }  
        sx={{ width: '300px', height:'10px', borderRadius:"5px", backgroundColor: '#D9D9D9', marginBottom:'50px', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FF7979'
          }
        }}/>
      <Stack direction='row' spacing={2} justifyItems="center" alignItems='center'>
        <Typography variant="body1" fontSize='18px' color="#444444" >{`Work length: ${secondsToMinutes(settings.workTime)} mins`}</Typography>
        <Divider orientation="vertical" variant="middle"></Divider>
        <Typography variant="body1" fontSize='18px' color="#444444">{`Break length: ${secondsToMinutes(settings.breakTime)} mins`}</Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} marginTop='10px'>
        <Box width='300px' display='flex' flexDirection='row' justifyContent='center'>
          <MyButton className="btn" disableRipple disableElevation variant="contained" size="medium" onClick={handleStartStop} >
            {isRunning? 'Stop' : 'Start'}
          </MyButton>
        </Box>
        <Typography variant="h6" fontWeight='bold' color="#444444" marginTop='10px'>Want to start again? <Link href='#' underline="hover" color='#FF7979' onClick={handleReset}>Reset</Link></Typography>
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
          sx={{boxShadow:"none",
            "& .MuiPaper-root": {
              backgroundColor: "#ffffff"
            }
          }}
        >
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Work length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={secondsToMinutes(settings.workTime)} onChange={(e) => handleSettingChange(e, 'workTime')}/>
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Break length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={secondsToMinutes(settings.breakTime)} onChange={(e) => handleSettingChange(e, 'breakTime')} />
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Number of sessions: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={settings.sessions} onChange={(e) => handleSettingChange(e, 'sessions')}/>
            </Stack>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple sx={{width:"300px",}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Typography variant="body1" fontSize='16px' color="#444444" >{'Large break length: '}</Typography>
              <MyTextField id="outlined-number" type="number" defaultValue={secondsToMinutes(settings.largeBreakTime)} onChange={(e) => handleSettingChange(e, 'largeBreakTime')}/>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>
      <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '20px' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <img src="https://avatars.githubusercontent.com/u/72722989?v=4" alt="Your Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <Typography variant="h3" fontSize='18px' fontWeight='bold' color="#444444" >Check out my <Link href='https://github.com/Chaitanya-Shinde' target="_blank" underline="hover" color='#FF7979'>Github Profile!</Link></Typography>
        </Stack>
      </div>
      
  </div>
    
  );
}

const mapStateToProps = (state) => ({
  settings: state.settings,
  timer: state.timer,
  maxTimer: state.maxTimer,
  isRunning: state.isRunning,
  isWorkSession: state.isWorkSession,
  sessions: state.settings.sessions,
  sessionsLeft: state.sessionsLeft,
  isLargeBreak: state.isLargeBreak,
});

export default connect(mapStateToProps, { updateSettings, startStopTimer, pauseTimer, resetTimer, tickTimer })(Homepage);
