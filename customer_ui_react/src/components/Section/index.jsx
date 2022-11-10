import React, { useEffect, useState } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  // StepperContext,
  // selectClasses,
  // stepperClasses,
  // StepperProps,
  // StepButton,
  // StepConnector,
  // stepClasses,
  // stepIconClasses,
  // StepContent,
  // StepConnector,
  Box,
  Grid,
} from "@mui/material";
import {
  Button,
  Form,
  Row,
  FormText,
  Col,
  FormLabel,
  Table,
  TableProps,
  FormControl,
  InputGroup,
  Container,
} from "react-bootstrap";
import axios from "axios";
import usePrevious from "./constants";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import firstname from "../../assets/firstname.svg";
import addressbook from "../../assets/addressbook.svg";
import { FormattedMessage, injectIntl } from "react-intl";

import { CheckCircle } from "@mui/icons-material";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { lang, useAuthStore } from "../../store";
const steps = ["personal_info", "company_info", "property_info", "order"];
const arr = ["personal", "companyinfo", "addpropdetails"];

export const steponeinputs = [
  {
    img: firstname,
    id: "fname",
    type: "text",
  },
  {
    img: firstname,
    id: "lname",
    type: "text",
  },
  {
    img: Email,
    id: "email",
    type: "text",
  },
  {
    img: Phone,
    id: "phone",
    type: "number",
  },
];

