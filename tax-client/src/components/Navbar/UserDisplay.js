import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectToken,
} from "../../store/sessions/sessionsSelectors";
import { isTokenValid } from "../../store/utils/auth";
import SignOut from "../Auth/SignOut";
import SignIn from "../Auth/SignIn";
import { signOut } from "../../store/sessions/sessionsActions";
import Button from "../Button/Button";

function UserDisplay() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const isValidToken = token ? isTokenValid(token) : false;

  useEffect(() => {
    if (!isValidToken && user) {
      dispatch(signOut());
    }
  }, [isValidToken, user, dispatch]);

  const handleSignInOpen = () => {
    setIsSignInVisible(true);
  };

  const handleSignInClose = () => {
    setIsSignInVisible(false);
  };

  return (
    <div>
      {isValidToken && user ? (
        <>
          {user.email}
          <SignOut />
        </>
      ) : (
        <>
          <Button onClick={handleSignInOpen}>Sign In</Button>
          {isSignInVisible && (
            <SignIn
              isVisible={isSignInVisible}
              handleClose={handleSignInClose}
            />
          )}
        </>
      )}
    </div>
  );
}

export default UserDisplay;
