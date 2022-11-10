import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  Grid,
  Dialog,
  // DialogActions,
  // dialogClasses,
  // dialogActionsClasses,
  DialogContent,
  Checkbox,
  TableRow,
  TextField,
  Link,
  Modal,
} from "@mui/material";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import Password from "../../assets/password.svg";

// import { Close, Search } from "@mui/icons-material";
import { Button, Form, InputGroup } from "react-bootstrap";

import Login from "../../assets/Login.svg";
import { useAuthStore } from "../../store";
import "./AuthModal.scss";

function AuthModal({ intl: { formatMessage } }) {
  const [s, setS] = useState("login");
  const [{ dir }, dispatch] = useAuthStore();

  return (
    <Dialog
      open={true}
      dir={dir}
      maxWidth="md"
      fullWidth
      className="auth__modal m-auto"
    >
      <DialogContent className="p-0">
        <Grid container className="d-flex">
          <Grid item lg={6} md={6} xs={12} sm={6} xl={6}>
            <img className="login__svg" alt="" src={Login} />
          </Grid>
          <Grid item className="" lg={6} md={6} xs={12} sm={6} xl={6}>
            <div className="d-flex flex-row align-items-center justify-content-center">
              {["login", "signup"].map((v) => (
                <div
                  key={v}
                  onClick={() => setS(v)}
                  className="d-flex flex-row align-items-center justify-content-center text-center w-50"
                  style={{
                    backgroundColor: s == v ? "blue" : "white",
                    color: s == v && "white",
                    height: "70px",
                    cursor: "pointer",
                  }}
                >
                  <p className="m-auto">
                    <FormattedMessage id={v} />
                  </p>
                </div>
              ))}
            </div>
            {s == "login" ? (
              <div className="flex-column p-5">
                {[
                  { img: Email, id: "enteremail" },
                  { img: Password, id: "enterpass" },
                ].map((v) => (
                  <InputGroup size="lg" className="mb-3 mt-3 h-60px">
                    <InputGroup.Text className="auth__input lbl">
                      <img src={v.img} alt="" />
                    </InputGroup.Text>
                    <Form.Control
                      value=""
                      placeholder={formatMessage({
                        id: v.id,
                      })}
                      className="auth__input bl-none"
                      size="lg"
                    />
                  </InputGroup>
                ))}
                <div className="d-flex align-items-center justify-content-between mt-2 mb-2">
                  <div>
                    <Checkbox checked={false} />
                    <FormattedMessage id="rememberme" />
                  </div>
                  <Link>
                    <FormattedMessage id="forgotpass" />
                  </Link>
                </div>
                <Button
                  className="w-100 mt-2 mb-2 h-60px"
                  // style={{ height: "60px" }}
                  size="lg"
                >
                  <FormattedMessage id="signin" />
                </Button>

                <p className="text-center mt-2">
                  <FormattedMessage id="dontaccount" />
                  <Link className="ml-1" style={{ marginLeft: "5px" }}>
                    <FormattedMessage id="signuphere" />
                  </Link>
                </p>
              </div>
            ) : (
              <div className="flex-column p-5">
                {[
                  { img: Phone, id: "phone" },
                  { img: Email, id: "enteremail" },
                  { img: Password, id: "enterpass" },
                ].map((v) => (
                  <InputGroup size="lg" className="mb-3 h-60px">
                    <InputGroup.Text className="auth__input lbl">
                      <img src={v.img} alt="" />
                    </InputGroup.Text>
                    <Form.Control
                      value=""
                      className="auth__input bl-none"
                      size="lg"
                      placeholder={formatMessage({
                        id: v.id,
                      })}
                    />
                  </InputGroup>
                ))}
                <div className="d-flex align-items-center">
                  <Checkbox checked={false} />
                  <span>
                    <FormattedMessage id="accepthe" />
                    <Link className="ml-1" style={{ marginLeft: "2px" }}>
                      <FormattedMessage id="termsofthepolicy" />
                    </Link>
                  </span>
                </div>
                <div>
                  <Checkbox checked={false} />
                  <span>
                    <FormattedMessage id="rememberme" />
                  </span>
                </div>
                <Button className="w-100 mt-2" size="lg">
                  <FormattedMessage id="signin" />
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default injectIntl(AuthModal);
