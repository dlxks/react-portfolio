import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const TABLES = {
  profile: "personal_info",
  experience: "experience",
  education: "education",
  projects: "projects",
  certificates: "certificates",
  socialLinks: "social_links",
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
 * Fetches all portfolio content from Supabase in parallel.
 * Shared by the public site and the admin dashboard.
 */
export default function usePortfolioData() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      const keys = Object.keys(TABLES);
      const results = await Promise.all(
        keys.map(async (key) => {
          const { data, error } = await supabase.from(TABLES[key]).select('*').order('id', { ascending: true });
          if (error) throw error;
          
          // Profile expects a single object, others expect arrays
          if (key === 'profile') {
            return data[0] || {};
          }
          if (key === 'certificates' || key === 'experience' || key === 'education') {
            const dateField = key === 'certificates' ? 'date' : 'duration';
            return data.sort((a, b) => {
              const parseDate = (dateStr) => {
                if (!dateStr) return 0;
                const parts = dateStr.split(' - ');
                const endStr = parts.length > 1 ? parts[1].trim() : parts[0].trim();
                if (endStr.toLowerCase() === 'present') return Date.now();
                let d = new Date(endStr).getTime();
                if (!isNaN(d)) return d;
                return 0;
              };
              return parseDate(b[dateField]) - parseDate(a[dateField]);
            });
          }
          return data;
        })
      );
      setData(Object.fromEntries(keys.map((key, i) => [key, results[i]])));
      setError(null);
    } catch (err) {
      console.error("Failed to load portfolio data from Supabase:", err);
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
