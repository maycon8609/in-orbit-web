import { CreateGoal } from "./components/create-goal";
import { Dialog } from "./components/ui/dialog";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
  const { data } = useQuery({
    queryKey: ["get-summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}
