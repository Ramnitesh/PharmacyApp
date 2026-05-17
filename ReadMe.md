<img width="1423" height="778" alt="abc pharmacy" src="https://github.com/user-attachments/assets/8bfe0bef-5056-46d9-a29f-6deedaf9c9a1" />

# ABC Pharmacy Management System

A Single Page Application (SPA) for managing medicines using ASP.NET Core Web API and ReactJS.

---

## Tech Stack

### Backend

- ASP.NET Core Web API
- .NET 10

### Frontend

- ReactJS

### Storage

- JSON File Storage

---

# Backend Setup

## Navigate to API project

```bash
cd ABCPharmacyAPI
```

## Restore packages

```bash
dotnet restore
```

## Run API

```bash
dotnet run --launch-profile https
```

## Swagger URL

```text
https://localhost:7032/swagger
```

---

# Frontend Setup

## Navigate to frontend project

```bash
cd Client
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm start
```

## Frontend URL

```text
http://localhost:3000
```

---

# Features

- View medicines
- Add medicines
- Search medicines
- Expiry warning (Red)
- Low stock warning (Yellow)

---

# Medicine Attributes

- Full Name
- Notes
- Expiry Date
- Quantity
- Price
- Brand

---

# Notes

- Backend stores data in JSON file
- Make sure backend is running before starting frontend
- Swagger enabled for API testing

---

# Author

RamNitesh Saran
