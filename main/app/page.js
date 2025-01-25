"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('asc');
  const [selectedSort, setSelectedSort] = useState('make');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortOptions = [
    { value: 'make', label: 'Make' },
    { value: 'model', label: 'Model' },
    { value: 'year', label: 'Year' },
    { value: 'price', label: 'Price' },
    { value: 'mileage', label: 'Mileage' },
    { value: 'condition', label: 'Condition' },
    { value: 'fuel_type', label: 'Fuel Type' },
    { value: 'transmission', label: 'Transmission' },
    { value: 'color', label: 'Color' }
  ];

  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [financeDetails, setFinanceDetails] = useState({
    vehiclePrice: 0,
    downPayment: '',
    interestRate: '3.5',
    loanTerm: 60,
  });
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // Handle finance click from car card/modal
  const handleFinanceClick = (car) => {
    setSelectedCar(car);
    setFinanceDetails({
      ...financeDetails,
      vehiclePrice: car.price,
      downPayment: '',
    });
    setMonthlyPayment(null);
    setIsFinanceModalOpen(true);
  };

  // Reset modal state
  const handleCloseFinanceModal = () => {
    setIsFinanceModalOpen(false);
    setFinanceDetails({
      vehiclePrice: 0,
      downPayment: '',
      interestRate: '3.5',
      loanTerm: 60,
    });
    setMonthlyPayment(null);
  };

  // Calculate monthly payments with error handling
  const calculateMonthlyPayment = () => {
    try {
      const principal = financeDetails.vehiclePrice - (parseFloat(financeDetails.downPayment) || 0);
      if (principal <= 0) {
        alert('Down payment cannot exceed vehicle price');
        return;
      }

      const monthlyRate = (parseFloat(financeDetails.interestRate) || 0) / 100 / 12;
      if (monthlyRate <= 0) {
        alert('Please enter a valid interest rate');
        return;
      }

      const numberOfPayments = financeDetails.loanTerm;
      
      const payment = 
        principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      if (isNaN(payment) || !isFinite(payment)) {
        alert('Please check your inputs and try again');
        return;
      }

      setMonthlyPayment(payment);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred while calculating. Please check your inputs.');
    }
  };

  // Finance Modal Component
  const FinanceModal = () => (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleCloseFinanceModal}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-2xl p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Finance Calculator
            </h2>
            {selectedCar && (
              <p className="text-lg text-gray-600 mt-1">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </p>
            )}
          </div>
          <button 
            onClick={handleCloseFinanceModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Calculator Form */}
        <div className="space-y-8">
          {/* Vehicle Price Display */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Vehicle Price</label>
            <div className="text-2xl font-bold text-emerald-600">
              ${financeDetails.vehiclePrice.toLocaleString()}
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Down Payment */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Down Payment</label>
              <input
                type="text"
                defaultValue={financeDetails.downPayment}
                onBlur={(e) => {
                  setFinanceDetails({
                    ...financeDetails,
                    downPayment: e.target.value
                  });
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                placeholder="Enter amount"
              />
            </div>
            {/* Interest Rate */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Interest Rate (%)</label>
              <input
                type="text"
                defaultValue={financeDetails.interestRate}
                onBlur={(e) => {
                  setFinanceDetails({
                    ...financeDetails,
                    interestRate: e.target.value
                  });
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                placeholder="Enter rate"
              />
            </div>
            {/* Loan Term */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Loan Term</label>
              <select
                value={financeDetails.loanTerm}
                onChange={(e) => setFinanceDetails({
                  ...financeDetails,
                  loanTerm: Number(e.target.value)
                })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg bg-white"
              >
                <option value={36}>3 Years (36 months)</option>
                <option value={48}>4 Years (48 months)</option>
                <option value={60}>5 Years (60 months)</option>
                <option value={72}>6 Years (72 months)</option>
                <option value={84}>7 Years (84 months)</option>
              </select>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateMonthlyPayment}
            className="w-full py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-lg font-medium"
          >
            Calculate Payment
          </button>

          {/* Results Section */}
          {monthlyPayment !== null && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-700">Monthly Payment</h3>
                <p className="text-3xl font-bold text-emerald-600">
                  ${monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Principal Amount:</span>
                  <span className="font-medium">
                    ${(financeDetails.vehiclePrice - (parseFloat(financeDetails.downPayment) || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-medium">
                    ${((monthlyPayment * financeDetails.loanTerm) - (financeDetails.vehiclePrice - (parseFloat(financeDetails.downPayment) || 0))).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span>Total Cost:</span>
                  <span className="font-medium">
                    ${(monthlyPayment * financeDetails.loanTerm).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const handleCarClick = async (car) => {
    try {
      // Close any open dropdowns
      setIsOrderDropdownOpen(false);
      setIsSortDropdownOpen(false);
      
      // Fetch and show car details
      const res = await fetch(`https://dealership.naman.zip/car/${car.id}`);
      const carDetails = await res.json();
      setSelectedCar(carDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsOrderDropdownOpen(false);
        setIsSortDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchSortedCars() {
      try {
        const res = await fetch(
          `https://dealership.naman.zip/cars/sort?direction=${selectedOrder}&key=${selectedSort}`
        );
        const json = await res.json();
        setCars(json);
      } catch (error) {
        console.error("Error fetching sorted cars:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSortedCars();
  }, [selectedOrder, selectedSort]);

  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">      
        <h1 className="pt-10 text-4xl pb-6 text-center">Convergent Car Dealership</h1>
        <div className="flex justify-between rounded-3xl gap-10 bg-black text-white p-2 px-4">
          {/* Order Dropdown */}
          <div className="relative pl-10 dropdown-container">
            <button 
              onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
              className="focus:outline-none"
            >
              Order
            </button>
            {isOrderDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedOrder('asc');
                      setIsOrderDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 flex justify-between items-center"
                  >
                    Ascending
                    {selectedOrder === 'asc' && (
                      <span className="text-emerald-600">✓</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder('desc');
                      setIsOrderDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 flex justify-between items-center"
                  >
                    Descending
                    {selectedOrder === 'desc' && (
                      <span className="text-emerald-600">✓</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative pr-10 dropdown-container">
            <button 
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="focus:outline-none"
            >
              Sort by
            </button>
            {isSortDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedSort(option.value);
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 flex justify-between items-center"
                    >
                      {option.label}
                      {selectedSort === option.value && (
                        <span className="text-emerald-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
        {isLoading ? (
          <p>Loading cars...</p>
        ) : (
          cars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white border rounded-lg p-4 cursor-pointer shadow-sm
                        hover:shadow-md transition-all duration-300"
            >
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => handleCarClick(car)}
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {car.make} {car.model}
              </h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-emerald-600 font-semibold">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Year: {car.year}
                </p>
              </div>
            </div>
          ))          
        )}
      </div>
      {isModalOpen && selectedCar && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl w-[60vw] h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <img 
                src={selectedCar.image} 
                alt={`${selectedCar.make} ${selectedCar.model}`}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/70 to-black/90" />
            </div>

            {/* Content Container */}
            <div className="relative h-full p-10 flex flex-col">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-white">
                    {selectedCar.year} {selectedCar.make} {selectedCar.model}
                  </h2>
                  <div className="flex items-center gap-6">
                    <p className="text-2xl font-semibold text-emerald-400">
                      ${selectedCar.price.toLocaleString()}
                    </p>
                    
                    <p className="text-lg text-gray-300">
                      {selectedCar.mileage.toLocaleString()} miles
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Content - Right Aligned */}
              <div className="ml-auto w-1/2 mt-12 space-y-10">
                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                  {[
                    { label: 'Condition', value: selectedCar.condition },
                    { label: 'Fuel Type', value: selectedCar.fuel_type },
                    { label: 'Transmission', value: selectedCar.transmission },
                    { label: 'Color', value: selectedCar.color }
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-2">
                      <p className="text-gray-400 font-medium">{label}</p>
                      <p className="text-white text-lg">{value}</p>
                    </div>
                  ))}
                </div>

                {/* VIN */}
                <div className="space-y-2">
                  <p className="text-gray-400 font-medium">VIN</p>
                  <p className="text-white font-mono tracking-wider">{selectedCar.vin}</p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-gray-400 font-medium">Description</p>
                  <p className="text-gray-200 leading-relaxed line-clamp-6">
                    {selectedCar.description}
                  </p>
                </div>
                <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(false);
                        handleFinanceClick(selectedCar);
                      }}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Calculate Financing
                    </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
      {isFinanceModalOpen && <FinanceModal />}
    </div>
  );
}