import React from 'react';
import { motion } from 'framer-motion';

export default function GearPage() {
  const deskSetupItems = [
    {
      name: 'Huawei Matebook D15',
      description: '10th Gen Intel Core i3.',
      image: '/gear/Huawei.png',
      link: 'https://consumer.huawei.com/ph/laptops/',
    },
    {
      name: 'Macbook Neo',
      description: '2408-by-1506 resolution.',
      image: '/gear/Macbook.png',
      link: 'https://www.apple.com/ph/macbook-neo/',
    },
    {
      name: 'Wireless Keyboard',
      description: 'Keychron B1 Pro is an ultra-slim wireless keyboard',
      image: '/gear/Wireless-keyboard.png',
      link: 'https://ecommerce.datablitz.com.ph/products/keychron-b1-pro-ultra-slim-compact-wireless-mechanical-keyboard-retro-red-b1p-k13',
    },
    {
      name: 'Wireless Mouse',
      description: 'Black wireless mouse.',
      image: '/gear/Wireless-mouse.png',
      link: 'https://us.shein.com/Upgrade-Your-Computer-Experience-With-A-Rechargeable-Wireless-Mouse-2-4GHz-Silent-Optical-Mouse-Suitable-For-Laptops-p-131668468.html?main_attr=27_601',
    },
    {
      name: 'Laptop Desk',
      description: 'mini Wooden Desk Study Table with Cup Holder & Card Slot',
      image: '/gear/Desk.png',
      link: 'https://www.lazada.com.ph/products/pdp-i15474739166-s133096848516.html?',
    },
    {
      name: 'Laptop Stand',
      description: '11-17 Inch Laptops (Black/Silver)',
      image: '/gear/Laptop-stand.png',
      link: 'https://www.lazada.com.ph/products/pdp-i4949876654-s28869881965.html?',
    },
  ];

  const everydayCarryItems = [
    {
      name: 'Samsung Galaxy A13',
      description: 'black — 6 GB RAM + 128 GB Storage.',
      image: '/gear/SamsungA13.png',
      link: '#',
    },
    {
      name: 'Samsung Galaxy A20',
      description: '2019, March 19. Released 2019, April 05',
      image: '/gear/A20.png',
      link: 'https://www.gsmarena.com/samsung_galaxy_a20-9640.php',
    },
    {
      name: 'XIAOMI Redmi Buds 6 Play',
      description: '36h Battery Life IPX4 Water Resistance',
      image: '/gear/Redmi.png',
      link: 'https://shopee.ph/product/605356043/23056137321',
    },
    {
      name: 'DECATHLON - Smart Watch',
      description: 'Multisport HRM smart watch - black',
      image: '/gear/Smart-watch.png',
      link: 'https://www.decathlon.ph/p/cw500-m-multisport-hrm-smart-watch-black-decathlon-8801200.html',
    },
    {
      name: 'Coffee Tumbler',
      description: 'Ceramic liner Stainless Steel',
      image: '/gear/Tumbler.png',
      link: 'https://shopee.ph/CIVAGO%EF%BC%8813oz%EF%BC%89Ceramic-liner-Stainless-Steel-Coffee-Mug-With-Lid-Vacuum-Flask-Hot-And-Cold-Tumbler-i.1049915107.26060889656',
    },
  ];

  const personalHygieneItems = [
    {
      name: 'Belo Sunscreen',
      description: 'UV protection and skin defense.',
      image: '/gear/Sunscreen.png',
      link: 'https://www.watsons.com.ph/belo-sunexpert-whitening-sunscreen-spf50-50ml/p/BP_50003280',
    },
    {
      name: 'Premium Cologne',
      description: 'Signature scent for daily freshness.',
      image: '/gear/prescripto.png',
      link: 'https://www.prescriptoperfume.com/products/mx18-our-version-of-k-c-black-kenneth-cole-black-for-men-edp',
    },
    {
      name: ' NIVEA Original Care Lip Balm',
      description: 'Sea butter & Natural oils',
      image: '/gear/LipBalm.png',
      link: 'https://www.watsons.com.ph/nivea-nivea-original-care-lip-balm-4.8g/p/BP_10026702',
    },
  ];

  const renderSection = (title, items) => (
    <div className="mb-16">
      <h2 
        className="text-xs font-semibold tracking-widest uppercase mb-8"
        style={{ color: 'var(--text-secondary)' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {items.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group rounded-xl border p-4 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-200 shadow-xs relative min-h-[240px] sm:min-h-[260px] md:min-h-[320px]"
            style={{ 
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {/* Pinalaki natin ang height container sa mobile (h-44) */}
            <div className="h-44 sm:h-40 md:h-60 w-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-36 sm:max-h-32 md:max-h-48 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x300?text=Gear';
                }}
              />
            </div>
            <div className="flex-grow flex flex-col justify-end">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 
                  className="text-xs md:text-sm font-normal transition-colors leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.name}
                </h3>
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
              <p 
                className="text-[10px] sm:text-[11px] md:text-xs leading-snug"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 pb-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 
            className="text-4xl font-normal tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Gear
          </h1>
          <p 
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            The hardware and tools I use to build, create, and stay productive — my desk setup, everyday carry, and personal care essentials.
          </p>
        </motion.div>

        {renderSection('DESK SETUP', deskSetupItems)}
        {renderSection('EVERYDAY CARRY', everydayCarryItems)}
        {renderSection('DAILY ESSENTIALS', personalHygieneItems)}
      </div>
    </div>
  );
}