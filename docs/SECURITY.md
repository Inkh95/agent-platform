# Security and release gates

The current UI is a non-production preview. The chat endpoint intentionally returns HTTP 503.
Do not set ENABLE_AI_CHAT=true expecting a working provider.

Before allowing real users:
1. Add secure authentication and server-side session verification.
2. Implement tenant isolation, persistent storage, user deletion, and consent.
3. Enforce per-user and per-IP rate limits and spending caps.
4. Connect an AI provider exclusively from server-side code.
5. Add OAuth with encrypted token storage and scoped permissions.
6. Require human approval before sending messages, booking, purchasing or making payments.
7. Verify Stripe webhook signatures and keep subscription state server-side.
8. Add tests, observability, incident procedures and privacy disclosures.
