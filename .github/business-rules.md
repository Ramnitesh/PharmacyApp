# File: `.github/business-rules.md`

```md
# Business Rules - ABC Pharmacy Management System

## Medicine Record Rules

### Unique Identification

- Each medicine record must have a unique `Id`.
- ID values must not be duplicated.
- IDs are assigned by the backend when a new medicine is created.

### Full Name

- Required field.
- Must be a valid medicine name.
- Minimum length: 3 characters.
- Maximum length: 100 characters.
- Duplicate medicine names are allowed.

### Brand

- Required field.
- Minimum length: 2 characters.
- Maximum length: 50 characters.
- Should represent the manufacturer or brand name.

### Expiry Date

- Required field.
- Cannot be a past date.
- If expiry is within 30 days, highlight the medicine row.

### Quantity

- Required field.
- Must be an integer value.
- Cannot be negative.
- Low stock warning when quantity is less than 10.

### Price

- Required field.
- Must be greater than 0.
- Allow up to 2 decimal places.

### Notes

- Optional field.
- Used for additional medicine information.
- Maximum length: 500 characters.

## UI Highlighting Rules

### Expiry Warning

- Condition: expiry date is less than 30 days from today.
- Action: highlight row in red.
- Priority: expiry warning overrides low stock warning.

### Low Stock Warning

- Condition: quantity is less than 10.
- Action: highlight row in yellow.

## Search Rules

- Search by medicine full name.
- Search must be case-insensitive.
- Search results update dynamically while typing.

## API and Data Rules

### Data Storage

- Persist medicine data in `Data/medicines.json`.
- Use safe file read/write operations.
- Prevent data corruption on write.
- Keep data available after application restart.

### API Behavior

Use proper HTTP codes:

- `200 OK` for successful GET/PUT
- `201 Created` for successful POST
- `204 No Content` for successful DELETE
- `400 Bad Request` for validation errors
- `404 Not Found` when a record does not exist
- `500 Internal Server Error` for unexpected failures

### Responses

- Success responses should return JSON payloads.
- Error responses should include a `message` field.

## Validation Rules

- Backend validation is mandatory.
- Frontend validation is required for good UX.
- Backend validation must preserve data integrity.
- Frontend validation should reduce unnecessary API requests.

## SPA Behavior

- The frontend should behave as a single page app.
- Avoid full page reloads during navigation.
- Update data dynamically after API calls.
- Use asynchronous API requests.

## Maintainability

- Keep business rules concise and consistent.
- Avoid introducing duplicate validation logic in multiple places.
- Document any domain-specific assumptions clearly.

## Future Considerations

Potential future enhancements:

- Edit and delete medicine features
- Authentication and authorization
- Role-based access control
- Sales transaction tracking
- Inventory reports and analytics
- Migration to a database-backed storage
```
