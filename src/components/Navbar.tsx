"use client";
import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Bot, 
  Bell, 
  MessageCircle, 
  User 
} from 'lucide-react';

const Navbar = () => {
  const [activeItem] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: '', isLogo: true },
    { id: 'explore', icon: Search, label: '' },
    { id: 'llm', icon: Bot, label: '' },
    { id: 'notifications', icon: Bell, label: '' },
    { id: 'messages', icon: MessageCircle, label: '' },
  ];

  const profileItem = { id: 'profile', icon: User, label: 'Profile' };


  // Define the type for a navigation item
interface NavItemType {
  id: string;
  label: string;
  icon: React.ElementType; // Use React.ElementType for component props
  isLogo?: boolean; // Optional property
}

// Define the props for the NavItem component
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isProfile?: boolean; // You had this, keep it if it's used elsewhere
  handleItemClick: (id: string) => void; // Add this since it's used in onClick
}

const NavItem = ({ item, isActive, handleItemClick }: NavItemProps) => (
    <button
      onClick={() => handleItemClick(item.id)}
      className={`
        flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg
        transition-all duration-200 ease-in-out group relative
        ${isActive
          ? 'bg-gray-100 text-black'
          : 'text-gray-600 hover:bg-gray-50 hover:text-black'
        }
        ${item.isLogo ? 'mb-2' : ''}
        w-20 md:w-auto
      `}
    >
      <item.icon
        size={24}
        className={`
          ${item.isLogo ? 'text-black font-bold' : ''}
          ${isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'}
        `}
      />
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
      <div className="hidden md:flex flex-col h-screen w-32 bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
        {/* Main navigation items */}
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              item={item}
              isActive={activeItem === item.id} handleItemClick={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          ))}
        </div>
        
        {/* Profile at bottom */}
        <div className="mt-auto">
          <NavItem 
            item={profileItem}
            isActive={activeItem === profileItem.id}
            isProfile={true} handleItemClick={function (): void {
              throw new Error('Function not implemented.');
            } }          />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              item={item}
              isActive={activeItem === item.id} handleItemClick={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          ))}
          <NavItem 
            item={profileItem}
            isActive={activeItem === profileItem.id}
            isProfile={true} handleItemClick={function (): void {
              throw new Error('Function not implemented.');
            } }          />
        </div>
      </div>

      {/* Demo Content Area */}
      <div className="md:ml-64 p-6 pb-20 md:pb-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Social Media Dashboard</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">
            Currently viewing: {navItems.find(item => item.id === activeItem)?.label || profileItem.label}
          </h2>
          <p className="text-gray-600">
            This is your main content area. The navbar is responsive - on desktop it appears as a sidebar on the left, 
            and on mobile it transforms into a bottom navigation bar.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">
              Try resizing your browser window or viewing on mobile to see the responsive behavior!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;