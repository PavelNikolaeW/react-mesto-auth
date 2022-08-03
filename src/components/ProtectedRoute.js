import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({
  component: Component,
  path,
  loggedIn,
  ...props
}) {
  return (
    <Route path={path}>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}
