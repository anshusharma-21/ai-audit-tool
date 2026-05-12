## Day 1 — 2026-05-08
**Hours worked:** 3
**What I did:** - Set up React 19 + TypeScript + Tailwind 4 environment.
- Initialized project folder structure and core utility files (engine.ts, pricing.ts).
- Created all 11 mandatory documentation files for the assignment.
- Verified local development environment is running and established baseline for CI/CD.
- Created the initial system architecture diagram.

**What I learned:** Tailwind 4 configuration is much simpler but requires a different approach for importing into CSS.

**Blockers / what I'm stuck on:** None.

**Plan for tomorrow:** Start collecting official pricing data for required AI tools and build the core audit engine logic.

## Day 1.5 — 2026-05-09
Hours worked: 0
Reason: Focused on college assignments and academic schedule.


## Day 2 — 2026-05-10
**Hours worked:** 4
**What I did:**
- Researched and verified latest pricing for Cursor, Copilot, and ChatGPT.
- Built the core audit engine logic in `engine.ts`.
- Created the pricing data structure in `pricing.ts`.
- Wrote 5 test cases in `TESTS.md` to verify calculation accuracy.
**What I learned:** How to structure pricing data for scalability.
**Blockers:** Finding official enterprise pricing links (Decided to use estimated averages).
**Plan for tomorrow:** Build the multi-step input form.




## Day 3 — 2026-05-11
**Hours worked:** 4
**What I did:**

Integrated Supabase SDK (@supabase/supabase-js) for backend connectivity.

Created and configured the audits table schema in the Supabase dashboard.

Rewrote the form submission logic in App.tsx using try...catch...finally for robust error handling.

Implemented React Hot Toast library to provide aesthetic, real-time feedback (Loading, Success, and Error states).

Successfully linked the frontend input data to the live database for persistent storage.

Debugged and resolved Row Level Security (RLS) policy blockers that were preventing data insertion.

**What I learned:** How to manage asynchronous data flow and the importance of backend security policies (RLS) in full-stack applications.

**Blockers:** Encountered "API Disabled" and "Submission Failed" errors due to Supabase policy restrictions. (Resolved by manually disabling RLS for testing and re-configuring public schema access).

**Plan for tomorrow:** Finalize UI/UX polish (Glassmorphism theme) and deploy the project to Vercel for the final submission.


## Day 3 — 2026-05-11
**Hours worked:** 8
**What I did:**

UI/UX Polish: Refined the header spacing and typography to ensure the dashboard looks balanced and professional.

Documentation Finalization: Completed all 11 mandatory .md files (GTM, Economics, Reflection, Architecture, etc.) according to the assignment's PDF requirements.

CI/CD Setup: Created the .github/workflows/ci.yml file to enable automatic build verification on every push.

Media Assets: Captured 3 functional screenshots of the dashboard and linked them within the README.md to showcase the UI.

Security & Logic Updates: Refined the email validation logic and ensured the shareable public URL functionality works correctly.

Final Deployment: Deployed the latest build to Vercel and verified all environment variables are correctly configured.

**What I learned:**
I learned that documentation is just as critical as the code itself, especially for AI-assisted review processes.

I gained a better understanding of YAML syntax and the importance of correct indentation for GitHub Actions.


**Blockers:**
Encountered syntax errors in the CI/CD YAML file. These were resolved by correcting the indentation and structure of the workflow file.


**Plan for tomorrow:**
Submit the final links (GitHub and Live URL) and monitor the GitHub Actions tab for the final green checkmark.