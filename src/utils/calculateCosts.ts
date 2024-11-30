import {ICost, IUsage} from "../types/data";

const isValidDate = (dateString: string): boolean => !isNaN(Date.parse(dateString));

export const calculateCosts = (usages: IUsage[], costs: ICost[], filters: {
  type: string | null;
  model: string | null
}) => {
  const costMap = new Map(costs.map((cost) => [cost.model, cost]));

  const aggregatedCosts = usages
    .filter((usage) => {
      return (!filters.type || usage.type === filters.type) && (!filters.model || usage.model === filters.model);
    })
    .map((usage) => {
      const modelCost = costMap.get(usage.model);
      if (!modelCost || !isValidDate(usage.created_at)) return null;

      const cost = usage.usage_input * modelCost.input + usage.usage_output * modelCost.output;
      const date = new Date(usage.created_at);
      return { date: date.toISOString(), cost };
    })
    .filter((item): item is { date: string; cost: number } => item !== null)
    .reduce((acc: Map<string, number>, item: { date: string; cost: number }) => {
      const dateKey = item.date.split('T')[0];
      acc.set(dateKey, (acc.get(dateKey) || 0) + item.cost);
      return acc;
    }, new Map<string, number>());

  const dates = Array.from(aggregatedCosts.keys());
  const minDate = new Date(Math.min(...dates.map((date) => new Date(date).getTime())));
  const maxDate = new Date(Math.max(...dates.map((date) => new Date(date).getTime())));

  const allDates = [];
  for (let date = minDate; date <= maxDate; date.setDate(date.getDate() + 1)) {
    allDates.push(new Date(date).toISOString().split('T')[0]);
  }

  const finalData = allDates.map((date) => {
    const cost = aggregatedCosts.get(date) || 0;
    return {date, cost};
  });

  return finalData.sort((prev, next) => new Date(prev.date).getTime() - new Date(next.date).getTime());
};
