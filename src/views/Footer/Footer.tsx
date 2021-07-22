import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer(): ReactElement {
  const history = useHistory();
  return (
    <div className="fixed bottom-0 w-full flex flex-row justify-end h-10 bg-primary items-center">
      <button
        type="button"
        onClick={() => history.push('/privacy-policy')}
        className="text-secondary p-2"
      >
        Privacy policy
      </button>
      <button
        type="button"
        onClick={() => history.push('/about-us')}
        className="text-secondary p-2"
      >
        About us
      </button>
      <a
        href="https://github.com/CenturioHackMoney21"
        className="text-secondary ml-2 mr-4"
      >
        <GitHubIcon />
      </a>
    </div>
  );
}
