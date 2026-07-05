
import CustomNavBar from '../components/navbar';
import { Container, Image, Row, Col } from 'react-bootstrap';
import MainImage from '../assets/images/perfume1.jpg';

export default function About() {
    return (
    <>
        <CustomNavBar/>
        <Container>
        <Row className="align-items-center g-5">
          <Col md={6}>
            <Image src={MainImage} fluid rounded className="about-img" />
          </Col>
          <Col md={6}>
            <h2 className="mb-2">About VRAI...</h2>
            <p className="text-muted fst-italic mb-4">Yours truly</p>
            <p>
              VRAI makes perfumes for you to shine brighter than you have ever before. Our scents are 
              natural, locally sourced, and simply made, while also smelling delicious. You'll have people walking by,
              remembering the sweet smell of fragrance left in your absence. We offer a broad selection of perfumes,
              and invite you to come find which works best for you. After all, its our mission to provide you with a signature
              fragrance that allows is so, perfectly you.
            </p>
            <p className="text-muted fst-italic mb-4">@ Copyright VRAI, 2026</p>
          </Col>
        </Row>
      </Container>
        </>
    
    
    );
}