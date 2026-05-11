import { TOOLS_DATABASE } from './pricing';

export const calculateAudit = (toolId: string, seats: number) => {
  
  const tool = TOOLS_DATABASE.find(t => t.id === toolId);
  const price = tool ? tool.price : 20; 

  const monthlyCost = price * seats;
  const savings = Math.round(monthlyCost * 0.3); 

  return {
    savings: savings,
    recommendation: `Switch to Credex Unified Billing for ${tool?.name}`,
    reason: `You are currently paying $${monthlyCost}/mo. Credex's bulk-buying power reduces this by 30%.`
  };
};