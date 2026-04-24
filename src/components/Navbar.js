"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Menu, X, MapPin, Instagram, Send,Stethoscope } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/utils/scrollToSection";

const navItems = [
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Блог", href: "#blog" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contacts" },
];

const t = (delay = 0) => ({ duration: 0.5, ease: "easeOut", delay });

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigateToSection = (sectionId) => {
    if (!sectionId) return;

    setOpen(false);

    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    router.push(`/#${sectionId}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* Top bar */}
      <div
        className={`bg-primary text-white text-sm transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0 py-0 opacity-0" : "py-3 opacity-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center text-base font-normal gap-2"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={t(0.1)}
          >
            <MapPin className="text-secondary" size={16} />
            <span>Москва, Щелково</span>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={t(0.1)}
          >
            <Instagram size={16} className="cursor-pointer" />
            <Send size={16} className="cursor-pointer" />
          </motion.div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`max-w-6xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        {/* Logo */}
        <motion.div
          onClick={() => navigateToSection("hero")}
          className="flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={t(0.15)}
        >
          <div
            className={`rounded-full overflow-hidden border-2 border-primary transition-all duration-300 ${
              scrolled ? "w-12 h-12" : "w-16 h-16"
            }`}
          >
            <Image
              src="/doctor/profile.jpg"
              alt="Doctor"
              width={60}
              height={60}
              className="object-cover"
            />
          </div>
          <div>
            <p
              className={`font-extrabold uppercase tracking-wide text-primary border-b border-primary ${
                scrolled ? "text-lg" : "text-2xl"
              }`}
            >
              Доктор САС
            </p>
            <p
              className={`text-black ${scrolled ? "text-[0.7rem]" : "text-sm"}`}
            >
              Врач травматолог-ортопед
            </p>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Nav — each item staggers in from top */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => navigateToSection(item.href.replace("#", ""))}
                className="relative text-primary font-semibold hover:text-secondary transition duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(0.2 + i * 0.07)}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 opacity-0 group-hover:opacity-100 group-hover:-top-4 transition-all duration-300 ease-out pointer-events-none z-0">
                  <Stethoscope
                    size={20} 
                    className="text-secondary drop-shadow-sm" 
                  />
                </div>
              </motion.button>
            ))}
          </nav>

          {/* CTA — slides in from right */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={t(0.55)}
          >
            <button
              onClick={() => navigateToSection("contacts")}
              className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-3 transition-all duration-300 cursor-pointer font-semibold"
            >
              <Phone size={18} />
              Записаться
            </button>
          </motion.div>

          {/* Mobile toggle — fades in */}
          <motion.button
            className="md:hidden text-primary"
            onClick={() => setOpen(!open)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(0.3)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden border-t"
        >
          <div className="flex flex-col gap-4 px-6 py-6 text-gray-700">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => navigateToSection(item.href.replace("#", ""))}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={t(0.05 + i * 0.06)}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => navigateToSection("contacts")}
              className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-6 py-3 transition-all duration-300 cursor-pointer justify-center mt-4 font-semibold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.35)}
            >
              <Phone size={18} />
              Записаться
            </motion.button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
