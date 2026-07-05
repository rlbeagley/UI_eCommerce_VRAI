import Breadcrumb from 'react-bootstrap/Breadcrumb';

const STEPS = ['Cart', 'Shipping', 'Billing', 'Confirm Order'];

export default function CheckoutBreadcrumb({ currentStep }) {
  // 1 = Cart, 2 = Shipping, 3 = Billing, 4 = Confirm Order

  return (
    <Breadcrumb className="checkout-breadcrumb">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <Breadcrumb.Item
            key={label}
            active={isActive}
            linkAs="span" //cant click
          >
            {stepNumber} {label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}