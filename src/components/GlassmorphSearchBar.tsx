"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, Mic, Camera } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

interface AdvancedSearchBarProps extends SearchBarProps {
  suggestions?: string[];
}

const GlassmorphSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  
  const phrases = [
    "more about toraja",
    "cultural places on bandung", 
    "anything cultural"
  ];

  useEffect(() => {
    if (hasUserTyped) return;

    const currentPhrase = phrases[currentPhraseIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Finished typing current phrase
        if (currentPhraseIndex < phrases.length - 1) {
          // Wait before starting to delete
          timeoutId = setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
        // If it's the last phrase, keep it forever
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Finished deleting, move to next phrase
        setPhraseIndex(currentPhraseIndex + 1);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, currentPhraseIndex, isTyping, hasUserTyped]);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!hasUserTyped && e.target.value.length > 0) {
      setHasUserTyped(true);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setHasUserTyped(true);
  };

  return (
      <div className="relative w-19/20 mx-auto mt-4">
        <div className={`relative backdrop-blur-md bg-white/20 border rounded-xl transition-all duration-300 ${
          isFocused ? 'border-red-200 shadow-md shadow-red-500/20 bg-white/30 scale-105' : 'border-white/30 shadow-lg hover:shadow-xl'
        }`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            placeholder={hasUserTyped ? "Search anything..." : displayText}
            className="w-full pl-10 pr-14 py-3 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-base"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <button type="button" className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white/10 rounded-md transition-all">
              <Mic className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white/10 rounded-md transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default GlassmorphSearchBar;