import { Container, Card, Button } from "react-bootstrap";
const HeroAdmin = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication APP</h1>
          <h2 className="text-center mb-4">Admin</h2>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default HeroAdmin;
