import axios from "axios";
import { useEffect, useState,useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [dark, setDark] = useState(false);
const containerRef = useRef(null);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=80")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDark =() =>{
    setDark (!dark);
    containerRef.current.classList.toggle("dark-mode")
  }

  return (
    <div ref={containerRef}> 
    <button className="toggleMode" onClick={toggleDark}>Activar modo {dark ? "claro" : "oscuro"} </button>
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold  text-center">Productos</h1>

      <input
        type="text"
        placeholder="Buscar producto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3  w-full max-w-md mx-auto block rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron productos</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => setShow(!show)}
          aria-pressed={show}
          aria-label={show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        >
          {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
      </div>

      {show && <StatsPanel products={filteredProducts} />}
    </div>
  </div>);
}

export default App;
