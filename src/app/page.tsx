"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    bedrooms: 3,
    bathrooms: 2,
    sqft_living: 1500,
    sqft_lot: 6000,
    floors: 1,
    waterfront: 0,
    view: 0,
    condition: 3,
    sqft_above: 1500,
    sqft_basement: 0,
    yr_built: 1990,
    yr_renovated: 0,
  });

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setPredictedPrice(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          sqft_living: Number(formData.sqft_living),
          sqft_lot: Number(formData.sqft_lot),
          floors: Number(formData.floors),
          waterfront: Number(formData.waterfront),
          view: Number(formData.view),
          condition: Number(formData.condition),
          sqft_above: Number(formData.sqft_above),
          sqft_basement: Number(formData.sqft_basement),
          yr_built: Number(formData.yr_built),
          yr_renovated: Number(formData.yr_renovated),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was't ok");
      }
      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error fetching prediction. Is the Flask server running?");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter p-6">
      <div className="max-w-6xl mx-auto lg:flex lg:gap-12">
        <div className="lg:w-1/2 mb-12 lg:mb-5 xl:p-10" >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Real Estate Price Predictor
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Leverage machine learning powered by a Random Forest model to estimate property values 
            through key structural features and market indicators. 
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {predictedPrice !== null && (
              <div className="bg-emerald-50 rounded-lg p-6 text-center border border-emerald-100">
                <p className="text-sm text-emerald-600 mb-2 font-medium">ESTIMATED VALUE</p>
                <div className="text-3xl font-bold text-emerald-700">
                  ${predictedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 rounded-lg p-4 text-center border border-red-100 mt-4">
                <p className="text-red-600 text-sm">{errorMsg}</p>
              </div>
            )}
          </div>
        </div>
        {/*grid grid-cols-1 md*/}
        <div className="lg:w-1/2">
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700"
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    step={key === 'bathrooms' ? 0.5 : 1}
                    min={0}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all"
            >
              Calculate Price
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
