import React from "react";
import { Toolbar, ToolbarProps } from "@mui/material";

export const MuiToolbar:React.FC<ToolbarProps> = (props: ToolbarProps) => (
    <Toolbar {...props}/>
)