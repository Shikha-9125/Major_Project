import { useEffect, useState } from "react";
import api from "../services/api.js";

function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/sample")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Home Page</h2>
      <p className="text-gray-700">
        <span className="font-medium">Backend says:</span>{" "}
        {message || "Loading..."}
      </p>
    </div>
  );
}

export default HomePage;
