import { useState, useEffect } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';

const SCENT_PROFILES = ['Citrusy', 'Floral', 'Gourmet', 'Earthy'];
const COLLECTIONS = ["Taste of Summer", "Ocean's Breeze", "By The Campfire"];

export default function FacetedSearchSidebar({ onApply, initialScent }) {
  const [scentProfile, setScentProfile] = useState(initialScent ? [initialScent] : []);
  const [collection, setCollection] = useState([]);
  const [bottleType, setBottleType] = useState([]); // 'sample' | 'fullsize'
  const [bottleSizes, setBottleSizes] = useState([]); // '100ml' | '200ml'
  const [maxPrice, setMaxPrice] = useState(200);
  const [bestSellers, setBestSellers] = useState(false);

  const toggle = (value, list, setList) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const handleApply = () => {
    onApply({ scentProfile, collection, bottleType, bottleSizes, maxPrice, bestSellers });
  };

  const handleReset = () => {
    setScentProfile([]);
    setCollection([]);
    setBottleType([]);
    setBottleSizes([]);
    setMaxPrice(200);
    setBestSellers(false);
    onApply(null); // no filter
  };

  useEffect(() => {
    if (initialScent) {
      setScentProfile([initialScent]);
    }
  }, [initialScent]);


  return (
    <div className=" filter-sidebar p-3 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="mb-0">Filters</h3>
        <Button variant="link" size="sm" className="p-0 customBtn" onClick={handleReset}>
          Clear all
        </Button>
      </div>

      <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Scent Profile</Accordion.Header>
          <Accordion.Body>
            {SCENT_PROFILES.map(scent => (
              <Form.Check
                key={scent}
                type="checkbox"
                id={`scent-${scent}`}
                label={scent}
                checked={scentProfile.includes(scent)}
                onChange={() => toggle(scent, scentProfile, setScentProfile)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Collection</Accordion.Header>
          <Accordion.Body>
            {COLLECTIONS.map(col => (
              <Form.Check
                key={col}
                type="checkbox"
                id={`collection-${col}`}
                label={col}
                checked={collection.includes(col)}
                onChange={() => toggle(col, collection, setCollection)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Bottle Size</Accordion.Header>
          <Accordion.Body>
            <Form.Check
              type="checkbox"
              id="bottle-sample"
              label="Sample"
              checked={bottleType.includes('sample')}
              onChange={() => toggle('sample', bottleType, setBottleType)}
            />
            <Form.Check
              type="checkbox"
              id="bottle-fullsize"
              label="Full Size"
              checked={bottleType.includes('fullsize')}
              onChange={() => toggle('fullsize', bottleType, setBottleType)}
            />
            {bottleType.includes('fullsize') && (
              <div className="ms-4 mt-1">
                {['100ml', '200ml'].map(size => (
                  <Form.Check
                    key={size}
                    type="checkbox"
                    id={`size-${size}`}
                    label={size}
                    checked={bottleSizes.includes(size)}
                    onChange={() => toggle(size, bottleSizes, setBottleSizes)}
                  />
                ))}
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body>
            <Form.Range
              min={0}
              max={200}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="text-muted small">Up to ${maxPrice}</div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Best Sellers</Accordion.Header>
          <Accordion.Body>
            <Form.Check
              type="checkbox"
              id="best-sellers"
              label="Show best sellers only"
              checked={bestSellers}
              onChange={(e) => setBestSellers(e.target.checked)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button className="w-100 mt-3" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );
}

