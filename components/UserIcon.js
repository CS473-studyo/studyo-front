import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Bird from 'public/bird.svg';
import Flamingo from 'public/flamingo.svg';
import Chick from 'public/chick.svg';

const UserIcon = ({ badge }) => {
  if (badge == 0) return <Chick width="18" />;
  else if (badge < 5) return <Bird width="18" />;
  else return <Flamingo width="18" />;
};

export default UserIcon;
