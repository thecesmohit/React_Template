import React, { forwardRef } from "react"
import { Button, ButtonProps } from "@mui/material"

export const MuiButton = forwardRef<HTMLButtonElement, ButtonProps>((props,ref)=>{
    return(
        <Button {...props} ref={ref}/>
    )
})