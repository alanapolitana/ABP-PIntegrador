function StatsPanel(props) {
  const productos = props.products;

  if (!productos || productos.length === 0) return null;

  const productoMasCaro = productos.reduce((a, b) => (a.price > b.price ? a : b));
  const productoMasBarato = productos.reduce((a, b) => (a.price < b.price ? a : b));
  const titulosLargos = productos.filter((p) => p.title.length > 20).length;
  const precioTotal = productos.reduce((suma, p) => suma + p.price, 0);
  const descuentoPromedio = (
    productos.reduce((suma, p) => suma + p.discountPercentage, 0) / productos.length
  ).toFixed(2);
  const promedioRating = (
    productos.reduce((suma, p) => suma + p.rating, 0) / productos.length
  ).toFixed(2);

  const precioPromedio = (precioTotal / productos.length).toFixed(2);

  const productosPorCategoria = productos.reduce((acc, producto) => {
    acc[producto.category] = (acc[producto.category] || 0) + 1;
    return acc;
  }, {});

  const categoriaPredominante = Object.entries(productosPorCategoria)
    .sort((a, b) => b[1] - a[1])[0];

  const top5Rating = [...productos]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const productosConStock50 = productos.filter(p => p.stock >= 50).length;
  const productosConRatingAlto = productos.filter(p => p.rating >= 4.5).length;

  const promedioPrecioPorCategoria = {};
  const promedioRatingPorCategoria = {};
  const maxMinPorCategoria = {};

  productos.forEach(p => {
    if (!promedioPrecioPorCategoria[p.category]) {
      promedioPrecioPorCategoria[p.category] = [];
      promedioRatingPorCategoria[p.category] = [];
      maxMinPorCategoria[p.category] = { max: p, min: p };
    }

    promedioPrecioPorCategoria[p.category].push(p.price);
    promedioRatingPorCategoria[p.category].push(p.rating);

    if (p.price > maxMinPorCategoria[p.category].max.price) {
      maxMinPorCategoria[p.category].max = p;
    }

    if (p.price < maxMinPorCategoria[p.category].min.price) {
      maxMinPorCategoria[p.category].min = p;
    }
  });

  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow-md border">
      <h3 className="text-2xl font-bold text-black mb-4">Estadísticas sobre {productos.length} productos</h3>
      <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
        <li><strong>Producto más caro:</strong> {productoMasCaro.title} - ${productoMasCaro.price}</li>
        <li><strong>Producto más barato:</strong> {productoMasBarato.title} - ${productoMasBarato.price}</li>
        <li><strong>Precio promedio:</strong> ${precioPromedio}</li>
        <li><strong>Productos con stock ≥ 50:</strong> {productosConStock50}</li>
        <li><strong>Productos con rating ≥ 4.5:</strong> {productosConRatingAlto}</li>
        <li><strong>Títulos con más de 20 caracteres:</strong> {titulosLargos}</li>
        <li><strong>Precio total filtrado:</strong> ${precioTotal.toFixed(2)}</li>
        <li><strong>Descuento promedio:</strong> {descuentoPromedio}%</li>
        <li><strong>Rating promedio general:</strong> {promedioRating}</li>
        <li><strong>Productos por categoría:</strong>
          <ul className="ml-6 list-disc">
            {Object.entries(productosPorCategoria).map(([cat, count]) => (
              <li key={cat}><span className="capitalize">{cat}:</span> {count}</li>
            ))}
          </ul>
        </li>
        <li><strong>Precio promedio por categoría:</strong>
          <ul className="ml-6 list-disc">
            {Object.entries(promedioPrecioPorCategoria).map(([cat, precios]) => (
              <li key={cat}><span className="capitalize">{cat}:</span> ${(precios.reduce((a, b) => a + b, 0) / precios.length).toFixed(2)}</li>
            ))}
          </ul>
        </li>
        <li><strong>Rating promedio por categoría:</strong>
          <ul className="ml-6 list-disc">
            {Object.entries(promedioRatingPorCategoria).map(([cat, ratings]) => (
              <li key={cat}><span className="capitalize">{cat}:</span> {(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)}</li>
            ))}
          </ul>
        </li>
        <li><strong>Producto más caro y más barato por categoría:</strong>
          <ul className="ml-6 list-disc">
            {Object.entries(maxMinPorCategoria).map(([cat, { max, min }]) => (
              <li key={cat}>
                <span className="capitalize">{cat}:</span> más caro: {max.title} (${max.price}), más barato: {min.title} (${min.price})
              </li>
            ))}
          </ul>
        </li>
        <li><strong>Categoría predominante:</strong> <span className="capitalize">{categoriaPredominante[0]}</span> ({categoriaPredominante[1]} productos)</li>
        <li><strong>Top 5 productos por rating:</strong>
          <ol className="ml-6 list-decimal">
            {top5Rating.map((p) => (
              <li key={p.id}>{p.title} – {p.rating}</li>
            ))}
          </ol>
        </li>
      </ul>
    </div>
  );
}

export default StatsPanel;
