import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer(): ReactElement {
  const history = useHistory();
  const redirectAboutUs = (path: string) => {
    history.push(path);
  };
  return (
    <footer className="footer justify-end h-10 bg-primary flex items-center">
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
    </footer>
  );
}
