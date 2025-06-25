import { useEffect, useState } from "react";
import type { Dashboard } from "../types/dashboard";
import { getDashboardList } from "../services/dashboardService";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await getDashboardList();
      setDashboard(res);
      // ใช้สำหรับ DataGrid
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  return {
    dashboard,
    loading,
    refetch: () => fetchDashboard(),
  };
}
