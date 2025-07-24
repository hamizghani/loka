"use client";

import Image from 'next/image';
import { useState } from 'react';

interface PopularItem {
  id: number;
  image: string;
  label: string;
  category?: string;
}

interface PopularContentProps {
  items?: PopularItem[];
}

const defaultItems: PopularItem[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&h=400&fit=crop", label: "Tech Trends", category: "Technology" },
  { id: 2, image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop", label: "Startup Stories", category: "Business" },
  { id: 3, image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=400&fit=crop", label: "Code Reviews", category: "Programming" },
  { id: 4, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop", label: "Design Tips", category: "Design" },
  { id: 5, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop", label: "Team Building", category: "Collaboration" },
  { id: 6, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop", label: "Career Growth", category: "Professional" }
];

export default function PopularContent({ items = defaultItems }: PopularContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;
  const maxIndex = Math.max(0, items.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Cards Container */}
      <div className="flex gap-6 p-6">
        {items.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
          <div 
            key={item.id}
            className="group relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
            style={{
              width: '300px',
              height: '400px',
              transform: `translateX(${index * -20}px)`,
              zIndex: itemsToShow - index
            }}
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.label}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-110"
            />
            
            {/* Always visible overlay with label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
              {/* Label - always visible */}
              <div className="p-3 text-white">
                <div className="text-base font-bold mb-1 drop-shadow-lg">{item.label}</div>
                {item.category && (
                  <div className="text-sm text-gray-100 drop-shadow-md">{item.category}</div>
                )}
              </div>
            </div>
            
            {/* Hover overlay for additional interaction */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}