import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {WPSite} from '../WordPress/wordpress';

export interface HeaderProps {
  site: WPSite
}

const Header = ({site}: HeaderProps) => {
  return (
    <div className="header">
      <h1 className="blog-title">{site ? site.name : ''}</h1>
    </div>
  );
};

export default Header;

