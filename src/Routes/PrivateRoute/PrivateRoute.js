import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.token != null ? (
                <Component {...props} />
      ):
      <Redirect to="/"/>
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  auth: state.auth,

});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);