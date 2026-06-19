# Learning For All

## Overview

Millions of children struggle in classrooms not because they lack ability, but because learning challenges are often identified too late.

In many schools, teachers rely on informal observation rather than structured tools to identify students who may need additional support. By the time a student is recognized as struggling, the learning gap has already widened.

The Learning Risk Identification Platform helps teachers proactively identify students who may be at academic risk through structured classroom observations and actionable insights.

---

## Problem Statement

Early learning difficulties frequently go undetected, especially in under-resourced schools where access to psychologists and formal screening tools is limited.

This can lead to:

* Repeated academic failure
* Reduced confidence and motivation
* Delayed interventions
* Long-term educational inequality

Teachers need a simple, affordable, and scalable way to identify students who may require additional support before learning gaps become permanent.

---

## Solution

The platform enables teachers to:

* Record structured classroom observations
* Track student learning indicators
* Calculate risk scores
* Identify students requiring additional attention
* Monitor progress over time
* Generate intervention recommendations

The system is designed to support teachers, not replace professional assessment.

---

## Key Features

### Teacher Dashboard

Provides a classroom-wide overview of student learning status.

### Student Monitoring

Track individual students across multiple learning indicators.

### Risk Scoring Engine

Calculates an overall learning risk score based on teacher observations.

### Early Intervention Support

Highlights students who may benefit from additional instructional support.

### Future AI Insights

Generate:

* Learning pattern summaries
* Suggested classroom interventions
* Parent engagement recommendations

---

## Current MVP

Implemented:

* Landing Page
* Teacher Dashboard
* Student List
* Risk Calculation Logic
* Next.js Frontend

Upcoming:

* Observation Forms
* Student Management
* Trend Analysis
* Authentication
* Database Integration
* AI Recommendations

---

## Technology Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

### Backend (Planned)

* Next.js Server Actions
* Supabase

### AI Layer (Planned)

* OpenAI API

### Deployment

* Vercel

---

## Project Structure

```text
learning-risk-platform
│
├── app
│   ├── dashboard
│   ├── students
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│
├── lib
│   └── risk-engine.ts
│
├── public
│
└── package.json
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Supreetkaur1/learning-risk-platform.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Risk Assessment Approach

Teachers provide ratings for:

* Reading Fluency
* Attention
* Following Instructions
* Writing Skills
* Numeracy Skills

These inputs are processed through a weighted scoring model to identify students who may require additional support.

The platform does not diagnose learning disorders and should not be considered a replacement for professional educational or psychological assessment.

---

## Future Roadmap

### Phase 1

* Observation Forms
* Student Profiles
* Risk Dashboard

### Phase 2

* Authentication
* Supabase Integration
* Historical Tracking

### Phase 3

* AI-Powered Recommendations
* Parent Reports
* Teacher Insights

### Phase 4

* School-Level Analytics
* Multi-Classroom Support
* District-Level Reporting

---

## Impact

Our goal is to help educators identify learning challenges earlier, intervene sooner, and ensure that every child receives the support they need before learning gaps become barriers to future opportunity.

---

## Author

Supreet Kaur

Software Development Engineer

