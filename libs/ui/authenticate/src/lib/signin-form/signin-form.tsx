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

  if (loading) {
    //You can see the component implementation at the repository
    return <div>Loading</div>;
  }


  return (
    <div>
      {authData?.username
        ? <div>You are {authData.username} <Button label="Sign Out" onClick={signOut} /></div>
        : <div>
            Username: <input type='text'
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}/><br/>
            Password: <input type='password'
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}/><br/>
          <Button label="Sign In" onClick={() => signIn(username, password)} /></div>}
    </div>
  );
}

export default SigninForm;
