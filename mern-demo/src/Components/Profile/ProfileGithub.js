import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserRepos } from "../../Redux/Actions/Profile";
import Spinner from "../Layouts/Spinner";

const ProfileGithub = ({ username, getUserRepos, repos }) => {
  useEffect(() => {
    getUserRepos(username);
  }, [getUserRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">GitHub Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 m-1">
            <div>
              <h4>
                <a href={repo.html_url} target="_blanck">
                  {repo.name}
                </a>
              </h4>
              <small>{repo.full_name}</small>
              <p>{repo.description}</p>
              <p>Language :- {repo.language}</p>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShow(!show);
                }}
              >
                Show Hide
              </button>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary p-1">
                  Stars : {repo.stargazers_count}
                </li>
                <li className="badge badge-primary p-1">
                  Watchers : {repo.watchers_count}
                </li>
                <li className="badge badge-primary p-1">
                  Forks : {repo.forks}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};
const MapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(MapStateToProps, { getUserRepos })(ProfileGithub);
