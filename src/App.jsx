import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import Filters from "./components/Filters";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=2000")
      .then((res) => {
        setProducts(res.data.products);
        const uniqueCategories = [
          "all",
          ...new Set(res.data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    containerRef.current.classList.toggle("dark-mode");
  };

  const filteredProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField];
      const valB = b[sortField];
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

  return (
    <div ref={containerRef}>
      <button className="toggleMode" onClick={toggleDark}>
        Activar modo {dark ? "claro" : "oscuro"}
      </button>

      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Productos</h1>

        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">
            No se encontraron productos
          </p>
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
    </div>
  );
}

export default App;
