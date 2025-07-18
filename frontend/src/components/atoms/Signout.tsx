import { Button } from '@mui/material'
import React from 'react'
import Cookies from "js-cookie";

const Signout = () => {
    const handleSignout = () => {
        // Logic for signing out the user
        console.log("User signed out");
        Cookies.remove("token");
        window.location.reload();
    };
  return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ maxWidth: 200, marginLeft: "auto", marginRight: "auto" }}
        onClick={handleSignout}
      >
        Salir
      </Button>
  )
}

export default Signout
