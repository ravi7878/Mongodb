import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const Dashboard = () => {
  return <div>DashBoard</div>;
};

Dashboard.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Dashboard);
