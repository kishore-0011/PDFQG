// App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import PricingPage from './pages/PricingPage.tsx';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginSignup.tsx';
import ResourcesPage from './pages/ResourcesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/loginsignup" element={<LoginPage />} /> 
    </Routes>
  );
}
