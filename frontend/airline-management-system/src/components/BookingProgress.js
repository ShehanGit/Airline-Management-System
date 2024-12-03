import React from 'react';

const BookingProgress = ({ currentStep }) => {
  const steps = ['Search', 'Select Flight', 'Passengers', 'Payment'];
  
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 h-1 bg-blue-600 transition-all duration-500 -z-10"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
              ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {index + 1}
            </div>
            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingProgress;