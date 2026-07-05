import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card} from 'react-bootstrap';
import FacetedSearchSidebar from '../components/facetedSearch';
import ProductCard from '../components/productCard';
import CustomNavBar from '../components/navbar';
import CitrusPerfumeImg from '../assets/images/LemonOrangePerfume.jpg';
import BeachPerfume from '../assets/images/beachPerfume.jpg';
import FlowersForYou from '../assets/images/FlowersForYouPerfume.jpg';
import SpringPerfume from '../assets/images/springPerfume.jpg';
import FreshCutGrassPerfume from '../assets/images/FreshCutGrassPerfume.jpg';
import LilyPerfume from '../assets/images/lilyPerfume.jpg';
import PeachPerfume from '../assets/images/peachPerfume.jpg';
import PearPerfume from '../assets/images/pearPerfume.jpg';
import VanillaPerfume from '../assets/images/vanillaPerfume.jpg';
import WaterPerfume from '../assets/images/waterPerfume.jpg';


// product data
const PRODUCTS = [
  { id: 1, name: 'Sunset Citrus', scent: 'Citrusy', collection: 'Taste of Summer', variants: [
      { type: 'sample', size: '10ml', price: 30 },
      { type: 'fullsize', size: '100ml', price: 70 },
      { type: 'fullsize', size: '200ml', price: 120 },
    ], bestSeller: true, image: CitrusPerfumeImg},
  { id: 2, name: 'Salt Air', scent: 'Earthy', collection: "Ocean's Breeze", variants: [
      { type: 'sample', size: '10ml', price: 20 },
      { type: 'fullsize', size: '100ml', price: 65 },
      { type: 'fullsize', size: '200ml', price: 110 },
    ], bestSeller: false, image: BeachPerfume },
    { id: 3, name: 'Flowers For You', scent: 'Floral', collection: "Taste of Summer", variants: [
      { type: 'fullsize', size: '100ml', price: 80 },
      { type: 'fullsize', size: '200ml', price: 150 },
    ], bestSeller: true, image: FlowersForYou },
    { id: 4, name: 'Spring Showers', scent: 'Earthy', collection: "By The Campfire", variants: [
      { type: 'sample', size: '10ml', price: 25 },
      { type: 'fullsize', size: '100ml', price: 80 },
      { type: 'fullsize', size: '200ml', price: 150 },
    ], bestSeller: false, image: SpringPerfume },
    { id: 5, name: 'Four Leaf Clover', scent: 'Earthy', collection: "By The Campfire", variants: [
      { type: 'sample', size: '10ml', price: 20 },
      { type: 'fullsize', size: '100ml', price: 60 },
      { type: 'fullsize', size: '200ml', price: 110 },
    ], bestSeller: false, image: FreshCutGrassPerfume },
    { id: 6, name: 'Your Reflection', scent: 'Earthy', collection: "Ocean's Breeze", variants: [
      { type: 'sample', size: '10ml', price: 30 },
      { type: 'fullsize', size: '100ml', price: 80 },
      { type: 'fullsize', size: '200ml', price: 150 },
    ], bestSeller: false, image: WaterPerfume },
    { id: 7, name: 'Lavender and Lilies', scent: 'Floral', collection: "Taste of Summer", variants: [
      { type: 'fullsize', size: '100ml', price: 80 },
      { type: 'fullsize', size: '200ml', price: 150 },
    ], bestSeller: false, image: LilyPerfume },
    { id: 8, name: 'Just Peachy', scent: 'Gourmet', collection: "Taste of Summer", variants: [
      { type: 'sample', size: '10ml', price: 20 },
      { type: 'fullsize', size: '100ml', price: 80 },
      { type: 'fullsize', size: '200ml', price: 130 },
    ], bestSeller: false, image: PeachPerfume },
    { id: 9, name: 'A Pear of Lovers', scent: 'Gourmet', collection: "Taste of Summer", variants: [
      { type: 'sample', size: '10ml', price: 35 },
      { type: 'fullsize', size: '100ml', price: 100 },
      { type: 'fullsize', size: '200ml', price: 160 },
    ], bestSeller: true, image: PearPerfume },
    { id: 10, name: 'Vanilla Skies', scent: 'Gourmet', collection: "Ocean's Breeze", variants: [
      { type: 'sample', size: '10ml', price: 35 },
      { type: 'fullsize', size: '100ml', price: 100 },
    ], bestSeller: true, image: VanillaPerfume },


  
];

export default function Shop() {
  const [activeFilters, setActiveFilters] = useState(null);
  const [searchParams] = useSearchParams();
  const [initialScent, setInitialScent] = useState('');

  // pre-apply filters sent from home page clicks
  useEffect(() => {
    const scentFromUrl = searchParams.get('scent');
    if (scentFromUrl) {
      setInitialScent(scentFromUrl);
      setActiveFilters({
        scentProfile: [scentFromUrl],
        collection: [],
        bottleType: [],
        bottleSizes: [],
        maxPrice: 200,
        bestSellers: false,
      });
    }
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter(product => {
    if (!activeFilters) return true; // no filters applied yet, show everything

    const { scentProfile, collection, bottleType, bottleSizes, maxPrice, bestSellers } = activeFilters;

    if (scentProfile.length && !scentProfile.includes(product.scent)) return false;
    if (collection.length && !collection.includes(product.collection)) return false;

    if (bottleType.length && !product.variants.some(v => bottleType.includes(v.type))) return false;

    if (bottleSizes.length && !product.variants.some(v => bottleSizes.includes(v.size))) return false;

    if (!product.variants.some(v => v.price <= maxPrice)) return false;
    if (bestSellers && !product.bestSeller) return false;

    return true;
  });

  return (
    <Container>
        <CustomNavBar/>
        <Row className="g-0">
            <Col md={3}>
                <FacetedSearchSidebar onApply={setActiveFilters} initialScent={initialScent} />
            </Col>
            <Col md={9} className="p-3">
                <Row>
                    {filteredProducts.map(p => (
                        <Col key={p.id} sm={6} lg={4} className="mb-4">
                        <ProductCard product={p} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    </Container>

  );
}