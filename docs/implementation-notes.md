# Implementation Notes

This document outlines the reasoning and technical approach behind selected changes during the project.

---

## Feat: Enforce Supabase Token Verification
**Issue:** [#2](https://github.com/WiseTogether/wisetogether-server/issues/2)

### Problem
Backend routes rely solely on client-side auth. No server-side validation of Supabase access token.

### Implementation
1. Created `authMiddleware.js` with `verifyToken` middleware function that:
   - Extracts Bearer token from Authorization header
   - Validates token using Supabase's `auth.getUser()`
   - Attaches verified user to request object
   - Returns appropriate error responses for invalid/missing tokens

2. Updated `server.js` to:
   - Import and apply middleware to all protected routes
   - Add 'Authorization' to allowed CORS headers
   - Apply middleware before route handlers

### Testing
To test the implementation:
1. Include valid Supabase JWT token in Authorization header:
   ```
   Authorization: Bearer <your-supabase-jwt-token>
   ```
2. Invalid/missing tokens will return 401 errors
3. Valid tokens will allow access to protected routes

---

