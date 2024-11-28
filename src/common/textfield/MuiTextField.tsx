import React from "react"
import { TextField, TextFieldProps } from "@mui/material"

export const MuiTextField: React.FC<TextFieldProps> = (props: TextFieldProps) => (
    <TextField {...props}/>
)