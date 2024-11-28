/* eslint-disable react/jsx-props-no-spreading */
import { IconButton, IconButtonProps } from "@mui/material";
import { forwardRef } from "react";

export const MuiIconButton: React.FC<IconButtonProps> = ((props: IconButtonProps) => {
  // handle classnames passed
  return <IconButton {...props}/>;
});