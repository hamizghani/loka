"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bot,
  Bell,
  MessageCircle,
  User
} from 'lucide-react';
 
const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');
 
  const navItems = [
    { id: 'home', label: '', isLogo: true },
    { id: 'explore', icon: Search, label: '' },
    { id: 'llm', icon: Bot, label: '' },
    { id: 'notifications', icon: Bell, label: '' },
    { id: 'messages', icon: MessageCircle, label: '' },
  ];
 
  const profileItem = { id: 'profile', icon: User, label: '' };
 
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };
 
  interface NavItemType {
    id: string;
    label: string;
    icon?: React.ElementType;
    isLogo?: boolean;
  }
 
  interface NavItemProps {
    item: NavItemType;
    isActive: boolean;
    isProfile?: boolean;
    noHoverBg?: boolean;
  }
 
  const NavItem = ({ item, isActive, noHoverBg = false }: NavItemProps) => (
    <button
      onClick={() => handleItemClick(item.id)}
      className={`
        flex items-center justify-center gap-3 p-3 rounded-lg
        transition-all duration-200 ease-in-out group relative
        cursor-pointer /* Added this line */
        ${item.isLogo ? 'mb-2' : ''}
 
        ${/* Desktop specific width and alignment */''}
        md:w-auto md:justify-start
 
        ${/* Mobile specific width to ensure centering */''}
        w-full
 
        ${/* Conditional styling based on noHoverBg */''}
        ${noHoverBg
          ? `
              ${/* For logo: only scale on hover/active, no background/shadow */''}
              ${isActive ? 'scale-105' : ''}
              group-hover:scale-105
            `
          : `
              ${/* For other items: scale, shadow, and background */''}
              hover:scale-105 hover:shadow-md
              ${isActive
                ? 'bg-gray-100 text-black scale-105'
                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }
            `
        }
      `}
    >
      {item.isLogo ? (
        <div className="transition-transform duration-200 ease-in-out group-hover:scale-110">
          <Image
            src="/images/loka-logo.png"
            alt="Logo"
            width={24}
            height={24}
            className={`
              ${isActive ? 'scale-110' : ''}
            `}
          />
        </div>
      ) : (
        item.icon && (
          <item.icon
            size={24}
            className={`
              transition-transform duration-200 ease-in-out
              group-hover:scale-110
              ${isActive ? 'text-black scale-110' : 'text-gray-600 group-hover:text-black'}
            `}
          />
        )
      )}
      <span className={`
        hidden md:block font-medium
        ${item.isLogo ? 'text-lg font-bold text-black' : ''}
        ${isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'}
      `}>
        {item.label}
      </span>
 
      {/* Mobile label tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden pointer-events-none whitespace-nowrap">
        {item.label}
      </div>
    </button>
  );
 
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-20 bg-white border-r border-gray-200 fixed left-0 top-0 p-3">
        {/* Main navigation items */}
        <div className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              noHoverBg={item.id === 'home'}
            />
          ))}
        </div>
 
        {/* Profile at bottom */}
        <div className="mt-auto">
          <NavItem
            item={profileItem}
            isActive={activeItem === profileItem.id}
            isProfile={true}
          />
        </div>
      </div>
 
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              noHoverBg={item.id === 'home'}
            />
          ))}
          <NavItem
            item={profileItem}
            isActive={activeItem === profileItem.id}
            isProfile={true}
          />
        </div>
      </div>
    </>
  );
};
 
export default Navbar;