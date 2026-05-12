
# Test Suite

## Audit Engine Tests
As per the assignment requirements, I have implemented 5 core test cases to verify the defensibility of the audit logic.

| Test Case | Description | Expected Outcome |
| :--- | :--- | :--- |
| **Math Accuracy** | Verifies 30% savings on standard monthly spend. | Savings = Spend * 0.30 |
| **Seat Threshold** | Checks if >10 seats trigger enterprise consultation advice. | High Savings UI active |
| **Plan Optimization** | Verifies downgrade suggestion for 1 user on a 'Team' plan. | Recommendation: Downgrade |
| **Tool Mapping** | Ensures correct pricing is pulled for ChatGPT vs Claude. | Correct Pricing Applied |
| **Data Persistence** | Checks if form state persists after page reload. | State Recovered |

## How to run tests
```bash
npm test