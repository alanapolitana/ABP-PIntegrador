import React from "react";

/**
 * Shows the price in US dollars using the given exchange rate.
 * @param {number} priceARS - Price in Argentine Pesos.
 * @param {number} usdRate - Dollar exchange rate (e.g., blue, official).
 * @param {string} type - Label for tooltip (e.g., "blue", "official").
 */
export default function PriceInUSD({ priceARS, usdRate, type = "blue" }) {
  if (!usdRate) return null;
  const priceUSD = (priceARS / usdRate).toFixed(2);

  return (
    <span title={`Exchange rate (${type}): $${usdRate}`}>
      ({priceUSD} USD)
    </span>
  );
}