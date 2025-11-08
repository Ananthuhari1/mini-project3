import React from 'react';
import CarCard from './CarCard';
import UserNavbar from '../components/UserNavbar';

export default function UserPanel() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />

      <main className="flex-grow mt-15">
        <CarCard />
      </main>
    </div>
  );
}
