import React from "react";
import { FormattedMessage } from "react-intl";
import { FormControl, Grid } from "@mui/material";
import whatsapp from "../../assets/WhatsApp.svg";

import L from "../../assets/Logo.jpeg";
import arabicflag from "../../assets/arabiflag.png";
import USFLAG from "../../assets/United-states_flag_icon_round 1.svg";
import { useAuthStore } from "../../store";
import "./footer.scss";

import fb from "../../assets/fb.svg";
import snap from "../../assets/snap.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";
import insta from "../../assets/insta.svg";

function Footer() {
  return (
    <footer className="footer__section">
      <Grid container className="con">
        <Grid className="pt-5" item xs={12} sm={4} lg={4} xl={4} md={4}>
          <h5>
            <FormattedMessage id="services" />
          </h5>
          {["realestate", "instit", "machine", "vehcleacc"].map((v) => (
            <p className="mt-3" key={v}>
              <FormattedMessage id={v} />
            </p>
          ))}
        </Grid>
        <Grid className="pt-5" item xs={12} sm={4} lg={4} xl={4} md={4}>
          <h5>
            <FormattedMessage id="support" />
          </h5>
          {["contactus", "privacy", "termscond"].map((v) => (
            <p key={v} className="mt-3">
              <FormattedMessage id={v} />
            </p>
          ))}
          <p>
            <img src="" alt="" />
            <p>+923152982411</p>
          </p>
        </Grid>
        <Grid item xs={12} className="pt-5" sm={4} lg={4} xl={4} md={4}>
          {[
            { img: fb, link: "" },
            { img: twitter, link: "" },
            { img: insta, link: "" },
            { img: linkedin, link: "" },
            { img: snap, link: "" },
          ].map((v, i) => (
            <a
              key={i}
              className="m-1"
              href="https://tabiyat.pk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="" src={v.img} alt="" />
            </a>
          ))}
          <p className="mt-3">
            <FormattedMessage id="rights" />
          </p>
        </Grid>
      </Grid>
      <a
        href="https://wa.me/2348100000000"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsapp} alt="" className="" />
      </a>
    </footer>
  );
}

export default Footer;
