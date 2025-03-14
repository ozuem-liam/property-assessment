"use client";
import React, { useState } from "react";
import {
  PropertyProvider,
  useProperty,
} from "@/context/property-context/PropertyProvider";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlidingModal from "@/components/modals/SlidingModal";
import UpdateRateForm from "@/components/property/UpdatePropertyRate";
import SpinnerLoader from "@/components/modals/SpinnerLoader";

const PropertyDetailPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { propertyRespData } = useProperty();

  const handleModalState = () => {
    setModalIsOpen(!modalIsOpen);
  };

  if (!propertyRespData) {
    return (
      <div className="w-full h-[30vh] flex items-center justify-center">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {propertyRespData.propertyName}
      </h1>
      <p className="text-xl mb-2">
        Price: ${propertyRespData.price.basePrice} (
        {propertyRespData.price.airbnbPrice} on Airbnb)
      </p>
      <p className="text-lg mb-4">
        Address: {propertyRespData.address}, {propertyRespData.city},{" "}
        {propertyRespData.country}
      </p>

      {/* Image Carousel */}
      <div className="max-w-2xl mx-auto">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
          {propertyRespData.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Property Image ${index + 1}`}
                className="rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <button
        onClick={handleModalState}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
      >
        Update Property Rate
      </button>

      {/* Sliding Modal with Updated Form */}
      <SlidingModal isOpen={modalIsOpen} onClose={handleModalState}>
        <UpdateRateForm
          propertyRespData={propertyRespData}
          onClose={handleModalState}
        />
      </SlidingModal>
    </div>
  );
};

const PropertyPageWrapper = () => {
  return (
    <PropertyProvider>
      <PropertyDetailPage />
    </PropertyProvider>
  );
};

export default PropertyPageWrapper;
