
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage.jsx';
import ProductsPage from './ProductsPage.jsx';
import './styles.css';

function Website() {
  const [page, setPage] = useState(
    window.location.hash === '#products-page' ? 'products' : 'home'
  );

  useEffect(() => {
    const handleNavigation = () => {
      setPage(
        window.location.hash === '#products-page' ? 'products' : 'home'
      );
    };

    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  return page === 'products' ? <ProductsPage /> : <HomePage />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Website />
  </React.StrictMode>
);
