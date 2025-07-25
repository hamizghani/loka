"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function CulturalCard({ 
  cardNumber = 1,
  name = "John Doe",
  age = 25,
  ethnicity = "Javanese",
  description = "A traditional craftsman from Central Java who specializes in batik making and has been preserving cultural heritage for over 10 years."
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Generate deterministic values based on cardNumber to avoid hydration mismatch
  const generateDeterministicNumber = (seed: number, min: number, max: number): number => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  const cardId1 = generateDeterministicNumber(cardNumber * 1234, 1000, 9999);
  const cardId2 = generateDeterministicNumber(cardNumber * 5678, 1000, 9999);
  const cardId3 = generateDeterministicNumber(cardNumber * 9012, 1000, 9999);
  const barcodeId = generateDeterministicNumber(cardNumber * 3456, 10000000, 99999999);
  const footerId = generateDeterministicNumber(cardNumber * 7890, 10000000, 99999999);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      setIsFlipping(false);
    }, 300);
  };

  // Crop settings for 1728x1080 image, e.g., show center 60% width and 70% height
  // You can adjust objectPosition as needed for your desired crop
  const cropStyle = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    objectPosition: 'center center',
    // Optionally, you can use a container with aspect ratio to crop further
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Main card container */}
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] mx-8">
        <div className="relative w-full h-full perspective-1000">
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Side */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/image36.png"
                  alt="Cultural card front"
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                  style={{
                    objectFit: 'cover' as const,
                    width: '100%',
                    height: '100%',
                    objectPosition: 'center center' as const,
                  }}
                  onClick={handleFlip}
                />
                
                {/* Click indicator overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                      <ChevronRight className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side - Show same image as front, cropped */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180" style={{ transform: 'rotateY(180deg) scaleX(-1)' }}>
              <img
                src="/images/image36.png"
                alt="Cultural card back"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
                style={{
                  objectFit: 'cover' as const,
                  width: '100%',
                  height: '100%',
                  objectPosition: 'center center' as const,
                  transform: 'rotateY(180deg) scaleX(-1)'
                }}
              />
              {/* Back content overlay */}
              <div className="relative w-full h-full p-8 flex flex-col justify-between text-white">
                {/* Header */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-mono text-gray-300 mb-2">Cultural Card Number</h3>
                    <div className="text-2xl font-mono tracking-wider text-white">
                      {String(cardNumber).padStart(4, '0')} {cardId1} {cardId2} {cardId3}
                    </div>
                  </div>
                </div>
                {/* Main content */}
                <div className="flex-1 flex items-start justify-between pt-8">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-purple-300">Name:</div>
                      <div className="text-xl text-white">{name}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-purple-300">Age:</div>
                      <div className="text-xl text-white">{age} years old</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-purple-300">Ethnicity:</div>
                      <div className="text-xl text-white">{ethnicity}</div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <div className="text-lg font-semibold text-purple-300">Description:</div>
                      <div className="text-base text-gray-200 leading-relaxed max-w-md">
                        {description}
                      </div>
                    </div>
                  </div>
                  {/* Barcode */}
                  <div className="flex flex-col items-end space-y-1 ml-8">
                    <div className="text-xs text-gray-400 mb-2">{barcodeId}</div>
                    {Array.from({ length: 15 }, (_, i) => (
                      <div 
                        key={i}
                        className="bg-white h-2 rounded-sm"
                        style={{ 
                          width: `${generateDeterministicNumber(cardNumber * (i + 1), 0, 1) > 0.5 ? 4 : 2}px`,
                          marginBottom: '1px'
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Footer */}
                <div className="text-center text-xs text-gray-400 border-t border-gray-700 pt-4">
                  © 2025 LOKA Corporations. All rights reserved. {footerId}
                </div>
                {/* Click to flip back */}
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleFlip}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={handleFlip}
          className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center gap-2"
        >
          <span>{isFlipped ? 'Show Front' : 'Show Back'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}