export const steptwo = [
  {
    img: firstname,
    id: "companyname",
    type: "text",
  },
  {
    img: addressbook,
    id: "companyadd",
    type: "text",
  },
  {
    img: Phone,
    id: "companyphone",
    type: "number",
  },
];
const head = [
  // "#",
  "typeofproperty",
  "country",
  "region",
  "city",
  "district",
  "landsize",
  "buildingsize",
];
function Section({
  intl: { formatMessage },
  countries,
  regions,
  districts,
  cities,
  conditions,
  purposes,
}) {
  const [{ dir, openLoginmodal }, dispatch] = useAuthStore();
  const [validated, setValidated] = useState(false);
  const [activeStep, setActiveStep] = useState(3);
  const [err, seterr] = useState(-1);
  const prevStep = usePrevious(activeStep);

  const [compmanyDetails, setCompanyDetails] = useState([]);

  const [FirstStepInput, setFirstStepInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });
  const [SecondStepInput, setSecondStepInput] = useState({
    companyadd: "",
    companyname: "",
    companyphone: "",
  });

  const [ThirdStepInputs, setThirdStepInputs] = useState({
    typeofproperty: "",
    totalProperty: "",
    totalEvaluatorNeed: "",
    country: "",
    region: "",
    city: "",
    district: "",
    landSize: "",
  });

  const handleChangefirst = (e) => {
    setFirstStepInputs((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
    !!err && seterr(null);
  };

  const handleChangesecond = (e) => {
    setSecondStepInput((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
    !!err && seterr(null);
  };

  const handleChangethird = (e) => {
    setThirdStepInputs((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
    !!err && seterr(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let i = Object.values(
      activeStep == 1 ? FirstStepInput : ThirdStepInputs
    ).findIndex((v) => !v.trim().length);
    if (activeStep !== 2) {
      if (i > -1) {
        return seterr(
          Object.keys(activeStep == 1 ? FirstStepInput : ThirdStepInputs)[i]
        );
      }
    }
    setActiveStep((p) => p + 1);
    // setActiveStep((p) => p + 1);
    // // activeStep == 3 &&
    // setCompanyDetails((p) => [...p, ThirdStepInputs]);
  };

  console.log("ererer", err, ThirdStepInputs);

  return (
    <div
      // dir={dir}
      style={{}}
      className="b-none"
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((v, i) => (
            <Step key={v}>
              <StepLabel
                StepIconComponent={() => (
                  <div
                    style={{
                      border: `2px solid ${
                        i + 1 <= activeStep ? "blue" : "gray"
                      }`,
                    }}
                    className="d-flex step__icon"
                  >
                    {i + 1 <= activeStep ? (
                      <CheckCircle
                        fontSize="medium"
                        className="w-100 h-100 clr-primary"
                        color="blue"
                      />
                    ) : (
                      <span className="step__num br-100">{i + 1}</span>
                    )}
                  </div>
                )}
              >
                <p
                  className={`fw-600 ${
                    i + 1 <= activeStep ? "clr-primary" : "lbl"
                  }`}
                >
                  <FormattedMessage id={v} />
                </p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* // add your company personal info step 1 */}
        <div className="d-flex flex-column align-items-center">
          {activeStep < 4 && (
            <>
              <h1>
                <FormattedMessage id={arr[activeStep - 1]} />
              </h1>
              <p className="mb-5">
                <FormattedMessage id="personalquote" />
              </p>
            </>
          )}
          <Grid
            container
            spacing={1}
            rowSpacing={2}
            columnSpacing={4}
            style={{ maxWidth: "80%" }}
          >
            <Form
              // dir={dir}
              // noValidate
              // validated={validated}
              onSubmit={handleSubmit}
            >
              {activeStep == 1 && (
                <Row className="mb-3 text-gray">
                  {steponeinputs.map((v) => (
                    <Form.Group
                      as={Col}
                      key={v.id}
                      md="6"
                      sm="6"
                      controlId={v.id}
                      lg="6"
                      xs="12"
                      // dir={dir}
                      // lang={lang}
                      xl="6"
                      xxl="6"
                      id={v.id}
                      className="mt-4"
                    >
                      <Form.Label className="lbl fs-5">
                        <FormattedMessage id={v.id} />
                      </Form.Label>
                      <InputGroup size="lg" hasValidation className="h-60px">
                        <InputGroup.Text
                          className="auth__input"
                          id="inputGroupPrepend"
                        >
                          <img src={v.img} alt="" className="" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name={v.id}
                          id={v.id}
                          size="lg"
                          onChange={handleChangefirst}
                          value={FirstStepInput[v.id]}
                          className="auth__input bl-none rounded-3"
                          placeholder={formatMessage({
                            id: v.id,
                          })}
                          // required
                        />
                      </InputGroup>
                      {err == v.id && (
                        <p className="clr-red mt-1">
                          <FormattedMessage id="pleasechose" />
                          <FormattedMessage id={v.id} />
                        </p>
                      )}
                    </Form.Group>
                  ))}
                </Row>
              )}
              {/* // add your company detials step 2 */}
              {activeStep == 2 && (
                <Row className="mb-3">
                  {steptwo.map((v) => (
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId={v.id}
                      key={v.id}
                      sm="6"
                      lg="6"
                      xs="12"
                      className="mt-4"
                      xl="6"
                      xxl="6"
                    >
                      <Form.Label className="lbl fs-5">
                        <FormattedMessage id={v.id} />
                      </Form.Label>

                      <InputGroup size="lg" className="h-60px" hasValidation>
                        <InputGroup.Text
                          className="auth__input"
                          id="inputGroupPrepend"
                        >
                          <img src={v.img} alt="" className="" />
                        </InputGroup.Text>
                        <Form.Control
                          size="lg"
                          id={v.id}
                          name={v.id}
                          onChange={handleChangesecond}
                          value={SecondStepInput[v.id]}
                          type={v.type}
                          className="auth__input bl-none rounded-3"
                          placeholder={formatMessage({
                            id: v.id,
                          })}
                        />
                      </InputGroup>
                    </Form.Group>
                  ))}
                </Row>
              )}

              {activeStep == 3 && (
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId={"newone"}
                    md="6"
                    sm="6"
                    lg="6"
                    xs="12"
                    className="mt-4 position-relative"
                    xl="6"
                    xxl="6"
                  >
                    <Form.Label className="lbl fs-5">
                      <FormattedMessage id="typeofproperty" />
                    </Form.Label>
                    <Form.Select
                      size="lg"
                      name="typeofproperty"
                      id="typeofproperty"
                      onChange={handleChangethird}
                      value={ThirdStepInputs.typeofproperty}
                      className="h-60px bg-gray lbl rounded-3"
                    >
                      <option value="" selected disabled>
                        <FormattedMessage id="selectproperty" />{" "}
                      </option>
                      {[{ title: "land" }, { title: "building" }].map(
                        (val, i) => (
                          <option key={i} value={val.title}>
                            <FormattedMessage id={val.title} />
                          </option>
                        )
                      )}
                    </Form.Select>
                    {err == "typeofproperty" && (
                      <p className="clr-red mt-1 error">
                        <FormattedMessage id="pleasechose" />
                        <FormattedMessage id="typeofproperty" />
                      </p>
                    )}
                  </Form.Group>
                  {[
                    {
                      id: "totalprop",
                      type: "number",
                      name: "totalProperty",
                      p: "typetotalprop",
                      error: "",
                    },
                    {
                      id: "totaleva",
                      type: "number",
                      name: "totalEvaluatorNeed",
                      p: "typetotaleval",
                      error: "",
                    },
                    {
                      id: "selectcountry",
                      name: "country",
                      type: "select",
                      options: countries,
                    },
                    {
                      id: "selectregion",
                      type: "select",
                      options: regions.filter(
                        (v) => v.fk_country_id == ThirdStepInputs.country
                      ),
                      name: "region",
                    },
                    {
                      id: "selectcity",
                      type: "select",
                      name: "city",
                      options: cities.filter(
                        (v) =>
                          v.fk_country_id == ThirdStepInputs.country &&
                          v.fk_region_id == ThirdStepInputs.region
                      ),
                    },
                    {
                      id: "selectdistrict",
                      type: "select",
                      options: districts.filter(
                        (v) =>
                          v.fk_country_id == ThirdStepInputs.country &&
                          v.fk_region_id == ThirdStepInputs.region &&
                          v.fk_city_id == ThirdStepInputs.city
                      ),
                      name: "district",
                    },
                    {
                      id: "landsize",
                      type: "number",
                      name: "landSize",
                      p: "typelandsize",
                    },
                  ].map((v) => (
                    <Form.Group
                      as={Col}
                      md="6"
                      sm="6"
                      key={v.id}
                      lg="6"
                      xs="12"
                      className="mt-4 position-relative"
                      xl="6"
                      xxl="6"
                      controlId={v.id}
                    >
                      <Form.Label className="lbl fs-5">
                        <FormattedMessage id={v.id} />
                      </Form.Label>
                      {/(text|number)/.test(v.type) && (
                        <InputGroup size="lg" className="mb-3 h-60px">
                          <Form.Control
                            value={ThirdStepInputs[v.name]}
                            type={v.type}
                            name={v.name}
                            id={v.name}
                            onChange={handleChangethird}
                            className="auth__input bl-none"
                            size="lg"
                            placeholder={formatMessage({
                              id: v.p,
                            })}
                          />
                        </InputGroup>
                      )}
                      {v.type == "select" && (
                        <Form.Select
                          size="lg"
                          onChange={handleChangethird}
                          name={v.name}
                          placeholder={v.id}
                          value={ThirdStepInputs[v.name]}
                          id={v.name}
                          className="h-60px bg-gray lbl fs-5 rounded-3 mb-3"
                        >
                          <option value="" selected disabled>
                            <FormattedMessage id={v.id} />
                          </option>
                          {v.options?.map((val, i) => {
                            return (
                              <option key={i} value={val.id}>
                                {lang === "en-US" ? val?.title : val?.title_ar}
                              </option>
                            );
                          })}
                        </Form.Select>
                      )}
                      {err == v.name && (
                        <p className="clr-red mt-1 error">
                          <FormattedMessage
                            id={
                              v.type === "select"
                                ? "pleasechose"
                                : "pleaseenter"
                            }
                          />
                          <FormattedMessage id={v.id} />
                          {/* <FormattedMessage id={v.error} /> */}
                        </p>
                      )}
                    </Form.Group>
                  ))}
                </Row>
              )}
              <Grid
                container
                className="d-flex justify-content-between mt-5 position-relative"
              >
                {activeStep > 1 && (
                  <Button
                    color="#627792"
                    className="mt-2 mb-2 previous__btn bg-graybtn color-white"
                    size="lg"
                    onClick={() => setActiveStep((p) => p - 1)}
                  >
                    <FormattedMessage id="previous" />
                  </Button>
                )}
                <Button
                  className="mt-2 mb-2 submitbtn"
                  size="lg"
                  type="submit"
                  // onClick={() => {
                  //   // handleSubmit();
                  // }}
                >
                  <FormattedMessage id="signin" />
                </Button>
              </Grid>
            </Form>
          </Grid>
          {activeStep == 4 && (
            <Grid container classname="" style={{ maxWidth: "80%" }}>
              <Table
                striped
                bordered
                hover
                className="w-100"
                // style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    {head.map((v) => (
                      <th key={v}>
                        <FormattedMessage id={v} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                </tbody>
              </Table>
            </Grid>
          )}
        </div>
      </Box>
    </div>
  );
}

export default injectIntl(Section);
