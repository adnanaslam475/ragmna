import React, { useState } from "react";
import { steponeinputs, steptwo } from ".";
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
import { FormattedMessage, injectIntl } from "react-intl";

function SecondStep({ intl: { formatMessage } }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
  };

  return (
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
          <Form.Label className="lbl">
            <FormattedMessage id={v.id} />
          </Form.Label>

          <InputGroup size="lg" className="h-60px" hasValidation>
            <InputGroup.Text className="auth__input" id="inputGroupPrepend">
              <img src={v.img} alt="" className="" />
            </InputGroup.Text>
            <Form.Control
              size="lg"
              id={v.id}
              name={v.id}
              onChange={handleChange}
              value={inputs[v.id]}
              type={v.type}
              className="auth__input bl-none rounded-3"
              placeholder={formatMessage({
                id: v.id,
              })}
              required
            />
            <Form.Control.Feedback type="invalid">
              <FormattedMessage id="pleasechose" />
              <FormattedMessage id={v.id} />
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      ))}
    </Row>
  );
}

export default injectIntl(SecondStep);
