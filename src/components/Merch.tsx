import { JSX, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
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

      {/* Form per aggiungere nuovo prodotto */}
      <AddProductForm />
      
      {/* Form per caricare immagine */}
      <ImageUploadForm />
    </div>
  );
}

// Interfaccia per i dati del form
interface ProductFormData {
  title: string;
  price: number;
  image: FileList;
  categories: string[];
}

// Componente per aggiungere nuovo prodotto
function AddProductForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      title: data.title,
      price: data.price,
      image: data.image[0]?.name || "Nessun file selezionato",
      categories: data.categories
    };
    
    console.log("Dati prodotto:", productData);
    
    // Mostra messaggio di successo
    setShowSuccess(true);
    
    // Resetta il form
    reset();
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ 
      padding: "20px", 
      maxWidth: "400px", 
      margin: "40px auto", 
      backgroundColor: "white", 
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#7a2601" }}>
        Aggiungi Prodotto
      </h2>
      
      {showSuccess && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          textAlign: "center",
          border: "1px solid #c3e6cb"
        }}>
          ✅ Prodotto aggiunto con successo!
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Titolo */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Titolo *
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { 
              required: "Il titolo è obbligatorio" 
            })}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "5px",
              border: errors.title ? "2px solid #e74c3c" : "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
          {errors.title && (
            <span style={{ color: "#e74c3c", fontSize: "14px", marginTop: "5px", display: "block" }}>
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Campo Prezzo */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Prezzo *
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { 
              required: "Il prezzo è obbligatorio",
              min: { value: 0.01, message: "Il prezzo deve essere maggiore di 0" }
            })}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "5px",
              border: errors.price ? "2px solid #e74c3c" : "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
          {errors.price && (
            <span style={{ color: "#e74c3c", fontSize: "14px", marginTop: "5px", display: "block" }}>
              {errors.price.message}
            </span>
          )}
        </div>

        {/* Campo Immagine */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="image" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Immagine
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Campo Categorie */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="categories" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Categorie
          </label>
          <select
            id="categories"
            multiple
            {...register("categories")}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
              height: "80px"
            }}
          >
            <option value="t-shirt">T-shirt</option>
            <option value="mug">Mug</option>
            <option value="poster">Poster</option>
          </select>
          <small style={{ color: "#666", fontSize: "12px" }}>
            Tieni premuto Ctrl (o Cmd su Mac) per selezionare più categorie
          </small>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#7a2601",
            color: "white",
            fontWeight: 700,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#9f3304";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#7a2601";
          }}
        >
          Aggiungi Prodotto
        </button>
      </form>
    </div>
  );
}

// Componente per caricare immagini
function ImageUploadForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setSelectedImage(file);
      
      // Crea anteprima dell'immagine
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedImage) {
      const imageData = {
        fileName: selectedImage.name,
        fileSize: selectedImage.size,
        fileType: selectedImage.type,
        lastModified: new Date(selectedImage.lastModified).toLocaleString()
      };
      
      console.log("Dati immagine caricata:", imageData);
    } else {
      console.log("Nessuna immagine selezionata");
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      maxWidth: "400px", 
      margin: "40px auto", 
      backgroundColor: "white", 
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#7a2601" }}>
        Carica Immagine
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="imageUpload" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Seleziona Immagine:
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedImage}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: selectedImage ? "#7a2601" : "#ccc",
            color: "white",
            fontWeight: 700,
            border: "none",
            borderRadius: "5px",
            cursor: selectedImage ? "pointer" : "not-allowed",
            fontSize: "16px",
            transition: "background-color 0.3s ease"
          }}
        >
          {selectedImage ? "Carica Immagine" : "Seleziona un'immagine"}
        </button>
      </form>

      {/* Anteprima dell'immagine */}
      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#7a2601", marginBottom: "10px" }}>Anteprima:</h3>
          <div style={{ 
            textAlign: "center", 
            border: "2px dashed #7a2601", 
            borderRadius: "8px", 
            padding: "10px" 
          }}>
            <img
              src={imagePreview}
              alt="Anteprima immagine"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            />
            <p style={{ 
              marginTop: "10px", 
              fontSize: "14px", 
              color: "#666",
              margin: "10px 0 0 0"
            }}>
              <strong>Nome file:</strong> {selectedImage?.name}<br />
              <strong>Dimensione:</strong> {selectedImage ? (selectedImage.size / 1024).toFixed(2) : 0} KB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}