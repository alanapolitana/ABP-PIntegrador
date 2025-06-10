import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Gráfico de barras: cantidad de productos por categoría
export function BarByCategory({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Gráfico de líneas: evolución de precios (simulada, por ejemplo usando los primeros 10 productos)
export function PriceLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="precio" stroke="#10b981" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Pie chart: proporción de productos según stock
const PIE_COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];
export function StockPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="cantidad"
          nameKey="rango"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Componente agrupador para mostrar los tres gráficos juntos
export default function StatsCharts({ products }) {
  // Preparación de datos para cada gráfico

  // 1. Barras: productos por categoría
  const barData = Object.entries(
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({ category, count }));

  // 2. Línea: evolución de precios (simulada)
  const lineData = products.slice(0, 10).map((p, i) => ({
    fecha: `Día ${i + 1}`,
    precio: p.price,
  }));

  // 3. Pie: stock
  const stockRanges = [
    { rango: "Alto (≥50)", min: 50, max: Infinity },
    { rango: "Medio (30-49)", min: 30, max: 49},
    { rango: "Bajo (1-29)", min: 1, max: 29 },
    { rango: "Sin stock", min: 0, max: 0 },
  ];
  const pieData = stockRanges.map(r => ({
    rango: r.rango,
    cantidad: products.filter(p => p.stock >= r.min && p.stock <= r.max).length,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      <div>
        <h2 className="font-bold mb-2">Cantidad de productos por categoría</h2>
        <BarByCategory data={barData} />
      </div>
      <div>
        <h2 className="font-bold mb-2">Evolución de precios (simulada)</h2>
        <PriceLineChart data={lineData} />
      </div>
      <div className="col-span-2">
        <h2 className="font-bold mb-2">Proporción de productos según stock</h2>
        <StockPieChart data={pieData} />
      </div>
    </div>
  );
}