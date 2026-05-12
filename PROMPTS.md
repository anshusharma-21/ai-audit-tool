# Engineering Prompts

## UI Generation
- "Create a glassmorphism style dashboard using Tailwind CSS 4 and React."
- "Design a pricing card that shows annual savings in a large, bold font."

## Logic Implementation
- "Write a TypeScript function to calculate 30% savings on a list of AI tools."
- "How to integrate Supabase with React 19 for data insertion?"

# Engineering Prompts

## Audit Summary Prompt
"You are a Senior Financial Auditor. Based on this audit data: {tool}, {seats}, {savings}, write a 100-word professional summary explaining why switching to Credex is the best move for this startup's ROI. Focus on security and efficiency."

## Why this prompt?
- It uses a "Persona" (Senior Auditor) to ensure a professional tone.
- It limits word count to keep the dashboard clean.
- It prioritizes ROI, which is the user's main goal.

## Iteration: What didn't work
- **Initial Prompt:** "Summarize the savings for the user." 
- **The Issue:** The output was too generic and didn't sound professional enough for a CFO/CEO. It also didn't mention Credex as a solution.
- **The Fix:** Added the "Senior Financial Auditor" persona and explicitly told the AI to focus on ROI and security. This immediately improved the "pitch" quality of the summary.