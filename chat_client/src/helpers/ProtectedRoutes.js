import React from 'react'
import { Route, Redirect } from 'react-router'

const ProtectedRoutes = ({ component: Component, ...rest }) =>
{
 
  return (
    <Route
      {...rest}
      render={(props) =>
      {
        const verifyStorage = localStorage.getItem("token")
        if (verifyStorage !== undefined && verifyStorage !== null)
        {
           return <Component {...rest} {...props} />
        } else
        {
          localStorage.removeItem("token")
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
        
        
      }}
    />
  )
}

export default ProtectedRoutes;
