# System Architecture

## Data Flow Diagram
```mermaid
graph TD
    A[User Visitor] -->|Inputs AI Spend| B[Audit Engine]
    B -->|Logic + Pricing Data| C[Audit Results Dashboard]
    C -->|High Savings >$500| D[Credex Consultation Lead]
    C -->|Email Capture| E[(Supabase DB)]
    C -->|Unique UUID| F[Shareable Public URL]
    B -->|Prompt| G[LLM API Summary]
    G --> C
```    



Tech Stack Details
Frontend: React 19 + TypeScript + Tailwind 4.

Backend/DB: Supabase (PostgreSQL) for real-time lead capture.

Utilities: Lucide-React (Icons), React Hot Toast (Notifications).

Report Generation: jsPDF & html2canvas (Upcoming feature).