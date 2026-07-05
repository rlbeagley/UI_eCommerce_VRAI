import { useState } from 'react';
import { Card, Col, Row, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../assets/CartContext';

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const {addToCart} = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    setShowToast(true);
  };

  return (
    <>
    <Card className="h-100 border-0">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title as="h6">{product.name}</Card.Title>
        <Card.Subtitle className="text-muted small mb-2">
          {product.collection}
        </Card.Subtitle>

        <Form.Select
          size="sm"
          className="mb-2"
          value={selectedVariant.size}
          onChange={(e) => {
            const variant = product.variants.find(v => v.size === e.target.value);
            setSelectedVariant(variant);
          }}
        >
          {product.variants.map(v => (
            <option key={v.size} value={v.size}>
              {v.size} ({v.type === 'sample' ? 'Sample' : 'Full Size'})
            </option>
          ))}
        </Form.Select>
        <Row>
            <Card.Text className="fw-bold">${selectedVariant.price}</Card.Text>
            <Button
            variant="dark"
            size="sm"
            className="w-100"
            onClick={handleAddToCart}
            >
            Add to Cart
            </Button>
        </Row>
        
      </Card.Body>
    </Card>

    <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed', zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="dark">
          <Toast.Body className="text-white">
            {product.name} ({selectedVariant.size}) added to cart
          </Toast.Body>
        </Toast>
    </ToastContainer>
    </>
    
  );
}