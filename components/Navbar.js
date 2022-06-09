import { Navbar, Container } from "react-bootstrap";

export default function TheNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">Voice-App</Navbar.Brand>
            </Container>
        </Navbar>
    );
}
