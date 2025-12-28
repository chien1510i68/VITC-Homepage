'use client';

import { Mail, Phone, MapPin, Clock, Facebook, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const contactInfo = {
    vitc: {
      name: 'Trung tâm Tin học',
      address: 'Phòng 105-106 và Phòng 205-206, Nhà B1 - Học viện Nông nghiệp Việt Nam',
      fullAddress: 'Trâu Quỳ - Gia Lâm - Hà Nội',
      phones: ['0961.174.239', '024.6662.8620'],
      email: 'vitc@vnua.edu.vn',
      website: 'https://vitc.edu.vn/',
      facebook: 'https://www.facebook.com/vitc.vnua/',
    //   director: {
    //     name: 'Phạm Quang Dũng',
    //     position: 'Giám đốc Trung tâm'
    //   },
    //   viceDirector: {
    //     name: 'Lê Ngọc Hướng',
    //     position: 'Phó Giám đốc Trung tâm'
    //   }
    },
    softSkills: {
      name: 'Trung tâm đào tạo Kỹ năng mềm',
      address: 'Phòng 105 – 108 Nhà cán bộ A1 – Học viện Nông nghiệp Việt nam',
      phone: '04.6261.7545',
      hotline: '0167.666.0316',
      email: 'ttkynangmem@vnua.edu.vn',
      website: 'http://trungtamkynangmem.vnua.edu.vn',
      facebook: 'www.facebook.com/CSST.vnua/'
    }
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

      {/* Contact Cards Section */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* VITC Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{contactInfo.vitc.name}</h2>
              <p className="text-green-100">Học viện Nông nghiệp Việt Nam</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Leadership */}
              
              {/* <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactInfo.vitc.director.name}</p>
                    <p className="text-sm text-gray-600">{contactInfo.vitc.director.position}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactInfo.vitc.viceDirector.name}</p>
                    <p className="text-sm text-gray-600">{contactInfo.vitc.viceDirector.position}</p>
                  </div>
                </div>
              </div> */}

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">{contactInfo.vitc.address}</p>
                    <p className="text-gray-600 text-sm">{contactInfo.vitc.fullAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {contactInfo.vitc.phones.map((phone, idx) => (
                      <a 
                        key={idx}
                        href={`tel:${phone.replace(/\./g, '')}`}
                        className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a 
                    href={`mailto:${contactInfo.vitc.email}`}
                    className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                  >
                    {contactInfo.vitc.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a 
                    href={contactInfo.vitc.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                  >
                    {contactInfo.vitc.website}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a 
                    href={contactInfo.vitc.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                  >
                    Facebook VITC
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Soft Skills Center Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{contactInfo.softSkills.name}</h2>
              <p className="text-green-100">Học viện Nông nghiệp Việt Nam</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-900">{contactInfo.softSkills.address}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a 
                    href={`tel:${contactInfo.softSkills.phone.replace(/\./g, '')}`}
                    className="text-green-600 hover:text-green-800 font-medium hover:underline"
                  >
                    {contactInfo.softSkills.phone}
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600 bg-green-50 px-2 py-1 rounded">Hotline</span>
                    <a 
                      href={`tel:${contactInfo.softSkills.hotline.replace(/\./g, '')}`}
                      className="text-green-600 hover:text-green-800 font-medium hover:underline"
                    >
                      {contactInfo.softSkills.hotline}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.softSkills.email}`}
                  className="text-green-600 hover:text-green-800 font-medium hover:underline"
                >
                  {contactInfo.softSkills.email}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a 
                  href={contactInfo.softSkills.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 font-medium hover:underline break-all"
                >
                  {contactInfo.softSkills.website}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a 
                  href={`https://${contactInfo.softSkills.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 font-medium hover:underline"
                >
                  Facebook CSST
                </a>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737884515844!2d105.87541831476286!3d21.051224985992436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a9f6a4e3e6c1%3A0x3f3e3e3e3e3e3e3e!2zSOG7jWMgdmnhu4duIE7DtG5nIG5naGnhu4dwIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1640000000000!5m2!1svi!2s"
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
              <p className="text-lg">Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
              <p className="text-lg">Thứ Bảy: 8:00 - 12:00</p>
              <p className="text-green-100 text-sm mt-4">
                (Nghỉ Chủ nhật và các ngày lễ, Tết theo quy định)
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
