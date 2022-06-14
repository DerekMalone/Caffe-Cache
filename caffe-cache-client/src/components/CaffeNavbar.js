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
      <Navbar className='navbar-style' expand='md' light>
        <NavbarBrand className='navbrand-style' href='/'>Caffe Cache</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Collapse className={`collapse-isOpen-${isOpen}`} isOpen={isOpen} navbar>
            <Nav className={`container-fluid`} navbar>
              <>
                <div className='nav-item-conatainer'>
                  <div className='nav-link-spacing'>
                  <li>
                    <NavItem>
                        <NavLink className={`nav-font-style-${isOpen}`} href='/Machines'>
                        Machines
                      </NavLink>
                    </NavItem>
                  </li>
                  <li>
                    <NavItem>
                      <NavLink className={`nav-font-style-${isOpen}`} href='/Coffees'>
                        Coffees
                      </NavLink>
                    </NavItem>
                  </li>
                  <li>
                    <NavItem>
                      <NavLink className={`nav-font-style-${isOpen}`} href='/Brews'>
                        Brews
                      </NavLink>
                    </NavItem>
                  </li>
                  </div>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='btn btn-warning'
                      onClick={signOutUser}
                    >
                      Logout
                    </button>
                  </li>
                </div>
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
