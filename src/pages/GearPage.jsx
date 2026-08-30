import React from 'react';
import { motion } from 'framer-motion';

export default function GearPage() {
  const deskSetupItems = [
    {
      name: 'Huawei Matebook D15 i3',
      description: '10th Gen Intel Core i3.',
      image: '/gear/Huawei.png',
      link: '#',
    },
    {
      name: 'Macbook Neo',
      description: '2408-by-1506 resolution.',
      image: '/gear/Macbook.png',
      link: '#',
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
      link: 'https://www.lazada.com.ph/products/pdp-i15474739166-s133096848516.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253Alaptop%252Btable%252Bfoldable%252Bwhite%253Bnid%253A15474739166%253Bsrc%253ALazadaMainSrp%253Brn%253Adb632efebdc162beb9c4d4f9280affd3%253Bregion%253Aph%253Bsku%253A15474739166_PH%253Bprice%253A512.54%253Bclient%253Adesktop%253Bsupplier_id%253A501823840405%253Bsession_id%253A%253Bbiz_source%253Ah5_internal%253Bslot%253A22%253Butlog_bucket_id%253A470687%253Basc_category_id%253A22818%253Bitem_id%253A15474739166%253Bsku_id%253A133096848516%253Bshop_id%253A6012805%253BtemplateInfo%253A107881_C_E%2523-1_A3%2523&freeshipping=1&fs_ab=2&fuse_fs=&lang=en&location=Bulacan&price=512.54&priceCompare=skuId%3A133096848516%3Bsource%3Alazada-search-voucher%3Bsn%3Adb632efebdc162beb9c4d4f9280affd3%3BoriginPrice%3A51254%3BdisplayPrice%3A51254%3BisGray%3Afalse%3BsinglePromotionId%3A900001279227143%3BsingleToolCode%3AmillionSubsidy%3BvoucherPricePlugin%3A0%3Btimestamp%3A1788066504084&ratingscore=5.0&request_id=db632efebdc162beb9c4d4f9280affd3&review=21&sale=75&search=1&source=search&spm=a2o4l.searchlist.list.22&stock=1',
    },
    {
      name: 'Laptop Stand',
      description: '11-17 Inch Laptops (Black/Silver)',
      image: '/gear/Laptop-stand.png',
      link: 'https://www.lazada.com.ph/products/pdp-i4949876654-s28869881965.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253Ablack%252Brotating%252Blaptop%252Bstand%253Bnid%253A4949876654%253Bsrc%253ALazadaMainSrp%253Brn%253Aa7bc3d10fa99f037d72064956b66c63d%253Bregion%253Aph%253Bsku%253A4949876654_PH%253Bprice%253A960%253Bclient%253Adesktop%253Bsupplier_id%253A1000022085%253Bsession_id%253A%253Bbiz_source%253Ah5_internal%253Bslot%253A2%253Butlog_bucket_id%253A470687%253Basc_category_id%253A10529%253Bitem_id%253A4949876654%253Bsku_id%253A28869881965%253Bshop_id%253A201018%253BtemplateInfo%253A107881_E%2523-1_A3_C%2523&freeshipping=1&fs_ab=2&fuse_fs=&lang=en&location=Metro%20Manila~Manila&price=9.6E%202&priceCompare=skuId%3A28869881965%3Bsource%3Alazada-search-voucher%3Bsn%3Aa7bc3d10fa99f037d72064956b66c63d%3BoriginPrice%3A96000%3BdisplayPrice%3A96000%3BisGray%3Afalse%3BsinglePromotionId%3A-1%3BsingleToolCode%3AmockedSalePrice%3BvoucherPricePlugin%3A0%3Btimestamp%3A1788067037772&ratingscore=5.0&request_id=a7bc3d10fa99f037d72064956b66c63d&review=1&sale=2&search=1&source=search&spm=a2o4l.searchlist.list.2&stock=1',
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
      <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {items.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-transparent rounded-xl border border-gray-200 p-6 md:p-8 flex flex-col justify-between hover:border-gray-300 transition-all duration-200 shadow-xs relative min-h-[260px] md:min-h-[320px]"
          >
            <div className="h-40 md:h-60 w-full flex items-center justify-center mb-4 md:mb-6 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-32 md:max-h-48 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x300?text=Gear';
                }}
              />
            </div>
            <div className="flex-grow flex flex-col justify-end">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xs md:text-sm font-normal text-gray-900 transition-colors leading-tight">
                  {item.name}
                </h3>
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
              <p className="text-[11px] md:text-xs text-gray-500 leading-snug">{item.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-normal tracking-tight text-gray-900 mb-4">
            Gear
          </h1>
          <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
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