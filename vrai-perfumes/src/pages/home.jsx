import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import GourmetScent from '../assets/images/gourmetscents.jpg';
import CitrusScent from '../assets/images/citrusyscent.png';
import FloralScent from '../assets/images/floralscent.png';
import CustomNavBar from '../components/navbar';

//TODO: implement onClick that passes state with tag for shown items.
export default function Home() {
    const navigate = useNavigate();

    // send selected scent to shop page
    const handleScentClick = (scent) => {
        navigate(`/shop?scent=${encodeURIComponent(scent)}`);
    };

    return( 
    <div>
        <CustomNavBar/>
        <div className="hero text-end me-3">
            <Container>
                <h1 className="whiteText mb-0" >VRAI</h1>
                <h4 className="whiteText mt-0">Naturally, yours.</h4>
            </Container>
            
        </div>
        <div>
           <Container>
                <Row className="my-3">
                    <h2 className="text-center">Your new signature scent profile:</h2>
                </Row>
                <Row>
                    <Col>
                        <Image 
                        src={GourmetScent} 
                        fluid
                        className="w-100 scent-img" 
                        alt="Gourmet scent pallete" 
                        role="button"
                        onClick={() => handleScentClick('Gourmet')}
                        />
                    </Col>
                    <Col>
                        <Image 
                        src={CitrusScent} 
                        fluid 
                        className="w-100 scent-img" 
                        alt="Citrusy scent pallete"
                        role="button"
                        onClick={() => handleScentClick('Citrusy')}/>
                    </Col>
                    <Col>
                        <Image 
                        src={FloralScent}
                         fluid 
                         className="w-100 scent-img" 
                         alt="Floral scent pallete"
                         role="button"
                         onClick={() => handleScentClick('Floral')}/>
                    </Col>
                </Row>
           </Container>
        </div>

    </div>
    );
}