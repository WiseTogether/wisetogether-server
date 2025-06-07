# Implementation Notes

This document outlines the reasoning and technical approach behind selected changes during the project.

---

## Feat: Enforce Supabase Token Verification
**Issue:** [#2](https://github.com/WiseTogether/wisetogether-server/issues/2)

### Problem
Backend routes rely solely on client-side auth. No server-side validation of Supabase access token.

### Implementation
1. Created `authMiddleware.js` with:
   - `verifyToken` middleware to validate JWT tokens
   - Uses `getSupabaseClientWithAuth` for authenticated requests
   - Proper error handling for missing/invalid tokens

2. Updated `server.js` to:
   - Import and apply middleware to all protected routes
   - Add 'Authorization' to allowed CORS headers
   - Apply middleware before route handlers

3. Updated `supabaseClient.js` to:
   - Add `getSupabaseClientWithAuth` function for authenticated operations
   - Centralize Supabase client configuration

4. Updated all models to accept authenticated Supabase client:
   - `profileModel.js`: Updated createProfile and findByUserId
   - `expenseModel.js`: Updated filterById and addExpense
   - `sharedAccountModel.js`: Updated findByUserId

5. Updated all controllers to pass authenticated Supabase client:
   - `profileController.js`: Updated createUserProfile and findProfileByUserId
   - `expenseController.js`: Updated fetchAllExpensesById, addNewPersonalExpense, and addNewSharedExpense
   - `sharedAccountController.js`: Updated findSharedAccountByUserId

### Testing
To test the implementation:
1. Include valid Supabase JWT token in Authorization header:
   ```
   Authorization: Bearer <your-supabase-jwt-token>
   ```
2. Invalid/missing tokens will return 401 errors
3. Valid tokens will allow access to protected routes

---

