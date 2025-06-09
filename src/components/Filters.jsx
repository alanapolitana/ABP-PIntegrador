import React from "react";

function Filters({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
      <input
        type="text"
        placeholder="Buscar producto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full rounded"
      >
        {categories
          .filter(cat => cat && cat.name && cat.name.trim() !== "")
          .map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
      </select>

      <div className="flex gap-2">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border p-3 w-full rounded"
        >
          <option value="">Ordenar por...</option>
          <option value="price">Precio</option>
          <option value="rating">Rating</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-3 w-full rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
