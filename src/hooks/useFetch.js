import { useEffect, useState } from "react";

export default function useFetch(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);

      const result = await apiFunction();

        if (!result || typeof result !== "object" || !result.data) {
        throw new Error("Invalid API response");
      }

      setData(result);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError(true);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, dependencies);

  return { data, loading, error, refetch: loadData };
}
