import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ApprovedBadge = ({ approved }) => {
  if (approved)
    return (
      <span
        data-toggle="tooltip"
        data-delay='{"show":"800", "hide":"1000"}'
        title="This user is a approved user who has uploaded one or more notes."
      >
        <CheckCircleIcon
          className="body-text align-self-center ml-1"
          fontSize="small"
          style={{ color: '#234382' }}
        />
      </span>
    );
  else return <></>;
};

export default ApprovedBadge;
