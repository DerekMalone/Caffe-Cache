import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { signOutUser } from "../data/auth/firebaseSignInout";

export const CaffeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color='light' expand='md' light>
        <NavbarBrand href='/'>Caffe Cache</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='container-fluid' navbar>
            <>
              <NavItem>
                <NavLink href='/Machines'>Machines</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/'>Coffees</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/'>Brews</NavLink>
              </NavItem>
              <li className='nav-item'>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={signOutUser}
                >
                  Logout
                </button>
              </li>
            </>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

/*



  return (
    
  );
}
*/
