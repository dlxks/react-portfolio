import { useCallback, useEffect, useState } from "react";

const ENDPOINTS = {
  profile: "/api/profile",
  experience: "/api/experience",
  education: "/api/education",
  projects: "/api/projects",
  certificates: "/api/certificates",
  socialLinks: "/api/social_links",
};

const EMPTY = {
  profile: {},
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  socialLinks: [],
};

/**
 * Fetches all portfolio content from the API in parallel.
 * Shared by the public site and the admin dashboard.
 */
export default function usePortfolioData() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      const keys = Object.keys(ENDPOINTS);
      const results = await Promise.all(
        keys.map((key) => fetch(ENDPOINTS[key]).then((res) => res.json())),
      );
      setData(Object.fromEntries(keys.map((key, i) => [key, results[i]])));
      setError(null);
    } catch (err) {
      console.error("Failed to load portfolio data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
