import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../Redux/Actions/Profile";
import ProfileTop from "./ProfileTop";
import profileAbout from "./ProfileAbout";
import Spinner from "../Layouts/Spinner";
import ProfileAbout from "./ProfileAbout";
import PrifileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-primary">
            {" "}
            Go Back To Profile
          </Link>
          {auth.isAuthenticated === true &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <PrifileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>User Has No Experience</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>

              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>User Has No Education</h4>
              )}
            </div>
            {profile.githubUsername && (
              <ProfileGithub username={profile.githubUsername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const MapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(MapStateToProps, { getProfileById })(Profile);
