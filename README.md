# Convergent Car Dealership

A modern, responsive web application for browsing and financing vehicles. Built with React and TailwindCSS, featuring real-time sorting, detailed car information, and an interactive loan calculator.

<img width="1728" alt="image" src="https://github.com/user-attachments/assets/c6dcfce2-ac27-4786-843e-29b2af20f3da" />

## Features

- **Interactive Car Catalog**: Browse through an extensive collection of vehicles with a responsive grid layout
- **Advanced Sorting**: Sort vehicles by multiple criteria including make, model, year, price, and more
- **Detailed Vehicle Information**: View comprehensive details about each vehicle including specifications, VIN, and description
- **Finance Calculator**: Calculate monthly payments with customizable:
  - Down payment
  - Interest rate
  - Loan terms (36-84 months)
- **Real-time Updates**: Dynamic content updates without page reloads
- **Responsive Design**: Optimized for both desktop and mobile viewing

## Technical Stack

- **Frontend Framework**: React.js with Hooks
- **Styling**: TailwindCSS
- **State Management**: React useState and useEffect
- **API Integration**: RESTful API consumption
- **Modal System**: Custom modal implementation with backdrop blur effects

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/convergent-car-dealership.git
```

2. Navigate to the project directory:
```bash
cd convergent-car-dealership
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

The application interacts with the following endpoints:

- `GET /cars/sort?direction={asc|desc}&key={sortKey}`: Fetch sorted list of cars
- `GET /car/{id}`: Fetch detailed information about a specific car

## Component Structure

- **Home**: Main component containing the application logic
- **FinanceModal**: Handles car financing calculations
- **Car Grid**: Displays the vehicle catalog
- **Car Details Modal**: Shows detailed information about selected vehicles

## Features In Detail

### Sorting System
- Ascending/Descending order options
- Multiple sorting criteria:
  - Make
  - Model
  - Year
  - Price
  - Mileage
  - Condition
  - Fuel Type
  - Transmission
  - Color

### Finance Calculator
- Real-time calculation of monthly payments
- Comprehensive loan details including:
  - Principal amount
  - Total interest
  - Total cost
- Error handling for invalid inputs
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- Design inspired by modern car dealership websites
- Built with accessibility and user experience in mind
- Optimized for performance and scalability
