import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer(): ReactElement {
  const history = useHistory();
  return (
    <div className="relative w-full flex flex-row justify-end centurio-footer bg-primary items-center z-50">
      <button
        type="button"
        onClick={() => history.push('/privacy-policy')}
        className="text-secondary px-2"
      >
        Privacy policy
      </button>
      <button
        type="button"
        onClick={() => history.push('/about-us')}
        className="text-secondary px-2"
      >
        About us
      </button>
      <a
        href="https://github.com/CenturioHackMoney21"
        className="text-secondary ml-2 mr-4 py-1"
      >
        <GitHubIcon />
      </a>
    </div>
  );
}
