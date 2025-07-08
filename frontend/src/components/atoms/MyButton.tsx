import React, { FC } from 'react'
import { Button, ButtonProps } from '@mui/material'

interface MyButtonProps extends ButtonProps{
  textLabel?: string;
}

const MyButton: FC <MyButtonProps> = ({textLabel, ...props}) => {
  return (
    <>
      {textLabel}
     <Button {...props}/>
    </>
  )
}

export default MyButton
