# EV Charging Cost & Savings Calculator

A web application that helps Tesla owners compare their EV charging costs versus traditional petrol car expenses.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** for data visualization
- **localStorage** for data persistence

## Features

- **Interactive Input Form**: Enter your electricity costs, Tesla efficiency, petrol prices, and driving habits
- **Real-time Calculations**: Instantly see cost comparisons and savings
- **Visual Analytics**: 
  - Bar chart comparing monthly EV vs petrol costs
  - Line chart showing 5-year cumulative savings projection
- **Data Persistence**: Your inputs are automatically saved to localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
ECCS/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with state management
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── InputForm.tsx       # User input form component
│   ├── ResultsSummary.tsx  # Results display cards
│   └── SavingsChart.tsx    # Charts for cost comparison and projections
├── types/
│   └── calculator.ts       # TypeScript type definitions
├── utils/
│   └── calculations.ts     # All calculation logic and utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Calculations

### EV Cost per Mile
```
EV cost per mile = (Wh per mile / 1000) × electricity cost
```

### Petrol Cost per Mile
```
Petrol cost per mile = (petrol price per litre × 4.546) / MPG
```
*Note: 4.546 litres = 1 UK gallon*

### Monthly and Annual Savings
```
Monthly savings = Monthly petrol cost - Monthly EV cost
Annual savings = Monthly savings × 12
```

## Default Values

- **Home Electricity Cost**: £0.24/kWh
- **Public Charging Cost**: £0.45/kWh
- **Tesla Efficiency**: 250 Wh/mile (Model 3 average)
- **Petrol Car MPG**: 40 MPG
- **Petrol Price**: £1.45/litre
- **Miles Per Month**: 800 miles

## Build for Production

```bash
npm run build
npm start
```

## Notes

- No backend or authentication required for v1
- All data stored locally in browser
- Calculations are estimates based on user inputs
- UK measurements and currency (£, litres, MPG)

## Future Enhancements

Potential features for future versions:
- Multiple vehicle profiles
- Tax and insurance cost comparisons
- Export results as PDF
- Share results via URL
- Dark mode support
- Cloud sync with user accounts
