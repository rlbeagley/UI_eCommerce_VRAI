import { useState } from 'react';
import { Table, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { useCart } from '../assets/CartContext';
import { Link } from 'react-router-dom';
import CheckoutBreadcrumb from '../components/checkoutBreadcrumb';
import CustomNavBar from '../components/navbar';
import { RiChatSmileAi3Fill } from "react-icons/ri";

const STEP = {
  CART: 1,
  SHIPPING: 2,
  BILLING: 3,
  CONFIRM: 4,
};

export default function Checkout() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(STEP.CART);

  // shipping + billing form data lives here since it needs to persist
  // across steps (e.g. shown again in the Confirm step)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const goNext = () => setCurrentStep(prev => Math.min(prev + 1, STEP.CONFIRM));
  const goBack = () => setCurrentStep(prev => Math.max(prev - 1, STEP.CART));

  return (
    <Container className="p-4">
      <CustomNavBar/>
      <CheckoutBreadcrumb currentStep={currentStep} />

      {currentStep === STEP.CART && (
        <CartStep
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          cartTotal={cartTotal}
          onNext={goNext}
        />
      )}

      {currentStep === STEP.SHIPPING && (
        <ShippingStep
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === STEP.BILLING && (
        <BillingStep
          billingInfo={billingInfo}
          setBillingInfo={setBillingInfo}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === STEP.CONFIRM && (
        <ConfirmStep
          cartItems={cartItems}
          cartTotal={cartTotal}
          shippingInfo={shippingInfo}
          billingInfo={billingInfo}
          onBack={goBack}
        />
      )}
    </Container>
  );
}

// STEP 1
function CartStep({ cartItems, removeFromCart, updateQuantity, cartTotal, onNext }) {
  if (cartItems.length === 0) {
    return <p className="text-center my-5">Your cart is empty.</p>;
  }

  return (
    <>
      <h4 className="mb-3">Your Cart</h4>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={`${item.id}-${item.variant.size}`}>
              <td>
                <img src={item.image} alt={item.name} width={50} />
              </td>
              <td>{item.name}</td>
              <td>{item.variant.size}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  style={{ width: '60px' }}
                  onChange={(e) =>
                    updateQuantity(item.id, item.variant.size, Number(e.target.value))
                  }
                />
              </td>
              <td>${(item.variant.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => removeFromCart(item.id, item.variant.size)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <h5>Total: ${cartTotal.toFixed(2)}</h5>
        </Col>
        <Col xs="auto">
          <Button variant="dark" onClick={onNext}>
            Continue to Shipping
          </Button>
        </Col>
      </Row>
    </>
  );
}

// STEP 2
function ShippingStep({ shippingInfo, setShippingInfo, onNext, onBack }) {
  const handleChange = (field) => (e) => {
    setShippingInfo({ ...shippingInfo, [field]: e.target.value });
  };

  return (
    <>
      <h4 className="mb-3">Shipping Information</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control value={shippingInfo.name} onChange={handleChange('name')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control value={shippingInfo.address} onChange={handleChange('address')} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control value={shippingInfo.city} onChange={handleChange('city')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control value={shippingInfo.postalCode} onChange={handleChange('postalCode')} />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={onBack}>Back</Button>
        <Button variant="dark" onClick={onNext}>Continue to Billing</Button>
      </div>
    </>
  );
}

// STEP 3
function BillingStep({ billingInfo, setBillingInfo, onNext, onBack }) {
  const handleChange = (field) => (e) => {
    setBillingInfo({ ...billingInfo, [field]: e.target.value });
  };

  return (
    <>
      <h4 className="mb-3">Billing Information</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control value={billingInfo.cardNumber} onChange={handleChange('cardNumber')} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Expiry</Form.Label>
              <Form.Control placeholder="MM/YY" value={billingInfo.expiry} onChange={handleChange('expiry')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control value={billingInfo.cvv} onChange={handleChange('cvv')} />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={onBack}>Back</Button>
        <Button variant="dark" onClick={onNext}>Review Order</Button>
      </div>
    </>
  );
}

// STEP 4
function ConfirmStep({ cartItems, cartTotal, shippingInfo, billingInfo, onBack }) {
    const [orderPlaced, setOrderPlaced] = useState(false);
  
    const handlePlaceOrder = () => {
        setOrderPlaced(true);

    };

    if (orderPlaced) {
            return (
            <div className="text-center py-5">
                <h3>Thank you for your order! </h3>
                <p className="text-muted">Your signature scent is now on its way!</p>
                <hr className="my-4" />
                <h5>We'd love to hear from you <RiChatSmileAi3Fill/></h5>
                <p>Got a minute? Tell us how we did. Your feedback helps us make VRAI even better.</p>
                <Button as={Link} to="/survey" variant="dark">Take the survey</Button>
            </div>
            );
        }

  return (
    <>
      <h4 className="mb-3">Confirm Your Order</h4>

      <h6>Items</h6>
      {cartItems.map(item => (
        <div key={`${item.id}-${item.variant.size}`} className="d-flex justify-content-between">
          <span>{item.name} ({item.variant.size}) x{item.quantity}</span>
          <span>${(item.variant.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <div className="d-flex justify-content-between fw-bold mb-4">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <h6>Shipping To</h6>
      <p className="text-muted">
        {shippingInfo.name}, {shippingInfo.address}, {shippingInfo.city} {shippingInfo.postalCode}
      </p>

      <h6>Payment</h6>
      <p className="text-muted">Card ending in {billingInfo.cardNumber.slice(-4)}</p>

      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={onBack}>Back</Button>
        <Button variant="dark" onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </>
  );
}