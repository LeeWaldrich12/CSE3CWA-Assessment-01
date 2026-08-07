# HealthCoverSim

## Overview

HealthCoverSim is a React, Express and SQLite application that allows users to create, view, update and delete private health insurance quotes.

## Installation

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

## Database Setup

SQLite is used for storage.

The database is automatically created using the provided init.sql script when the backend starts.

## Quote Calculation

Monthly Premium:

```text
Hospital Premium
+ Extras Premium
+ Family Fee
```

Yearly Premium:

```text
Monthly Premium × 12
```

Yearly Discounted Premium:

```text
Yearly Premium × (1 − Discount %)
```

Lifetime Health Cover (LHC) loading applies only to hospital cover.

## Family Cover

Family cover includes two adults and automatically adds a $30 monthly family upgrade fee.

## Limitation

The simulator uses simplified pricing rules and does not represent real insurer pricing.

## AI Usage Statement

Microsoft Copilot was used to assist with:

- Setting up and debugging the Express and SQLite backend
- Debugging CRUD API endpoints
- Debugging React frontend and API integration issues
- Debugging and verifying the premium calculation logic
- Assisted with README documentation

Microsoft Copilot was used to assist with setting up and debugging the Express and SQLite backend, debugging CRUD API endpoints, and troubleshooting React frontend integration issues. All AI-generated suggestions were reviewed, tested and modified before use.