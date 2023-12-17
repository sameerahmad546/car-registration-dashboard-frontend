import React, { useContext, useState } from 'react';
import { UserContext } from '../store/states';

const CarAddForm = () => {
  const { carRows,setCarRows } = useContext(UserContext)
  const [carData, setCarData] = useState({
    category: '',
    model: '',
    color: '',
    make: '',
    registration_number: '',
  });

  const authToken = JSON.parse(localStorage.getItem('token')).token
  const requestOptions = { //prepare request options e.g header, body etc
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "x-api-key": "8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD",
          Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(carData)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/car/add-car',requestOptions)
    const result = await response.json()
    const car = result.car
    car.id = car._id // Set id variable in car object because Data grid MUI needs 'id' key in its object 
    setCarRows([...carRows, car]) //append new car to existing list
    setCarData({
      category: '',
      model: '',
      color: '',
      make: '',
      registration_number: '',
    });
  };

  return (
    <div className="max-w-lg  ml-2 p-6 bg-gray-100 rounded-lg shadow-lg border-solid border-gray-300 border-2">
      <h2 className="text-2xl font-semibold mb-5">Add Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="suv">SUV</option>
            <option value="sedan">Sedan</option>
            <option value="bus">Bus</option>
            <option value="hatchback">Hatchback</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-semibold mb-2">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carData.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carData.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="make" className="block text-gray-700 font-semibold mb-2">
            Make
          </label>
          <input
            type="text"
            id="make"
            name="make"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carData.make}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="registrationNumber" className="block text-gray-700 font-semibold mb-2">
            Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registration_number"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carData.registration_number}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarAddForm;
