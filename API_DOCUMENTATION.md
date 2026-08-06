# FixItNow API Documentation

## Project Overview

FixItNow is a service marketplace backend application that connects customers with technicians. Customers can browse services, create bookings, make payments, and submit reviews. Technicians can create profiles, provide services, and manage bookings.


## Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation


## Base URL

http://localhost:5000


# Authentication

All protected APIs require JWT authentication.

Header:

Authorization: Bearer JWT_TOKEN


# Authentication APIs


## Register User

Endpoint:
POST /api/auth/register

Request:

{
  "name": "John Customer",
  "email": "customer@test.com",
  "password": "123456",
  "role": "CUSTOMER"
}


Available Roles:
- CUSTOMER
- TECHNICIAN
- ADMIN



## Login User

Endpoint:
POST /api/auth/login

Request:

{
  "email": "customer@test.com",
  "password": "123456"
}



# Category APIs


## Get Categories

GET /api/categories



# Technician APIs


## Create Technician Profile

POST /api/technicians

Role:
TECHNICIAN

Request:

{
  "skills": "AC Repair, Electrical Work",
  "experience": "5 years",
  "location": "Dhaka",
  "hourlyRate": 500
}



# Service APIs


## Create Service

POST /api/services

Role:
TECHNICIAN

Request:

{
  "title": "AC Repair Service",
  "description": "Home AC servicing and repair",
  "price": 1500,
  "categoryId": "CATEGORY_ID"
}


## Get Services

GET /api/services


## Get Single Service

GET /api/services/:id



# Booking APIs


## Create Booking

POST /api/bookings

Role:
CUSTOMER

Request:

{
  "serviceId": "SERVICE_ID",
  "bookingDate": "2026-08-10T10:00:00",
  "address": "Dhaka"
}


## Customer Bookings

GET /api/bookings/my


## Technician Bookings

GET /api/bookings/technician


## Update Booking Status

PATCH /api/bookings/:id/status

Request:

{
  "status": "COMPLETED"
}


Available Status:

REQUESTED
ACCEPTED
DECLINED
IN_PROGRESS
COMPLETED
CANCELLED



# Payment APIs


## Create Payment

POST /api/payments

Request:

{
  "bookingId": "BOOKING_ID",
  "amount": 1500
}


## Get Payment

GET /api/payments/:bookingId


## Update Payment Status

PATCH /api/payments/:bookingId/status



# Review APIs


## Create Review

POST /api/reviews

Role:
CUSTOMER

Request:

{
  "bookingId": "BOOKING_ID",
  "rating": 5,
  "comment": "Excellent service"
}



## Get Technician Reviews

GET /api/reviews/technician/:technicianId



# Error Format

Example:

{
  "success": false,
  "message": "Service not found",
  "errorDetails": {}
}



# Database Models

- User
- TechnicianProfile
- Category
- Service
- Booking
- Payment
- Review



# Application Flow

Customer:

Register → Login → Browse Services → Create Booking → Payment → Review


Technician:

Register → Create Profile → Add Services → Manage Booking → Complete Service