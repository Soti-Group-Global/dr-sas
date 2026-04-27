"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "Палатный врач Сараванан Арумугам очень замечательный, спокойный! Все доступно объяснит и поможет во всем в чем он может!!! Огромное Вам спасибо!",
    name: "Марина Афонина",
    role: "Пациент",
  },
  {
    text: "Огромное спасибо врачу Отделения ОТО Сараванану Арумугаму. Он просто умничка, доктор от бога!",
    name: "Благодарный пациент",
    role: "Пациент",
  },
  {
    text: "Дорогой и любимый доктор Сараванан, огромное спасибо за Ваш нелёгкий и такой нужный и важный труд! Советую всем не бояться, а обращаться с заболеваниями костной системы к доктору Сараванану, он врач от бога. Мне сделал он эндопротезирование тазобедренного сустава, чувствую себя отлично.",
    name: "Ольга Дегтярева",
    role: "Пациент",
  },
];

export default function Testimonials() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);
  return (
    <section
      id="testimonials"
      className="relative py-20 md:pb-138 lg:pb-70 xl:pb-48 bg-[#f5f5f5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto  relative">
        {/* LEFT ORANGE PANEL */}
        <div className="w-full md:w-[45%] bg-secondary text-white p-8 md:p-12">
          <h3 className="text-3xl font-semibold mb-4 leading-snug">
            Что говорят <br className="hidden md:block" /> пациенты
          </h3>

          <p className="text-white/80 leading-relaxed mb-8 md:max-w-52 lg:max-w-72 xl:max-w-xs">
            Вот что говорят о докторе  довольные пациенты. Все
            отзывы написаны ими лично.
          </p>

          <div className="flex justify-center md:justify-end md:max-w-52 lg:max-w-72 xl:max-w-xs">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center border border-primary gap-2 bg-primary hover:bg-transparent text-white font-bold hover:text-primary px-8 py-3 transition-all  duration-300 cursor-pointer"
            >
              Написать отзыв
            </button>
          </div>
        </div>

        {/* RIGHT DARK PANEL (OVERLAP) */}
        <div
          className="
      relative md:absolute 
      md:right-0 
      md:top-10 
      md:w-[65%] 
      bg-primary 
      text-white 
      p-6 md:p-12
      mt-8 md:mt-0
    "
        >
          {/* Slider */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
              }}
              autoplay={{ delay: 5000 }}
              loop
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* LEFT: NAME */}
                    <div className=" mt-6 text-center">
                      <p className="text-[#f4a261] font-semibold whitespace-nowrap">
                        {item.name}
                      </p>
                      <p className="text-white/60 text-sm">{item.role}</p>
                    </div>

                    {/* RIGHT: REVIEW CARD */}
                    <div className="relative bg-[#104553] p-6 md:p-8 max-w-2xl">
                      {/* Pointer */}
                      <div className="hidden md:block absolute -left-3 top-6 w-6 h-6 bg-[#104553] rotate-45"></div>

                      {/* Text */}
                      <div className="relative ">
                        <p className="text-white/80 leading-relaxed text-lg italic ">
                          {item.text}
                        </p>
                        {/* Quote icon */}
                        <FaQuoteRight className="text-white/20  absolute -bottom-2 right-2 text-4xl" />
                      </div>
                      {/* Stars */}
                      <div className="mt-6 text-yellow-400 text-lg flex gap-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Arrows */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="testimonial-prev cursor-pointer text-white/70 hover:text-secondary transition-all duration-300">
                <ChevronLeft />
              </button>
              <button className="testimonial-next cursor-pointer text-white/70 hover:text-secondary transition-all duration-300">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setToast({
            type: "success",
            message: "Спасибо за отзыв!",
          });
        }}
        onError={() => {
          setToast({
            type: "error",
            message: "Ошибка отправки!",
          });
        }}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-100 w-full flex justify-center px-4 max-w-lg"
          >
            <div
              className={`
          flex items-center justify-center gap-2 px-6 py-4  shadow-lg backdrop-blur-md
          border max-w-md w-full
          ${
            toast.type === "success"
              ? "bg-green-500 border-green-700 text-white"
              : "bg-red-500 border-red-700 text-white"
          }
        `}
            >
              {toast.type === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}

              <p className=" font-medium">{toast.message}</p>

              <div className="absolute bottom-0 left-0 h-1 bg-white/40 w-full overflow-hidden">
                <div className="h-full bg-white animate-[progress_5s_linear]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
