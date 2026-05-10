export const calculateAudit = (tool: string, plan: string, seats: number) => {

  if (tool === 'chatgpt' && plan === 'team' && seats === 1) {
    return {
      recommendation: "Downgrade to ChatGPT Plus",
      savings: 5, 
      reason: "Team plan requires minimum 2 seats. You are paying for a seat you don't use."
    };
  }
  
  
  return {
    recommendation: "Switch to Credex Credits",
    savings: 15, 
    reason: "Credex offers 30% discount on these credits."
  };
};