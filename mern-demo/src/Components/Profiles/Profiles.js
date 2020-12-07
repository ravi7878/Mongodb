import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spineer from "../Layouts/Spinner";
import { getProfiles } from "../../Redux/Actions/Profile";
import ProfileItem from "./ProfileItem";
const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spineer />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            {" "}
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const MapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(MapStateToProps, { getProfiles })(Profiles);
