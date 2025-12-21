"use client";

import ClientPartnersSlider from '../../components/sections/PartnersSection';
import Link from 'next/link';

export default function PartnersSection() {
  return (
    <section aria-labelledby="partners-heading" className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       

        <div className="mt-8">
          <ClientPartnersSlider />
        </div>

      
      </div>
    </section>
  );
}
