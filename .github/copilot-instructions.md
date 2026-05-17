# ABC Pharmacy Management System - Copilot Instructions

## Purpose

These instructions guide GitHub Copilot and AI coding assistants for the ABC Pharmacy Management System.
The project is a React SPA with an ASP.NET Core backend and simple JSON-based storage.

## Project Overview

- Frontend: React, functional components, hooks, Axios
- Backend: ASP.NET Core Web API, .NET 10, JSON file storage
- Storage: `Data/medicines.json` for medicine records
- API base URL: `https://localhost:7032/api`
- Main endpoint: `/api/medicine`

## General Coding Guidelines

- Write clean, maintainable, readable code.
- Use meaningful, domain-specific names.
- Keep implementations simple and modular.
- Avoid premature optimization.
- Add comments only for non-obvious business logic.
- Prefer explicit error handling and predictable control flow.

## Frontend Guidelines

### React

- Use function components only.
- Use React hooks for state and effects.
- Keep state local unless shared globally.
- Use a service layer for API calls.
- Keep components small and reusable.
- Avoid deeply nested JSX.
- Keep UI logic separate from data fetching logic.

### UI and UX

- Build a responsive layout.
- Use modern, clean styling.
- Add clear validation feedback.
- Show loading and error states.
- Highlight rows using business rules:
  - Red if expiry date is within 30 days
  - Yellow if quantity is below 10
- Expiry warnings take priority over low-stock warnings.

### API Integration

- Use `axios` or built-in fetch with async/await.
- Centralize API base URL configuration.
- Use consistent endpoint paths, e.g. `/api/medicine`.
- Handle API errors and propagate user-friendly messages.

## Backend Guidelines

### ASP.NET Core

- Follow RESTful API standards.
- Use controllers and route attributes.
- Validate models using data annotations or manual checks.
- Return proper HTTP status codes:
  - `200 OK`
  - `201 Created`
  - `400 Bad Request`
  - `404 Not Found`
  - `500 Internal Server Error`
- Use dependency injection where appropriate.

### Data Storage

- Persist medicines in `Data/medicines.json`.
- Use async file operations if available.
- Safely handle missing or malformed JSON.
- Prevent data corruption on write.
- Ensure IDs are unique across records.

### Model Rules

Medicine should include:

- `Id` (int)
- `FullName` (string)
- `Brand` (string)
- `ExpiryDate` (DateTime)
- `Quantity` (int)
- `Price` (decimal)
- `Notes` (string)

## Validation Rules

- `FullName`: required, min 3, max 100
- `Brand`: required, min 2, max 50
- `ExpiryDate`: required, not in the past
- `Quantity`: required, integer, >= 0
- `Price`: required, positive, max 2 decimals
- `Notes`: optional, max 500

## Architecture and Folder Structure

Recommended structure:

- `ABCPharmacyAPI/`
  - `Controllers/`
  - `Models/`
  - `Data/`
  - `Program.cs`
- `Client/`
  - `public/`
  - `src/components/`
  - `src/pages/`
  - `src/services/`
  - `src/styles/`

## Best Practices

- Keep frontend and backend concerns separated.
- Favor simple, testable code.
- Use consistent naming conventions.
- Avoid hard-coded values in multiple places.
- Use standard HTTP verbs for resources.
- Keep API responses JSON-friendly.

## Preferred Output Style

- Production-ready code.
- Minimal but useful comments.
- Easy to understand and maintain.
- Interview-friendly solutions.
- Do not over-engineer.
