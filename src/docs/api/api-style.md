# API Styling Rules

### Ground Rules
 - Predicatable > Clever. Same shapes everywhere.
 - One error envelope. One pagination shape. No exceptions.
 - Document before merge. PRs that add/change endpoints must update the spec and examples
  
### Paths & naming
 - Resource names: plural, kebab-case  --> /users,/gyms,/workouts 
 - Hirearchy: child under parent --> /gyms/{gymId}/workouts
 - Actions: only when not CRUD --> /auth/login, /users/id/deactivate
 - IDs: public IDs are UUID v4. Never expose DB auto increment Ids.
 
### Data Formats
 - Timestamps: ISO-8601 UTC String --> createdAt,updatedAt
 - Money: integer minor units; e.g., PKR 12.99 = amount 1299, currency: "PKR"
 - Booleans: true/false (not string)
 - pick a style (UPPER_SNAKE is fine) and stick to it.

### Pagination (one standard)
 - Cursor-based with cursor and limit query params. 
 - Response shape: 
    data[...]
    meta:{nextCursor:string,total:number(optional)}

### Error envelope
 - HTTP status is the truth (404, 401, etc.)
 - Body:
   ```json
    error: {
    code: "GYM_NOT_FOUND" | "UNAUTHENTICATED" | "VALIDATION_FAILED" | ...,
    message: "Human-readable message",
    details?: [ field-level info ],
    },
    requestId: "trace id"
   ```

### Auth & security
 - Scheme: Authorization: Bearer <JWT>
 - Document roles/scopes (if any) per tag.


### Versioning & deprecation
 - Prefix paths with /v1.
 - Breaking change: remove/rename fields, change types/meaning.
 - Deprecation flow: mark deprecated: true in spec + announce removal date (≥90 days) → remove later.

### Tags & ownership (DRI)
 - Tags: Auth, Users, Gyms, Workouts, Orders.
 - Owner: for now, you for all tags. (List them in a tiny table.)

| Tag      | Owner (DRI) |
|----------|-------------|
| Auth     | Mudassir    |
| Users    | Mudassir    |
| Gyms     | Mudassir    |
| Workouts | Mudassir    |
| Orders   | Mudassir    |



### Shared components (schemas you’ll reuse)
 - Error (the envelope above)
 - Paginated<T> (pagination wrapper)
 - User (id, email, name, createdAt, updatedAt)
 - Gym (id, name, location, verified, createdAt, updatedAt)
 - Workout (id, gymId, title, difficulty, durationMin, createdAt, updatedAt)

#### Example Payloads

**User**
```json
{
  "id": "a12b34c5-d67e-890f-1234-56789abcd000",
  "email": "user@example.com",
  "name": "Mudassir",
  "createdAt": "2025-08-28T09:00:00Z",
  "updatedAt": "2025-08-28T09:00:00Z"
}```

### How to add a new endpoint (the paved road checklist)
 - Pick tag & owner.
 - Use shared components; if your shape is new, propose a shared component.
 - Add success + error examples (not code).
 - Apply pagination & errors from the standard components if listing.
 - Update the spec (because we’re code-first, your decorators will generate it—but the examples still live in the spec/docs).
 - Link this style guide in the PR description.
 - CI must pass API checks (we’ll wire them in the next step).