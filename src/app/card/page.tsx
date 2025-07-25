// app/your-page/page.tsx

import React from 'react';
import CulturalCard from '@/components/Culturalcards';  

export default function YourPage() {
  return (
    <div>
      <CulturalCard cardNumber={2} /> {/* Pass the card number as a prop */}
    </div>
  );
}
