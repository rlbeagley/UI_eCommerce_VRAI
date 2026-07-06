import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CustomNavBar from '../components/navbar';

export default function Survey() {
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState({
    satisfaction: '',
    recommend: '',
    scentIdeas: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <CustomNavBar />
        <Container className="survey-container text-center py-5">
          <h2 className="survey-heading mb-3">Merci.</h2>
          <p className="text-muted">
            Your thoughts help shape every bottle we make next.
          </p>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavBar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <h2 className="mb-2">How did we do?</h2>
            <p className="text-muted mb-5">
              A minute of your time helps us bottle something even better next time.
            </p>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="survey-question mb-4">
                <Form.Label>How was your experience with VRAI?</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {['Delightful', 'Good', 'Okay', 'Not great'].map(option => (
                    <Button
                      key={option}
                      type="button"
                      className={`survey-pill ${responses.satisfaction === option ? 'survey-pill-active' : ''}`}
                      onClick={() => setResponses({ ...responses, satisfaction: option })}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              {/* Recommend */}
              <Form.Group className="survey-question mb-4">
                <Form.Label>Would you recommend VRAI to a friend?</Form.Label>
                <div className="d-flex gap-2">
                  {['Yes', 'Maybe', 'No'].map(option => (
                    <Button
                      key={option}
                      type="button"
                      className={`survey-pill ${responses.recommend === option ? 'survey-pill-active' : ''}`}
                      onClick={() => setResponses({ ...responses, recommend: option })}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              {/* Scent ideas */}
              <Form.Group className="survey-question mb-5">
                <Form.Label>Any scents you'd love to see us make?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Optional"
                  value={responses.scentIdeas}
                  onChange={(e) => setResponses({ ...responses, scentIdeas: e.target.value })}
                  className="survey-textarea"
                />
              </Form.Group>

              <Button type="submit" className="survey-submit w-100">
                Submit feedback
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}