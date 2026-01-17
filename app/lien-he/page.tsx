'use client';

import { Mail, Phone, MapPin, Clock, Facebook, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const contactInfo = {
    name: process.env.NEXT_PUBLIC_CENTER_NAME || 'Trung tâm Tin học và Kỹ năng mềm VNUA',
    nameEn: process.env.NEXT_PUBLIC_CENTER_NAME_EN || 'VNUA Centre for Information Technology and Soft Skills - VISC',
    address: process.env.NEXT_PUBLIC_ADDRESS || 'Phòng 106, Nhà B1 - HVNNVN',
    fullAddress: process.env.NEXT_PUBLIC_ADDRESS_FULL || 'Trâu Quỳ - Gia Lâm - Hà Nội',
    phones: [
      { number: process.env.NEXT_PUBLIC_PHONE_IT || '0961.174.239', label: 'Phụ trách Tin học' },
      { number: process.env.NEXT_PUBLIC_PHONE_SOFT_SKILLS || '0379.450.522', label: 'Phụ trách Kỹ năng mềm' }
    ],
    email: process.env.NEXT_PUBLIC_EMAIL || 'tttinhockynangmem@vnua.edu.vn',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/visc.vnua'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 flex-1">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Liên hệ với chúng tôi
          </motion.h1>
          <motion.p 
            className="text-xl text-center text-green-50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Card Section */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto">
          {/* VISC Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-8">
              <h2 className="text-3xl font-bold text-white mb-2 text-center">{contactInfo.name}</h2>
              <p className="text-green-100 text-center text-lg">{contactInfo.nameEn}</p>
            </div>
            
            <div className="p-8 space-y-5">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium text-lg">{contactInfo.address}</p>
                    <p className="text-gray-600">{contactInfo.fullAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div className="flex flex-col gap-2">
                    {contactInfo.phones.map((phone, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <a 
                          href={`tel:${phone.number.replace(/\./g, '')}`}
                          className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline text-lg"
                        >
                          {phone.number}
                        </a>
                        <span className="text-sm text-gray-600 bg-emerald-50 px-3 py-1 rounded-full">
                          {phone.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline text-lg"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-4">
                  <Facebook className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <a 
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline text-lg"
                  >
                    Facebook VISC
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          className="mt-16 max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6">
              <h2 className="text-2xl font-bold text-white text-center">Vị trí trên bản đồ</h2>
            </div>
            <div className="aspect-video">
              <iframe
                src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || 'https://www.google.com/maps?ll=21.006125,105.932474&z=15&t=m&hl=vi&gl=US&mapclient=embed&cid=7854680610929000262&output=embed'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div 
          className="mt-8 max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Thời gian làm việc</h2>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg">{process.env.NEXT_PUBLIC_WORKING_HOURS_WEEKDAY || 'Thứ Hai - Thứ Sáu: 8:00 - 17:00'}</p>
              <p className="text-lg">{process.env.NEXT_PUBLIC_WORKING_HOURS_SATURDAY || 'Thứ Bảy: 8:00 - 12:00'}</p>
              <p className="text-green-100 text-sm mt-4">
                ({process.env.NEXT_PUBLIC_WORKING_HOURS_NOTE || 'Nghỉ Chủ nhật và các ngày lễ, Tết theo quy định'})
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
