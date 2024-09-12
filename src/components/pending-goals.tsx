import { Plus } from "lucide-react";

import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pendig-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["get-pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 1 minute
  });

  if (!data) return null;

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({
      queryKey: ["get-summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-pending-goals"],
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        const goalAlreadyCompleted =
          goal.completionCount >= goal.desiredWeeklyFrequency;

        return (
          <OutlineButton
            key={goal.id}
            disabled={goalAlreadyCompleted}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
