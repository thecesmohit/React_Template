import React from "react"
import { Tooltip, TooltipProps } from "@mui/material"

export const MuiTooltip: React.FC<TooltipProps> = (props: TooltipProps) => (
    <Tooltip {...props}/>
)