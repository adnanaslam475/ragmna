import React, { useState } from "react";
import { steponeinputs } from ".";
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

function FirstStep({ intl: { formatMessage } }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((p) => ({
      ...p,
      [e.target.name || e.target.id]: e.target.value,
    }));
  };

  return (
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
          <Form.Label
            // dir={dir}
            className="lbl"
          >
            <FormattedMessage id={v.id} />
          </Form.Label>
          <InputGroup size="lg" hasValidation className="h-60px">
            <InputGroup.Text className="auth__input" id="inputGroupPrepend">
              <img src={v.img} alt="" className="" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name={v.id}
              id={v.id}
              size="lg"
              onChange={handleChange}
              value={inputs[v.id]}
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

export default injectIntl(FirstStep);
