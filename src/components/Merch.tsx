import { JSX, useState, useMemo } from "react";
import { useProducts } from "../contexts/ProductsContext";

export default function Merch(): JSX.Element {
  const { products, loading, error, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Ottieni tutte le categorie uniche
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filtra i prodotti in base alla ricerca e alla categoria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          Caricamento prodotti...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: 'red'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>❌</div>
          Errore: {error}
          <br />
          <button 
            onClick={refetch}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#7a2601',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Negozio Prodotti</h1>
      
      {/* Filtri */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label htmlFor="search" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Cerca per titolo:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Inserisci il nome del prodotto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
              minWidth: '250px'
            }}
          />
        </div>
        
        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Categoria:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
              minWidth: '150px'
            }}
          >
            <option value="">Tutte le categorie</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginTop: '25px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            {filteredProducts.length} prodotti trovati
          </span>
        </div>
      </div>

      {/* Lista prodotti */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '10px',
                backgroundColor: '#f5f5f5'
              }}
            />
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {product.title}
            </h3>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '14px',
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {product.description}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '10px'
            }}>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'bold',
                color: '#7a2601'
              }}>
                €{product.price.toFixed(2)}
              </span>
              <span style={{ 
                fontSize: '12px',
                color: '#888'
              }}>
                ⭐ {product.rating.rate} ({product.rating.count})
              </span>
            </div>
            <div style={{ 
              marginTop: '8px',
              fontSize: '12px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              {product.category}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          fontSize: '18px',
          color: '#666'
        }}>
          Nessun prodotto trovato con i filtri selezionati.
        </div>
      )}
    </div>
  );
}