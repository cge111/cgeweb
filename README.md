# CGE Business Energy Services

An interactive, high-fidelity landing page and corporate utility savings suite built for **Commercial Gas & Electricity Ltd (CGE)**, a leading UK business energy brokerage. 

This platform empowers commercial enterprises to audit active tariffs, estimate wholesale energy savings, configure multi-site consolidations, and manage incoming inquiries.

---

## 🚀 Core Features

### 1. 📊 Interactive Savings Calculator
- Simulates commercial electricity, gas, and dual-fuel tariffs against negotiated wholesale market rates.
- Supports customizable consumption values, current supplier benchmarks, and custom standing charge adjustments.

### 2. 🔍 AI-Powered Bill Analyzer
- Features a secure simulation engine that extracts billing rates, current suppliers, contract terms, and consumption nodes.
- Highlights overcharge risks (e.g., standard variable rate trap, rollover penalties) and provides side-by-side comparative matrices.

### 3. 🏢 Multi-Site Consolidation Engine
- Simulates bulk procurement discounts for organizations operating multiple outlets, logistics warehouses, or premises.
- Groups separate meters into a single negotiated corporate contract to maximize discount percentage and streamline billing.

### 4. 📞 Professional Lead Capture Forms
- Form wizard captures multi-step requirements securely.
- Offers instant WhatsApp routing and direct, automated lead references.

### 5. 💼 CRM Lead Management Portal
- Administrative dashboard to manage incoming broker leads, track deal pipelines, and update contract statuses in real time.
- Displays key performance indicators, including Total Portfolio Value, Secured Savings, and Estimated Supplier Commissions.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18+ with Vite
- **Language:** TypeScript (Strict typing for robust lead models)
- **Styling:** Tailwind CSS (Custom color schemes, responsive layouts, Swiss corporate typography pairings)
- **Animations:** Motion (`motion/react`) for smooth micro-interactions, modal transitions, and scanner effects
- **Icons:** Lucide React

---

## ⚙️ Local Development Setup

To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed, and then follow these steps:

### 1. Clone & Install Dependencies
First, export this project using the **Settings** menu in Google AI Studio, then navigate to your project directory and install the required dependencies:
```bash
npm install
```

### 2. Set Up Environment Variables (Optional)
If you require custom configurations, copy the example environment file:
```bash
cp .env.example .env
```

### 3. Start the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

### 4. Build for Production
To bundle the application for production:
```bash
npm run build
```
Vite will output the optimized, compiled assets to the `/dist` directory, ready to be served or deployed to any static hosting provider (e.g., GitHub Pages, Netlify, Vercel, or Cloud Run).

---

## 🛡️ License & GDPR Compliance
This application conforms to direct GDPR guidelines for commercial processing under ICO UK frameworks. No real corporate or personal information is transmitted or processed without user consent.
