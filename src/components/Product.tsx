import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProductType {
  id: number;
  title: string;
  description: string;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

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
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
