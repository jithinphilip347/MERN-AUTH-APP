import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useAdminLogoutMutation } from "../slices/adminApiSlice";
import { adminLogout } from "../slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [logoutCall] = useAdminLogoutMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/admin">
            <Navbar.Brand>MERN APP ADMIN</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo ? (
                <>
                  <LinkContainer to="/admin/users-list">
                    <Nav.Link>
                      <FaUser /> Users
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin/logout">
                    <Nav.Link onClick={logoutHandler}>
                      <FaSignOutAlt /> Logout
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
