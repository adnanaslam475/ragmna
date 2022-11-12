import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  AppBar,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import loginicon from "../../assets/loginicon.svg";
import L from "../../assets/Logo.jpeg";
import arabicflag from "../../assets/arabiflag.png";
import USFLAG from "../../assets/us_flag.svg";
import "./Header.scss";
// import { FaLanguage } from "react-icons/fa";
import { useAuthStore } from "../../store";

const Navbar = ({ modalHandler }) => {
  const [{ dir, lang }, dispatch] = useAuthStore();

  const handleChange = (e) => {
    dispatch({ type: "LANG", payload: e.target.value });
  };
  const [visible, setVisible] = useState(false);

  const LanguageSelect = () => (
    <FormControl
      className="slect signinnav"
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
  );

  return (
    <>
      <SwipeableDrawer
        anchor={"left"}
        open={visible}
        className="drawer"
        title="adnan"
        style={{ maxWidth: "40%" }}
        onClose={() => setVisible(false)}
      >
        <Nav className="text-center insidenav d-flex align-items-center">
          <img src={L} alt="" className="w-100px" />
          <NavMenu className="navmenu">
            {[
              { id: "realestate" },
              { id: "instit" },
              { id: "machine" },
              { id: "vehcleacc" },
            ].map((v) => (
              <NavLink
                key={v.id}
                className="position-relative navlink"
                to={`/${v.id}`}
                onClick={() => setVisible(false)}
                activeStyle
              >
                <p className="m-auto">
                  <FormattedMessage id={v.id} />
                </p>
              </NavLink>
            ))}
          </NavMenu>
          <div
            className="signinnav mt-1"
            onClick={() => {
              setVisible(false);
              modalHandler();
            }}
          >
            <NavLink className="lbl">
              <img alt="" src={loginicon} className="mr-10" />
              <FormattedMessage id="signin" />
            </NavLink>
          </div>
          <div className="mt-3">{LanguageSelect()}</div>
        </Nav>
      </SwipeableDrawer>
      <AppBar className="header">
        <Nav className="text-center insidenav">
          <img src={L} alt="" className="w-100px" />
          {!visible && <Bars onClick={() => setVisible(true)} />}
          <NavMenu className="navmenu">
            {[
              { id: "realestate" },
              { id: "instit" },
              { id: "machine" },
              { id: "vehcleacc" },
            ].map((v) => (
              <NavLink
                key={v.id}
                className="position-relative navlink"
                to={`/${v.id}`}
                // onClick={() => console.log("sssssssssssssss")}
                activeStyle
              >
                <p className="hover-underline-animation m-auto">
                  <FormattedMessage id={v.id} />
                </p>
              </NavLink>
            ))}
          </NavMenu>
          <div className="signinnav" onClick={modalHandler}>
            <NavLink className="lbl">
              <img alt="" src={loginicon} className="mr-10" />
              <FormattedMessage id="signin" />
            </NavLink>
          </div>
          {LanguageSelect()}
        </Nav>
      </AppBar>
    </>
  );
};

export default Navbar;
