import { useQuery } from "@tanstack/react-query";
import { getOverview } from "@/api/ga";

export const useGaOverview = (params: { start_date: string; end_date: string }) =>
  useQuery({
    queryKey: ["ga-overview", params],
    queryFn: () => getOverview(params),
  });


  