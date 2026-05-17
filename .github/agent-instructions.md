# AI Agent Instructions - ABC Pharmacy Management System

## Project Overview

This repository contains a pharmacy management Single Page Application:

- Frontend: React, functional components, hooks, Axios
- Backend: ASP.NET Core Web API, .NET 10
- Storage: JSON file persistence in `Data/medicines.json`
- Main API route: `/api/medicine`

## Agent Goals

The AI agent should produce:

- Clean, maintainable code
- Consistent project structure
- Simple solutions over complexity
- Workable interview-friendly implementations
- Output aligned with React + ASP.NET Core standards

## Frontend Rules

### React Guidelines

- Use functional components and hooks only.
- Keep presentation logic and data fetching separate.
- Use a service layer for API calls.
- Keep component props minimal.
- Favor readability and small reusable components.
- Use `const` for values that do not change.

### UI Rules

- Build responsive layouts.
- Use accessible markup and labels.
- Show loading, error, and validation states.
- Keep styling clean and consistent.
- Use business rules for row highlighting.

### Data and State

- Keep state local unless shared across multiple components.
- Avoid global state libraries unless necessary.
- Update UI reactively after API responses.

## Backend Rules

### API Guidelines

- Use RESTful routes and HTTP verbs.
- Return proper HTTP status codes.
- Validate request body input before processing.
- Handle missing resources with `404`.
- Use consistent JSON error payloads.
- Keep controllers simple and focused.

### JSON Storage Rules

- Read and write `Data/medicines.json` safely.
- Ensure ID uniqueness.
- Fail gracefully on missing or invalid data.
- Use async file I/O where available.

### Error Handling

- Return user-friendly error messages.
- Avoid exposing internal details.
- Use consistent error response structure, for example:

```json
{
  "message": "Medicine not found"
}
```

## Validation Rules

Validate both frontend and backend.

- `FullName`: required, min 3, max 100
- `Brand`: required, min 2, max 50
- `ExpiryDate`: required, not in the past
- `Quantity`: required, integer, >= 0
- `Price`: required, > 0, max 2 decimal places
- `Notes`: optional, max 500

## Naming and Style

### C#

- PascalCase for classes, enums, properties.
- camelCase for local variables and method parameters.
- Use nullable reference types when appropriate.

### JavaScript / JSX

- Prefer `const`; use `let` only when reassignment is needed.
- Use arrow functions for event handlers and helpers.
- Keep JSX clean and readable.
- Avoid deeply nested logic.

## Output Expectations

- Production-ready, maintainable code.
- Clean folder structure.
- Minimal but useful comments.
- No over-engineering.

## Useful Notes

- The frontend API base URL is `https://localhost:7032/api`.
- The backend route uses `MedicineController` with `/api/medicine`.
- Keep frontend and backend validation aligned.
