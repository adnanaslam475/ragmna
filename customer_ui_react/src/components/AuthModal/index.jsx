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
import axios from "axios";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import Password from "../../assets/password.svg";

// import { Close, Search } from "@mui/icons-material";
import { Button, Form, InputGroup } from "react-bootstrap";

import Login from "../../assets/Login.svg";
import { useAuthStore } from "../../store";
import "./AuthModal.scss";
import { useSnackbar } from "notistack";

function AuthModal({ intl: { formatMessage }, modalHandler }) {
  const { enqueueSnackbar } = useSnackbar();
  const [s, setS] = useState("login");
  const [{ dir, user }, dispatch] = useAuthStore();
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handlechange = (e) => {
    setInputs((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
    !!err && seterr(null);
  };

  const auth = async (e) => {
    e.preventDefault();
    setloading(true);
    const obj = { ...inputs };
    if (s === "login") {
      delete obj.phone;
    }
    const { data, success } = await axios.post(
      `${process.env.REACT_APP_DEV_BASE}/users/${s}`,
      obj,
      {}
    );
    dispatch({});
    enqueueSnackbar(data?.message, { variant: success ? "success" : "error" });
    try {
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog
      open={true}
      dir={dir}
      maxWidth="md"
      onClose={modalHandler}
      fullWidth
      className="auth__modal m-auto"
    >
      <DialogContent className="p-0">
        <Grid container className="d-flex">
          <Grid item lg={5} md={5} xs={12} sm={5} xl={5}>
            <img className="login__svg" alt="" src={Login} />
          </Grid>
          <Grid item className="" lg={7} md={7} xs={12} sm={7} xl={7}>
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
            <Form className="w-100" onSubmit={auth}>
              {s == "login" ? (
                <div className="flex-column p-5">
                  {[
                    { img: Email, id: "enteremail", name: "email" },
                    { img: Password, id: "enterpass", name: "password" },
                  ].map((v) => (
                    <InputGroup size="lg" className="mb-3 mt-4 h-60px">
                      <InputGroup.Text className="auth__input lbl">
                        <img src={v.img} alt="" />
                      </InputGroup.Text>
                      <Form.Control
                        name={v.name}
                        id={v.name}
                        value={inputs[v.name]}
                        placeholder={formatMessage({
                          id: v.id,
                        })}
                        onChange={handlechange}
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
                    type="submit"
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
                    { img: Phone, id: "phone", name: "phone" },
                    { img: Email, id: "enteremail", name: "email" },
                    { img: Password, id: "enterpass", name: "password" },
                  ].map((v) => (
                    <InputGroup size="lg" className="mb-3 h-60px">
                      <InputGroup.Text className="auth__input lbl">
                        <img src={v.img} alt="" />
                      </InputGroup.Text>
                      <Form.Control
                        value={inputs[v.name]}
                        name={v.name}
                        id={v.name}
                        className="auth__input bl-none"
                        size="lg"
                        onChange={handlechange}
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
                  <Button className="w-100 mt-2 h-60px" type="submit" size="lg">
                    <FormattedMessage id="signin" />
                  </Button>
                </div>
              )}
            </Form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default injectIntl(AuthModal);
