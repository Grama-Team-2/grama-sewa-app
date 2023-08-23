import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey, orange, purple } from '@mui/material/colors';
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[900]),
  backgroundColor: orange[800],
  '&:hover': {
    backgroundColor: orange[800],
  },
  position: "relative",
  top:"-2px",
  left:"180px",
  size:"large",
  width: "150px", /* Set the width of the button */
  height: "40px"
  // top: 20px, /* Adjust the value to move the button down */
  // left: 10px,
}));
function Login() {
  const { state } = useAuthContext();
  const { signIn } = useAuthContext();
  return (
    <div className="desktop" style={{backgroundColor:"grey",width:"100%",margin: 0,padding: 0,justifyContent:"center"}}>
      <div className="overlap"style={{backgroundColor:"grey",width:"100%",alignItems: "center",padding: 0,marginRight:-100,marginLeft:-100}}>
        <div className="frame"style={{alignItems:"center"}}>
          <img
            className="logo"
            alt="Logo"
            style={{alignContent:"center"}}
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          />
          
          <div className="text-wrapper">GRAMA ASSIST</div>
          <ColorButton variant="contained" size="large" onClick={() => signIn()}>SIGN IN</ColorButton>
          
          
         
        </div>
        
        
        
      </div>
      {/* <div className="overlap-group">
        <div className="signup-button" />
        <div
          className="div"
          style={{ cursor: "pointer" }}
          onClick={() => signIn()}
        >
          SIGN IN
        </div>
      </div> */}
    </div>
  );
}

export default Login;
