# FixItNow Backend

FixItNow is a service marketplace backend where customers can find technicians, book services, make payments, and provide reviews.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

## Features

### Authentication
- User registration
- User login
- JWT based authentication

### User Management
- User profile
- Role management

### Category Management
- Create categories
- View categories

### Technician Management
- Create technician profile
- Manage technician information

### Service Management
- Create services
- Update services
- Delete services
- Browse services

### Booking Management
- Customer creates booking
- Technician accepts booking
- Booking status tracking

Status flow:

REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED

### Payment Management

- Create payment
- Track payment status
- Transaction ID generation

Payment flow:

PENDING → COMPLETED

### Review Management

- Customer reviews completed bookings
- Rating system
- Technician review listing


## Installation

Clone repository:

```bash
git clone <repository-url>