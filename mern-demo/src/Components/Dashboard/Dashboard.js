import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../Redux/Actions/Profile";
import DashboardActions from "./DashboardActions";
import Exeperience from "./Exeperience";
import Education from "./Education";
import Spinner from "../Layouts/Spinner.js";

export const Dashboard = ({
  profile: { profile, loading },
  auth: { user },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome{" "}
        {user && user.firstName + " " + user.lastName}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Exeperience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              DELETE MY ACCOUNT
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet setup profile yet , Please add some infornation
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1 ">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
