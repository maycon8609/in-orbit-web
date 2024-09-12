export type GetPendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[];

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const response = await fetch("http://localhost:3333/goals/pendings");
  const data = await response.json();
  return data.pendingGoals;
}