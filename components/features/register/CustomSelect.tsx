"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}

export function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="custom-select-container">
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? "text-muted" : ""}>{value || placeholder}</span>
        <span className={`arrow ${isOpen ? "arrow-up" : ""}`}></span>
      </button>
      {isOpen && (
        <div className="custom-select-options" data-lenis-prevent onWheel={(e) => e.stopPropagation()}>
          {options.map((opt) => (
            <div
              key={opt}
              className={`custom-select-option ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
