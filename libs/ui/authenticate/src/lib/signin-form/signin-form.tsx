import "./signin-form.module.scss";
import { useAuth } from "@catalogue/utils/shared";
import { Button } from "semantic-ui-react";
import { useState } from "react";

/* eslint-disable-next-line */
export interface SigninFormProps {
}

export function SigninForm(props: SigninFormProps) {
  const { authData, loading, signIn, signOut } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function isValid() {
    return username !== '' && password !== '';
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div id='signin'>
      {authData?.username
        ? <div>You are {authData.username}<br/>
          <Button label="Sign Out" onClick={signOut} /></div>
        : <div>
            Username: <input type='text'
                             id='username'
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}/><br/>
            Password: <input type='password'
                             id='password'
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}/><br/>
          <Button disabled={!isValid()}
                  onClick={() => signIn(username, password)}>Sign In</Button></div>}
    </div>
  );
};

export default SigninForm;
