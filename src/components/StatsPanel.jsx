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

  const productosPorCategoria = productos.reduce((acc, producto) => {
    acc[producto.category] = (acc[producto.category] || 0) + 1;
    return acc;
  }, {});

  const categoriaPredominante = Object.entries(productosPorCategoria)
    .sort((a, b) => b[1] - a[1])[0]; 

  const top5Rating = [...productos]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow-md border">
      <h3 className="text-2xl font-bold text-black mb-4">Estadísticas sobre {productos.length} productos</h3>
      <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
        <li>
          <span className="font-semibold text-black">Producto más caro:</span> {productoMasCaro.title} - ${productoMasCaro.price}
        </li>
        <li>
          <span className="font-semibold text-black">Producto más barato:</span> {productoMasBarato.title} - ${productoMasBarato.price}
        </li>
        <li>
          <span className="font-semibold text-black">Títulos {">"} 20 caracteres:</span> {titulosLargos}
        </li>
        <li>
          <span className="font-semibold text-black">Precio total filtrado:</span> ${precioTotal}
        </li>
        <li>
          <span className="font-semibold text-black">Descuento promedio:</span> {descuentoPromedio}%
        </li>
       
        
        <li>
          <span className="font-semibold text-black">Productos por categoría:</span>
          <ul className="ml-6 list-disc">
            {Object.entries(productosPorCategoria).map(([categoria, cantidad]) => (
              <li key={categoria}>
                <span className="capitalize">{categoria}:</span> {cantidad}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className="font-semibold text-black">Categoría predominante:</span> 
          <span className="capitalize"> {categoriaPredominante[0]}</span> ({categoriaPredominante[1]} productos)
        </li>
        <li>
          <span className="font-semibold text-black">Top 5 por rating:</span>
          <ul className="ml-6 list-decimal">
            {top5Rating.map((p) => (
              <li key={p.id}>
                {p.title} – {p.rating} 
              </li>
            ))}
          </ul>
        </li>
         <li>
          <span className="font-semibold text-black">Rating promedio:</span> {promedioRating} 
        </li>
      </ul>
    </div>
  );
}

export default StatsPanel;
