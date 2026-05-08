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