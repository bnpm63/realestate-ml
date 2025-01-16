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
    <div
      className="
        flex flex-col md:flex-row
        items-center justify-center
        min-h-screen
        px-16 py-12
      "
    >
    
      <div className="md:w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Real Estate ML Housing Price Predictor
        </h1>
        <p className="text-lg leading-relaxed text-center">
          This project uses a <strong>Machine Learning</strong> model to estimate
          home prices based on various features. Enter your home details on the
          right side to get an instant prediction!
        </p>
      </div>

   
      <div className="md:w-1/2 h-full flex flex-col items-center justify-center mt-10 md:mt-0">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full max-w-lg">
        
          <div>
            <label className="block font-medium mb-1 text-gray-500">Bedrooms:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Bathrooms:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              step="0.5"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Sqft Living:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="sqft_living"
              value={formData.sqft_living}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Sqft Lot:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="sqft_lot"
              value={formData.sqft_lot}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Floors:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              step="0.5"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Waterfront (0 or 1):</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="waterfront"
              value={formData.waterfront}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">View (0-4):</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="view"
              value={formData.view}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Condition (1-5):</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-500">Sqft Above:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="sqft_above"
              value={formData.sqft_above}
              onChange={handleChange}
            />
          </div>
 
          <div>
            <label className="block font-medium mb-1 text-gray-500">Sqft Basement:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="sqft_basement"
              value={formData.sqft_basement}
              onChange={handleChange}
            />
          </div>

          {/* className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="yr_built" */}
          <div>
            <label className="block font-medium mb-1 text-gray-500">Year Built:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="yr_built"
              value={formData.yr_built}
              onChange={handleChange}
            />
          </div>
 
          <div>
            <label className="block font-medium mb-1 text-gray-500">Year Renovated:</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-black text-xl focus:outline-none"
              type="number"
              name="yr_renovated"
              value={formData.yr_renovated}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-10 py-2.5 text-white text-md font-medium bg-black rounded-full hover:bg-gray-800"
            >
              Predict
            </button>
          </div>
        </form>

        {errorMsg && (
          <p className="text-red-600 mt-4">{errorMsg}</p>
        )}

        {predictedPrice !== null && (
          <div className="bg-gray-100 rounded-md p-4 mt-4 w-full max-w-lg text-center">
            <h2 className="text-3xl font-medium">
              Predicted Price: ${predictedPrice.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
