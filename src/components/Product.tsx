import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProductType {
  id: number;
  title: string;
  description: string;
}

export default function Product() {
  const { id } = useParams<{ id: string }>(); // Ottieni l'ID del prodotto dai parametri dell'URL
  const [product, setProduct] = useState<ProductType | null>(null); // Stato per memorizzare i dati del prodotto
  const [error, setError] = useState<string | null>(null); // Stato per memorizzare eventuali errori
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento

  useEffect(() => {
    if (!id) return;

    // Simula il fetch dei dati del prodotto
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento del prodotto");
        }
        return res.json(); 
      })
      .then((data: ProductType) => { 
        setProduct(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        setError(err.message); // Imposta il messaggio di errore
        setLoading(false); // Termina lo stato di caricamento
      });
  }, [id]); // Esegui l'effetto ogni volta che l'ID cambia

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!product) return <p>Prodotto non trovato</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </div>
  );
}
