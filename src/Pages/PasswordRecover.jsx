import {Form, FormGroup} from "react-bootstrap";

export const renderMessage = (messageValue) => {
  if (messageValue && messageValue.message !== "") {
    return messageValue.isSuccess ?
      (
        <div className="box box-success">
          <span>
            {messageValue.message}
          </span>
        </div>
      ) : (
        <div className="box box-fail">
          <span>
            {messageValue.message}
          </span>
        </div>
      )
  }
  return <></>
}

export const PasswordRecover = ({handleChange, messageValue, currentValue}) => {
  const handleChangeInput = (e) => {
    handleChange({...currentValue, [e.target.name]: e.target.value})
  }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name={"email"} onChange={handleChangeInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name={"newPassword"} onChange={handleChangeInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Password Retype</Form.Label>
        <Form.Control type="password" placeholder="Password" name={"passwordRepeat"} onChange={handleChangeInput}/>
      </Form.Group>

      <FormGroup>
        {renderMessage(messageValue)}
      </FormGroup>
    </Form>
  );
};