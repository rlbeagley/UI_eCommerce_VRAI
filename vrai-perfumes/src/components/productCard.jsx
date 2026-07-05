import { useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
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

        <Card.Text className="fw-bold">${selectedVariant.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}