import { Navbar, Nav,
   Container } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice.js';
//to bring reducers from authSlice
import { logout } from '../slices/authSlice.js';

const Header = () => {
  const { userInfo } = useSelector((state)=>state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap() ;
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(`Headerjs;logoutHandler():`, err);
      alert(`headerjs;logoutHandler();err:${err}`);
    }
  };

    return (
        <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
              <button>check out border-radius</button>
              <LinkContainer to='/'>
                <Navbar.Brand >MERN Auth</Navbar.Brand>      
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nab'>
                <Nav className='ms-auto'>
                  {userInfo ? (
                    <>
                      <NavDropdown title={userInfo.name} id='username' >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={ logoutHandler }>
                            Logout
                          </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <LinkContainer to='/login' >
                        <Nav.Link >
                          <FaSignInAlt />Sign In
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/register' >
                        <Nav.Link >
                          <FaSignOutAlt />Sign Up
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    );
};

export default Header;