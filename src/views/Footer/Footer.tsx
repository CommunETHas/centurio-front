import React, { ReactElement } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer(): ReactElement {
  return (
    <footer className="footer justify-end h-10 bg-primary flex items-center">
      <a href="./privacy-policy" className="text-secondary p-2">
        Privacy policy
      </a>
      <a href="./about-us" className="text-secondary p-2">
        About us
      </a>
      <a
        href="https://github.com/CenturioHackMoney21"
        className="text-secondary ml-2 mr-4"
      >
        <GitHubIcon />
      </a>
    </footer>
  );
}
