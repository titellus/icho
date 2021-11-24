import "./signin-form.module.scss";
import { useAuth } from "@catalogue/utils/shared";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface SigninFormProps {
}

export function SigninForm(props: SigninFormProps) {
  const { authData, loading, signIn, signOut } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function isValid() {
    return username !== "" && password !== "";
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (authData?.username) {
    navigate('/search');
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user"
                        iconPosition="left"
                        placeholder="Username or email address"
                        onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="teal"
                    disabled={!isValid()}
                    onClick={() => signIn(username, password)}
                    fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SigninForm;
