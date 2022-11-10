import React from "react";
import { FormattedMessage } from "react-intl";
import {
  AppBar,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import L from "../../assets/Logo.jpeg";
import arabicflag from "../../assets/arabiflag.png";
import USFLAG from "../../assets/United-states_flag_icon_round 1.svg";
import { useAuthStore } from "../../store";
import "./footer.scss";
import Fotoerabove from "../../assets/footerabove.svg";
import Fotoerblw from "../../assets/footerbelow.svg";

function Footer() {
  return <footer className="footer__section"></footer>;
}

export default Footer;
