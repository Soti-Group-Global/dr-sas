"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  User,
  MessageSquare,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Введите имя";
    if (!form.phone.trim()) newErrors.phone = "Введите телефон";
    if (!form.message.trim()) newErrors.message = "Введите сообщение";
    if (!consent) newErrors.consent = "Требуется согласие на обработку данных";

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Неверный email";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setToast({
          type: "success",
          message: "Сообщение отправлено!",
        });

        setForm({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error();
      }
    } catch {
      setToast({
        type: "error",
        message: "Ошибка отправки",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row ">
        {/* LEFT PANEL */}
        <div className="bg-secondary text-white p-5 md:p-10 space-y-6 lg:w-[40%]">
          <h2 className="text-3xl font-semibold">Если у Вас есть вопросы, пожалуйста напишите нам сообщение. Мы свяжемся с Вами и постараемся помочь.</h2>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#f9fafa] p-6 md:p-10 lg:w-[60%]">

          <form onSubmit={handleSubmit} className="space-y-6 text-primary">
            {/* Input */}

            <div>
              <div
                className={`flex items-center border-b gap-3 py-2 transition-all
                  ${focused === "name" ? "border-secondary" : "border-gray-300"}
              `}
              >
                <User size={20} className="text-secondary" />
                <input
                  placeholder="Ваше фио"
                  value={form.name}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-xs mt-2">{errors.name}</p>
              )}
            </div>

            <div>
              <div
                className={`flex items-center border-b gap-3 py-2 transition-all
    ${focused === "phone" ? "border-secondary" : "border-gray-300"}
  `}
              >
                <Phone size={20} className="text-secondary" />
                <input
                  placeholder="Телефон"
                  value={form.phone}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {errors.phone && (
                <p className="text-red-500 text-xs mt-2">{errors.phone}</p>
              )}
            </div>

            <div>
              <div
                className={`flex items-center border-b gap-3 py-2 transition-all
    ${focused === "email" ? "border-secondary" : "border-gray-300"}
  `}
              >
                <Mail size={20} className="text-secondary" />
                <input
                  placeholder="Email"
                  value={form.email}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>

            <div
              className={`flex items-center border-b gap-3 py-2 transition-all
    ${focused === "subject" ? "border-secondary" : "border-gray-300"}
  `}
            >
              <MessageSquare size={20} className="text-secondary" />
              <input
                placeholder="Тема"
                value={form.subject}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div>
              <div
                className={`flex items-center border-b gap-3 py-2 transition-all
    ${focused === "message" ? "border-secondary" : "border-gray-300"}
  `}
              >
                <Mail size={20} className="text-secondary" />
                <input
                  placeholder="Сообщение"
                  value={form.message}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-transparent outline-none"
                />
              </div>

              {errors.message && (
                <p className="text-red-500 text-xs mt-2">{errors.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 mt-4">
              <label className="flex items-start gap-3 text-sm text-primary/90">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span>
                  Я соглашаюсь с{' '}
                  <span className="text-secondary  decoration-secondary underline-offset-2">
                    Политикой конфиденциальности
                  </span>, даю согласие на{' '}
                  <span className="text-secondary  decoration-secondary underline-offset-2">
                    обработку персональных данных
                  </span>{' '}
                  и{' '}
                  <span className="text-secondary  decoration-secondary underline-offset-2">
                    рекламную рассылку
                  </span>*
                </span>
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-2">{errors.consent}</p>
            )}
            <button
              type="submit"
              disabled={loading || !consent}
              className="bg-secondary text-white px-8 py-3 hover:bg-primary transition mt-10 cursor-pointer min-w-60 flex justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Отправить сообщение"
              )}
            </button>
          </form>
        </div>
      </div>

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
          ${toast.type === "success"
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
