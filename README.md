# VisaPath

VisaPath is a modern B2C SaaS platform that allows digital nomads, frequent travelers, and expats to optimize their visa strategies. By logging their citizenship(s), VisaPath calculates the best global access map, optimizes multi-country travel routes using AI, and tracks embassy appointments globally.

Built with an ultra-premium "dark glassmorphism" aesthetic, it utilizes modern server-side rendering, AI integration for trip generation, and robust authentication.

## ✨ Features

- **Global Access Mapping:** Interactive 3D map rendering your absolute best visa status across 195 destinations based on all your combined citizenships.
- **AI Route Optimizer:** Input multi-country trip destinations and constraints; an LLM generates a mathematically optimized route, estimates visa costs, suggests transport, and plots the journey on an interactive path map.
- **Embassy Tracker:** Searchable database to track embassy statuses to find booking portals or contact information.
- **Multi-Passport Support:** Support for storing and cross-referencing multiple citizenships (e.g. Dual Citizens).
- **Pro Tiering:** Paywalls restricting specific complex AI queries to Pro/Team users, strictly enforced via edge-rate limiting logic in the API.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Components:** Radix UI primitives & Lucide React (Icons)
- **Database / Auth:** Supabase (PostgreSQL, Row Level Security)
- **AI Engine:** Llama 3 (via Groq API)
- **Map Engine:** MapTiler SDK

## 🚀 Getting Started

### Prerequisites

You need Node.js and `pnpm` installed.

### Environment Variables

Copy the example file and fill in your keys:
```bash
cp .env.example .env.local
```

| Variable | Description |
| ---- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public API URL for your Supabase instance |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public unprivileged API key for Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key for background job overriding RLS |
| `GROQ_API_KEY` | API key for LLaMA 3 access via Groq to power Route Optimization |
| `NEXT_PUBLIC_MAPTILER_KEY` | API key to render vector tiles for interactive world maps |

### Development

Install the dependencies using `pnpm`:

```bash
pnpm install
```

Start the Turbopack development server:

```bash
pnpm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

## 🗄️ Database Schema

The core Supabase Schema revolves around:
- `profiles` – Extended user metadata tied to `auth.users`, tracks `plan` tier.
- `user_passports` – 1-to-many relationship of a user ID mapping to country codes (e.g., USA, GBR).

*RLS (Row Level Security)* heavily secures these tables ensuring users can only read, insert, or delete their distinct rows.
