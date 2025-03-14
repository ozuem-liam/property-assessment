"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react"; // Using lucide-react for a close icon

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300">
      <div
        ref={modalRef}
        className={`bg-white rounded-t-xl w-full h-[90vh] transform transition-transform duration-300 ease-in-out shadow-lg overflow-hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="w-8"></div>
          <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto"></div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(90vh-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlidingModal;