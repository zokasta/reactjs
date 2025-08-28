import React from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const ThemedSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main, // your theme color
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

export default function ToggleSwitch({ checked, onChange }) {
  return <ThemedSwitch checked={checked} onChange={onChange} />;
}
