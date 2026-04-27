"use client";
import { scrollToSection } from "@/utils/scrollToSection";
import { motion } from "framer-motion";
import { Calendar, Bone, Heart, Activity } from "lucide-react";

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};
const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};
const fromBottom = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

const t = (delay = 0) => ({ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay });

const services = [
  {
    icon: Bone,
    title: "Лечение переломов",
    desc: "Современные методы лечения переломов любой сложности",
    delay: 0.9,
  },
  {
    icon: Heart,
    title: "Замена суставов",
    desc: "Эндопротезирование крупных суставов",
    delay: 1.0,
  },
  {
    icon: Activity,
    title: "Артроскопия",
    desc: "Малоинвазивная диагностика и лечение крупных суставов",
    delay: 1.1,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col overflow-hidden bg-white"
    >
      {/* ── Main Hero Area ── */}
      <div className="relative w-full min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/shared/hero-bg.png')" }}
        />

        {/* Teal Overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-[#233e47]/95 via-[#233e47]/80 to-transparent"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={t(0)}
        />

        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-44 pb-32 w-full flex items-center">
          <div className="max-w-4xl text-white">
            <motion.p
              className="text-lg md:text-2xl text-teal-100 mb-4 leading-tight font-medium"
              variants={fromLeft}
              initial="hidden"
              animate="visible"
              transition={t(0.1)}
            >
              Профессиональная помощь в травматологии и ортопедии
            </motion.p>

            <motion.h1
              className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight mb-4"
              variants={fromRight}
              initial="hidden"
              animate="visible"
              transition={t(0.25)}
            >
              Санкаранараянан Арумугам Сараванан <span className="text-primary" style={{ color: "#F09856" }}> (Доктор САС) </span> 
            </motion.h1>

            <div className="text-teal-100 text-lg mb-8">
              {[
                {
                  text: "кандидат медицинских наук",
                  d: 0.42,
                },
                { text: "заведующий отделением травматологии и ортопедии", 
                  d: 0.52 
                },
                {
                  text: "врач высшей категории, травматолог-ортопед, окно-ортопед",
                  d: 0.62,
                },
                { text: "организатор здравоохранения", 
                  d: 0.72 
                },

              ].map(({ text, d }) => (
                <motion.p
                  key={text}
                  variants={fromLeft}
                  initial="hidden"
                  animate="visible"
                  transition={t(d)}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.button
              onClick={() => scrollToSection("contacts")}
              className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-3 transition-all font-semibold duration-300 cursor-pointer"
              variants={fromBottom}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.95 }}
            >
              <Calendar size={18} />
              Записаться на прием
            </motion.button>
          </div>
        </div>

        {/* Wave SVG — sits at the very bottom of the teal area */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-20 md:h-32"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,120 480,120 720,90 C960,60 1200,20 1440,40 L1440,160 L0,160 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* ── Service Cards — overlap the wave ── */}
      {/*
        Negative margin pulls the cards UP so they straddle the wave.
        The cards themselves are white with a shadow, so they look like
        they're "floating" on top of the white wave edge.
      */}
      <div className="relative z-10 -mt-20 pb-10 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6">
          {services.map(({ icon: Icon, title, desc, delay }) => (
            <motion.div
              key={title}
              className="bg-gray-100  shadow-lg p-6 lg:p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
              variants={fromBottom}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
            >
              {/* Icon bubble */}
              <div className=" flex items-center justify-center mb-6 text-secondary transition-all duration-300 group-hover:-translate-y-2">
                <Icon size={40} strokeWidth={1.5} />
              </div>

              <h3 className="text-primary font-semibold text-xl mb-4">
                {title}
              </h3>
              <p className="text-gray-500  leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
