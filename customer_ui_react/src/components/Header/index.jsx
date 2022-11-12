import React from "react";
import { FormattedMessage } from "react-intl";
import {
  AppBar,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import loginicon from "../../assets/loginicon.svg";
import L from "../../assets/Logo.jpeg";
import arabicflag from "../../assets/arabiflag.png";
import USFLAG from "../../assets/United-states_flag_icon_round 1.svg";
import "./Header.scss";
// import { FaLanguage } from "react-icons/fa";
import { useAuthStore } from "../../store";

const Navbar = ({ modalHandler }) => {
  const [{ dir, lang }, dispatch] = useAuthStore();

  const handleChange = (e) => {
    dispatch({ type: "LANG", payload: e.target.value });
  };

  return (
    <>
      <AppBar
      // dir={dir}
      >
        <Nav style={{ textAlign: "center" }}>
          <img src={L} alt="" />
          <Bars />
          <NavMenu>
            {[
              { id: "realestate" },
              { id: "instit" },
              { id: "machine" },
              { id: "vehcleacc" },
            ].map((v) => (
              <NavLink
                key={v.id}
                className="position-relative"
                to={`/${v.id}`}
                activeStyle
              >
                <p className="hover-underline-animation m-auto">
                  <FormattedMessage id={v.id} />
                </p>
              </NavLink>
            ))}
          </NavMenu>
          <div onClick={modalHandler}>
            <NavLink className="lbl">
              <img alt="" src={loginicon} className="mr-10" />
              <FormattedMessage id="signin" />
            </NavLink>
          </div>
          <FormControl
            className="slect"
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select
              disableUnderline
              disableInjectingGlobalStyles
              className="language__select"
              startAdornment={
                <img
                  className=""
                  src={lang === "en-US" ? USFLAG : arabicflag}
                  style={{ marginRight: "10px", width: "30px", height: "30px" }}
                />
              }
              value={lang}
              onChange={handleChange}
            >
              <MenuItem value="en-US">English</MenuItem>
              <MenuItem value="ar-AR">Arabic</MenuItem>
            </Select>
          </FormControl>
        </Nav>
      </AppBar>
    </>
  );
};

export default Navbar;
