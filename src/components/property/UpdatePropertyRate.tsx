"use client";
import { PROPERTY_ID } from "@/api/constant";
import { useProperty } from "@/context/property-context/PropertyProvider";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SpinnerLoader from "../modals/SpinnerLoader";
import { IProperty } from "@/api/property/types";

const UpdateRateForm = ({
  propertyRespData,
  onClose,
}: {
  propertyRespData: IProperty;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [dateFrequency, setDateFrequency] = useState("single");
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [newRate, setNewRate] = useState(
    propertyRespData?.price?.basePrice || ""
  );
  const { updatePropertySingleRate, updatePropertyMultipleRate } =
    useProperty();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Use regex to allow only numbers (including decimals)
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(inputValue)) {
      // If the input is valid, update the state
      setNewRate(inputValue === "" ? "" : Number(inputValue));
    }
  };

  const handleDateFrequencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDateFrequency(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    // Here you would send the data to your API
    if (dateFrequency === "single" && singleDate) {
      // Create payload based on selection
      const payload = {
        propertyId: PROPERTY_ID,
        newRate: Number(newRate),
        date: singleDate,
      };
      await updatePropertySingleRate(payload);
    } else if (startDate && endDate) {
      // Create payload based on selection
      const payload = {
        propertyId: PROPERTY_ID,
        newRate: Number(newRate),
        startDate,
        endDate,
      };
      await updatePropertyMultipleRate(payload);
    }
    setLoading(false);
    onClose();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Property Rate</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dateFrequency"
            className="block text-sm font-medium text-gray-700"
          >
            Select Date Frequency
          </label>
          <select
            id="dateFrequency"
            name="dateFrequency"
            value={dateFrequency}
            onChange={handleDateFrequencyChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </div>

        {/* Date Picker that changes based on selection */}
        <div>
          <label
            htmlFor="datePicker"
            className="block text-sm font-medium text-gray-700"
          >
            {dateFrequency === "single" ? "Select Date" : "Select Date Range"}
          </label>

          {dateFrequency === "single" ? (
            <DatePicker
              selected={singleDate}
              onChange={(date) => setSingleDate(date)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
            />
          ) : (
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              placeholderText="Select date range"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="newRate"
            className="block text-sm font-medium text-gray-700"
          >
            New Rate ($)
          </label>
          <input
            type="text"
            id="newRate"
            name="newRate"
            value={newRate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? <SpinnerLoader /> : " Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRateForm;
