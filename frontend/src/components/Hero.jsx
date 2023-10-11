import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const PROFILE_URL = "http://localhost:5000/images/";

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          {userInfo ? (
            <>
              {userInfo.image && (
                <img
                  src={PROFILE_URL + userInfo.image}
                  alt={userInfo.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <h1 className="text-center mb-4">
                {userInfo ? `Welcome ${userInfo.name}` : "MERN Authentication"}
              </h1>
              <p className="text-center mb-4">
                {userInfo
                  ? `Email : ${userInfo.email}`
                  : "This is a boilerplate for MERN authentication that stores a JWT inan HTTP-Only cookie. It also uses Redux Toolkit and the ReactBootstrap library"}
              </p>
            </>
          ) : (
            <>
              <p className="text-center mb-4">
                MERN authentication App with JWT authentication and
                authorization and Redux Toolkit
              </p>
              <div className="d-flex">
                <LinkContainer to="/login">
                  <Button variant="dark" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Sign Up</Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
