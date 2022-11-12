import React, { useEffect, useState } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  Box,
  Grid,
  CircularProgress,
  Backdrop,
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
import { useSnackbar } from "notistack";

import axios from "axios";
import usePrevious, { handlePreventInput } from "./constants";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import firstname from "../../assets/firstname.svg";
import addressbook from "../../assets/addressbook.svg";
import { FormattedMessage, injectIntl } from "react-intl";

import { CheckCircle } from "@mui/icons-material";
// import FirstStep from "./FirstStep";
// import SecondStep from "./SecondStep";
import { lang, useAuthStore } from "../../store";
const steps = ["personal_info", "company_info", "property_info", "order"];
const arr = ["personal", "companyinfo", "addpropdetails"];

export const steponeinputs = [
  {
    img: firstname,
    id: "fname",
    type: "text",
    required: true,
  },
  {
    img: firstname,
    id: "lname",
    type: "text",
    required: false,
  },
  {
    img: Email,
    id: "email",
    type: "text",
    required: true,
  },
  {
    img: Phone,
    id: "phone",
    type: "number",
    required: true,
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
  quoteno,
  districts,
  cities,
  conditions,
  purposes,
}) {
  const [open, setopen] = useState(false);
  // const [severity, setseverity] = useState("");
  const [message, setmessage] = useState(false);
  const [{ dir, openLoginmodal }, dispatch] = useAuthStore();

  const [activeStep, setActiveStep] = useState(1);
  const [err, seterr] = useState(-1);
  const prevStep = usePrevious(activeStep);

  const { enqueueSnackbar } = useSnackbar();

  const [propertyDetails, setPropertyDetails] = useState([]);
  const [iscityrestricted, setisscityrestricted] = useState(0);
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

  // console.log("conditions", conditions);

  const [ThirdStepInputs, setThirdStepInputs] = useState({
    typeofproperty: "",
    totalprop: "",
    purposeid: "",
    totalevalutor: "",
    country: "",
    region: "",
    city: "",
    district: "",
    isCityRestricted: "No",
    land_size: "",
    building_size: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let i = "";
    let obj = activeStep == 1 ? FirstStepInput : ThirdStepInputs;
    for (let key in obj) {
      if (
        !["land_size", "building_size", "lname"].includes(key) &&
        !obj[key].trim().length &&
        activeStep !== 2
      ) {
        return seterr(key);
      }
    }
    setActiveStep((p) => p + 1);
    if (activeStep == 3 && prevStep !== 4) {
      handlesave(e);
    }
  };

  const handlesave = async (e) => {
    setopen(true);
    e.preventDefault();
    console.log("handlesave");
    try {
      const userobj = {
        quoteno,
        ...FirstStepInput,
      };

      const companypyload = {
        ...SecondStepInput,
        quoteno,
      };
      const {
        totalprop,
        totalevalutor,
        typeofproperty,
        region,
        country,
        city,
        district,
        land_size,
        purposeid,
        building_size,
      } = ThirdStepInputs;
      const details = {
        quoteno,
        typecd: typeofproperty,
        region,
        country,
        city,
        district,
        land_size,
        building_size,
        isrestricted: iscityrestricted,
        purposeid,
        totalprop,
        totalevalutor,
      };
      // let final = null;
      if (Object.values(FirstStepInput).some((v) => v.trim().length)) {
        await axios.post(
          `${process.env.REACT_APP_DEV_BASE}/cust/personal-info`,
          userobj,
          {}
        );
      }
      if (Object.values(SecondStepInput).some((v) => v.trim().length)) {
        await axios.post(
          `${process.env.REACT_APP_DEV_BASE}/cust/company-info`,
          companypyload,
          {}
        );
      }
      const respropdetails = await axios.post(
        `${process.env.REACT_APP_DEV_BASE}/cust/property-info`,
        details,
        {}
      );

      setPropertyDetails((p) => [...p, details]);

      setFirstStepInputs({ fname: "", lname: "", email: "", phone: "" });
      setSecondStepInput({ companyadd: "", companyname: "", companyphone: "" });
      enqueueSnackbar(respropdetails.data?.message, { variant: "success" });
    } catch (error) {
      console.log("ererere", error);
      enqueueSnackbar(
        error?.message || "Something Went Wrong, please contact with support",
        { variant: "error" }
      );
    } finally {
      setopen(false);
    }
  };

  const handleorder = async (e) => {
    e.preventDefault();
    try {
      const { data } = axios.get(
        `${process.env.REACT_APP_DEV_BASE}/cust/quote-price/${quoteno}`
      );

      console.log("dataaa280", data);
      setmessage(data?.message);
    } catch (error) {
      enqueueSnackbar(
        error?.message || "Something Went Wrong, please contact with support",
        { variant: "error" }
      );
    } finally {
      setopen(false);
    }
  };

  return (
    <>
      <Backdrop className="" style={{ zIndex: 1100 }} open={open}>
        <CircularProgress size={40} style={{ color: "white" }} />
      </Backdrop>
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
                className="w-100"
                onSubmit={(e) =>
                  activeStep == 4 ? handleorder(e) : handleSubmit(e)
                }
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
                            <FormattedMessage id="pleaseenter" />
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
                            min={v.type === "number" && 0}
                            onKeyDown={(e) =>
                              v.type === "number" &&
                              handlePreventInput(e, ["e", "-"])
                            }
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
                          <FormattedMessage id="typeerr" />
                          {/* <FormattedMessage id="typeofproperty" /> */}
                        </p>
                      )}
                    </Form.Group>
                    {[
                      {
                        id: "totalprop",
                        type: "number",
                        required: true,
                        name: "totalprop",
                        p: "typetotalprop",
                        error: "noofproperr",
                      },
                      {
                        id: "selectpurpose",
                        type: "select",
                        name: "purposeid",
                        p: "selectpurpose",
                        required: true,
                        error: "purposeerr",
                        options: purposes,
                      },
                      {
                        id: "totaleva",
                        type: "number",
                        name: "totalevalutor",
                        p: "typetotaleval",
                        required: true,
                        error: "noofevaerr",
                      },
                      {
                        id: "selectcountry",
                        name: "country",
                        type: "select",
                        required: true,
                        options: countries,
                        error: "countryerr",
                      },
                      {
                        id: "selectregion",
                        type: "select",
                        required: true,
                        options: regions.filter(
                          (v) => v.fk_country_id == ThirdStepInputs.country
                        ),
                        name: "region",
                        error: "regionerr",
                      },
                      {
                        id: "selectcity",
                        type: "select",
                        name: "city",
                        required: true,
                        options: cities.filter(
                          (v) =>
                            v.fk_country_id == ThirdStepInputs.country &&
                            v.fk_region_id == ThirdStepInputs.region
                        ),
                        error: "cityerr",
                      },
                      {
                        id: "selectdistrict",
                        type: "select",
                        required: true,
                        options: districts.filter(
                          (v) =>
                            v.fk_country_id == ThirdStepInputs.country &&
                            v.fk_region_id == ThirdStepInputs.region &&
                            v.fk_city_id == ThirdStepInputs.city
                        ),
                        name: "district",
                        error: "districterr",
                      },
                      {
                        id: "isthiscity",
                        type: "select",
                        name: "isCityRestricted",
                        p: "typelandsize",
                        required: false,
                        options: [
                          { title: "Yes", title_ar: "نعم" },
                          { title: "No", title_ar: "رقم" },
                        ],
                      },
                      {
                        id: "landsize",
                        type: "number",
                        name: "land_size",
                        p: "typelandsize",
                        required: false,
                      },
                      {
                        id: "buildingsize",
                        type: "number",
                        name: "building_size",
                        p: "typebuildingsize",
                        required: false,
                      },
                    ]
                      .filter((v) =>
                        iscityrestricted == 1 ? v : v.id !== "isthiscity"
                      )
                      .filter((v) =>
                        ThirdStepInputs.typeofproperty == "land"
                          ? v
                          : v.id !== "landsize"
                      )
                      .filter((v) =>
                        ThirdStepInputs.typeofproperty == "building"
                          ? v
                          : v.id !== "buildingsize"
                      )
                      .map((v) => (
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
                                min={v.type === "number" && 0}
                                onKeyDown={(e) =>
                                  v.type === "number" &&
                                  handlePreventInput(e, ["e", "-"])
                                }
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
                              onChange={(e) => {
                                if (
                                  ["city"].includes(
                                    e.target.name || e.target.value
                                  )
                                ) {
                                  const isres = cities.find(
                                    (v) => v.id == e.target.value
                                  );
                                  setisscityrestricted(isres.isrestricted);
                                }
                                handleChangethird(e);
                              }}
                              name={v.name}
                              placeholder={v.id}
                              value={ThirdStepInputs[v.name]}
                              id={v.name}
                              className="h-60px bg-gray lbl fs-5 rounded-3 mb-3"
                            >
                              {v.id !== "isthiscity" && (
                                <option value="" selected disabled>
                                  <FormattedMessage id={v.id} />
                                </option>
                              )}
                              {v.options?.map((val, i) => {
                                return (
                                  <option key={i} value={val.id}>
                                    {lang === "en-US"
                                      ? val?.title
                                      : val?.title_ar}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          )}
                          {err == v.name && v.required && (
                            <p className="clr-red mt-1 error">
                              <FormattedMessage id={v.error} />
                            </p>
                          )}
                        </Form.Group>
                      ))}
                  </Row>
                )}
                {activeStep == 4 && (
                  <Grid container classname="mt-5 minh-300px" style={{}}>
                    <Table
                      striped
                      bordered
                      hover
                      className="w-100 maxh-500px mt-5"
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
                        {propertyDetails.map((v, i) => {
                          const cntry = countries.find(
                            (val) => val.id == v.country
                          );
                          const region = regions.find(
                            (val) => val.id == v.region
                          );
                          const district = districts.find(
                            (val) => val.id == v.district
                          );
                          const city = cities.find((val) => val.id == v.city);
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{v.typecd}</td>
                              <td>{cntry.title}</td>
                              <td>{region.title}</td>
                              <td>{city.title}</td>
                              <td>{district.title}</td>
                              <td>{v.land_size}</td>
                              <td>{v.building_size}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Grid>
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
                  >
                    <FormattedMessage
                      id={activeStep == 4 ? "order" : "continue"}
                    />
                  </Button>
                </Grid>
                {/* {activeStep == 4 && (
                  <Grid
                    container
                    className="d-flex justify-content-center align-items-center mt-5"
                  >
                    <Button
                      className="mt-2 mb-2 submitbtn"
                      size="lg"
                      type="submit"
                    >
                      <FormattedMessage id={"order"} />
                    </Button>
                  </Grid>
                )} */}
              </Form>
            </Grid>
          </div>
        </Box>
      </div>
    </>
  );
}

export default injectIntl(Section);
