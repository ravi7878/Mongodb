import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
  const { school, degree, field, from, to, description } = education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <strong>Field Of Study:- </strong>
        {field}
      </p>
      <p>
        <strong>Degree:- </strong>
        {degree}
      </p>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -
        {education.to === null ? (
          " Current"
        ) : (
          <Moment format="YYYY/MM/DD">{to}</Moment>
        )}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
