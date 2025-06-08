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

## Feat: Implement Edit Transaction API Endpoint
**Issue:** [#1](https://github.com/WiseTogether/wisetogether-server/issues/1)

### Problem
No logic for editing expenses. Users need the ability to modify existing expense details.

### Implementation
1. Added `updateExpense` function to `expenseModel.js`:
   - Updates expense by UUID
   - Returns formatted expense data
   - Handles error cases appropriately

2. Added `updateExpense` controller to `expenseController.js`:
   - Supports partial updates of expense fields
   - Validates required parameters
   - Automatically recalculates split amounts when amount or split type changes
   - Returns updated expense data

3. Updated `expenseRoutes.js` to:
   - Add PATCH endpoint for expense updates
   - Route: `/expenses/:expenseId`

### Testing
To test the implementation:
1. Send PATCH request to `/expenses/:expenseId`
2. Include any combination of updatable fields in request body
3. For split expenses, amount or split type changes will trigger automatic recalculation
4. Verify response contains updated expense data

---

## Feat: Refactor Expense Creation Response
**Issue:** [#6](https://github.com/WiseTogether/wisetogether-server/issues/6)

### Problem
Expense creation endpoints only return success messages without the created expense data, requiring additional API calls to get the new expense details.

### Implementation
1. Updated `expenseModel.js`:
   - Modified `addExpense` function to return formatted expense data
   - Added consistent data formatting with other expense endpoints
   - Maintained error handling

2. Updated `expenseController.js`:
   - Modified `addNewPersonalExpense` to return created expense
   - Modified `addNewSharedExpense` to return created expense
   - Maintained existing validation and error handling

### API Endpoints
- POST `/expenses/personal`
  - Returns: Created expense object with all fields
- POST `/expenses/shared`
  - Returns: Created expense object with all fields including split details

### Testing
To test the implementation:
1. Create a new personal or shared expense
2. Verify response contains complete expense object
3. Verify all fields are correctly formatted
4. For shared expenses, verify split details are included

---

## Feat: Implement Delete Transaction API Endpoint
**Issue:** [#3](https://github.com/WiseTogether/wisetogether-server/issues/3)

### Problem
No functionality to delete expenses. Users need the ability to remove expenses from their records.

### Implementation
1. Added `deleteExpense` function to `expenseModel.js`:
   - Deletes expense by UUID
   - Returns true on successful deletion
   - Handles error cases appropriately

2. Added `deleteExpense` controller to `expenseController.js`:
   - Validates expense ID parameter
   - Returns success message on deletion
   - Maintains consistent error handling

3. Updated `expenseRoutes.js` to:
   - Add DELETE endpoint for expense deletion
   - Route: `/expenses/:expenseId`

### Testing
To test the implementation:
1. Send DELETE request to `/expenses/:expenseId`
2. Verify expense is removed from database

---

