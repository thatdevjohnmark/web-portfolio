'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-[#FFFFFF] py-12 mt-20 border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          <h3 className="text-xl font-bold mb-4" style={{fontFamily: 'Inter'}}>John Mark Tactacan</h3>
          <p className="text-[#B0B0B0]">
              QA Specialist focused on manual testing, data validation, and clear documentation.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
          <h3 className="text-xl font-bold mb-4" style={{fontFamily: 'Inter'}}>Quick Links</h3>
          <ul className="space-y-2 text-[#B0B0B0]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          <h3 className="text-xl font-bold mb-4" style={{fontFamily: 'Inter'}}>Connect</h3>
          <div className="flex space-x-4">
              <motion.a
                href="https://github.com/thatdevjohnmark"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                className="text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors"
              >
                GitHub
              </motion.a>
              <motion.a
                href="mailto:johnmark.tactacan@gmail.com"
                whileHover={{ y: -2, color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                className="text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors"
              >
                Email
              </motion.a>
            </div>
          </motion.div>
        </div>

        <hr className="border-[#333333] mb-8" />

        <div className="text-center text-[#B0B0B0]">
          <p>&copy; {currentYear} John Mark Tactacan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
