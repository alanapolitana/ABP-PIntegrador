import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import Filters from "./components/Filters";
import { handleExport } from "./components/Exports";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [format, setFormat] = useState("");


  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories")
      .then((res) => {
        console.log("Categorías recibidas:", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          const cats = res.data.map(cat => ({
            slug: cat.slug || (cat.name ? cat.name.toLowerCase() : ''),
            name: cat.name || (cat.slug ? cat.slug.charAt(0).toUpperCase() + cat.slug.slice(1) : '')
          }));

          setCategories([{ slug: "all", name: "Todas las categorías" }, ...cats]);
        }
      })
      .catch((err) => console.error("Error al cargar categorías:", err));

  }, []);


  // 2. Cargar productos cuando cambie page o category
  useEffect(() => {
    let url = "";
    const skip = (page - 1) * limit;

    if (category === "all") {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [page, category, limit]);

  const toggleDark = () => {
    setDark(!dark);
    containerRef.current.classList.toggle("dark-mode");
  };

  // Filtrado por búsqueda y ordenamiento local
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField];
      const valB = b[sortField];

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });


  return (
    /*   Modo Claro oscuro Set */
    <div ref={containerRef}>
      <button className="toggleMode" onClick={toggleDark}>
        Activar modo {dark ? "claro" : "oscuro"}
      </button>

      {/* Productos con filtros */}
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Productos</h1>

        {/* Seleccion de formatos de descarga */}
        <select onChange={(e) => setFormat(e.target.value)} value={format}>
          <option value="">Seleccionar formáto</option>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="excel">Excel</option>
        </select>

        {/* <button onClick={handleExport}>Exportar archivo</button> 
        al modularizar pierde acceso al estado local (format,filteredProducts),
        pasamos explicitamente como argumentos*/}
<button onClick={() => handleExport(format, filteredProducts)}>Exportar archivo</button>

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

        <br />

        <small> Página: {page}</small>
        {/* Deshabilito botón si pagina es igual a 1 */}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Página Anterior
        </button>

        {/* Deshabilito botón si el número de productos cargados es menor al límite */}
        <button
          disabled={products.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Página Siguiente
        </button>
        {/* Hook del paginador */}
        <div className="flex items-center justify-center gap-2 my-4">
          <label htmlFor="limit">Productos por página:</label>
          <input
            id="limit"
            type="number"
            min={1}
            max={100}
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Setea a pagina 1 al volver a renderizar los productos
            }}
            className="border px-2 py-1 w-20"
          />
        </div>


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
