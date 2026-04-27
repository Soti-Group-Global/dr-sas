"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import AboutModal from "./AboutModal";
import { scrollToSection } from "@/utils/scrollToSection";

export default function About() {
  const [modal, setModal] = useState(null);

  return (
    <section id="about" className="bg-white py-20 ">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-6 items-center">
        {/* Doctor Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative flex justify-center lg:justify-start"
        >
          <img
            src="/doctor/profile.webp"
            alt="Доктор САС"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* 
          <h2 className="text-4xl font-semibold text-teal-900 mt-4 mb-4">
            Санкаранараянан Арумугам Сараванан
          </h2>

          <p className="text-lg text-teal-700 mb-6">(Д-р. Сас)</p> */}

          <p className="text-primary mb-4 leading-relaxed text-justify">
            <strong> Здравствуйте!</strong> <br /> Меня зовут{" "}
            <strong>  Санкаранараянан Арумугам Сараванан (Доктор САС)</strong>,<br /> 
            Я – врач травматолог-ортопед и онко-ортопед.
            <br />
            <strong>Моя миссия</strong> – помочь вам вернуть свободу движения,
            избавиться от боли и наслаждаться полноценной жизнью, свободной от
            ограничений, связанных с заболеваниями и травмами
            опорно-двигательного аппарата.
          </p>

          <p className="text-primary font-semibold mb-2">
            Мой подход к лечению:{" "}
          </p>

          <p className="text-primary mb-6 leading-relaxed text-justify">
            Я верю, что каждый пациент уникален, и поэтому мой подход к
            диагностике и Лечении всегда индивидуален. Я стремлюсь не просто
            устранить симптомы, но и выявить первопричину проблемы, чтобы
            предложить наиболее эффективное и долгосрочное решение. Моя работа
            основана на глубоких знаниях анатомии, физиологии и патологии
            опорно-двигательной системы, а также на постоянном совершенствовании
            своих навыков и освоении новейших медицинских технологий.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setModal("education")}
              className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-3 transition-all font-semibold duration-300 cursor-pointer border border-secondary hover:border-primary"
            >
              <GraduationCap size={20} />
              Образование
            </button>

            <button
              onClick={() => setModal("experience")}
              className="flex items-center gap-2 border border-secondary bg-transparent hover:bg-secondary text-secondary hover:text-white px-8 py-3 transition-all font-semibold duration-300 cursor-pointer"
            >
              <Award size={20} />
              Опыт работы
            </button>

            <button
              onClick={() => scrollToSection("contacts")}
              className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-3 transition-all font-semibold duration-300 cursor-pointer border border-secondary hover:border-primary"
            >
              <Stethoscope size={20} />
              Записаться на прием
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AboutModal type={modal} close={() => setModal(null)} />
    </section>
  );
}
