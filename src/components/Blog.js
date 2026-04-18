"use client";

import { motion } from "framer-motion";
import { User, ChevronRight, Search, Phone } from "lucide-react";
import Link from "next/link";
import blogData from "@/data/blogs.json";

export { blogData };

export function slugifyBlogTitle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getBlogSlug(post) {
  return slugifyBlogTitle(post.title);
}

export function getBlogHref(post) {
  return `/blogs/${getBlogSlug(post)}`;
}

// --- Components ---

export function BlogCard({ post, index }) {
  return (
    <Link href={getBlogHref(post)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer"
      >
        <div className="relative h-64 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-4 bg-secondary text-white p-3 min-w-[70px] text-center shadow-lg">
            <div className="text-2xl font-bold leading-none">{post.date.day}</div>
            <div className="text-[10px] uppercase font-bold mt-1 tracking-wider">{post.date.month}</div>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-6 mb-6 text-xs text-secondary font-medium uppercase tracking-wider">
            <div className="flex items-center gap-2"><User size={14} /><span>{post.author}</span></div>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-6 leading-snug group-hover:text-secondary transition-colors duration-300 line-clamp-2">{post.title}</h3>
          <p className="text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3">{post.excerpt}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export function BlogHero({ title }) {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center pt-20">
      <div className="absolute inset-0">
        <img src="/blog/hero-bg.png" alt="Blog Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative w-full">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="pt-8 md:pt-12 text-2xl md:text-6xl font-semibold leading-tight md:leading-[1.05] text-white mb-6 break-words">{title}</h1>
          <div className="flex items-center gap-2 text-white/70 font-semibold uppercase text-xs tracking-[0.3em]">
            <Link href="/" className="hover:text-secondary transition-colors">Главная</Link>
            <ChevronRight size={14} className="text-secondary" />
            <span className="text-white">Статьи</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BlogSidebar({ currentId }) {
  const currentRaw = String(currentId || "");
  const decodedCurrentRaw = (() => {
    try {
      return decodeURIComponent(currentRaw);
    } catch {
      return currentRaw;
    }
  })();
  const currentNumericId = parseInt(currentRaw, 10);
  const currentById = Number.isNaN(currentNumericId)
    ? null
    : blogData.find((p) => p.id === currentNumericId);
  const currentBySlug = blogData.find((p) => getBlogSlug(p) === decodedCurrentRaw);
  const currentPost = currentBySlug || currentById;
  const popular = blogData
    .filter((p) => p.id !== currentPost?.id)
    .slice(0, 3);
  const categories = [
    { name: "Эндопротезирование", count: 7 },
    { name: "Образ жизни и здоровье", count: 1 },
    { name: "Новости", count: 1 },
    { name: "Ортопедия", count: 2 },
    { name: "Лечение", count: 5 }
  ];

  return (
    <aside className="lg:w-[30%] space-y-12">
      <div>
        <h4 className="text-xl font-bold text-primary mb-6">Поиск</h4>
        <div className="relative">
          <input type="text" placeholder="Поиск..." className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-secondary" />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-3"><div className="w-6 h-[2px] bg-secondary"></div> Категории</h4>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.name} className="flex justify-between items-center group cursor-pointer text-gray-500 hover:text-secondary">
              <span className="font-medium text-sm">{cat.name}</span>
              <span className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-xs font-bold group-hover:bg-secondary group-hover:text-white">{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-3"><div className="w-6 h-[2px] bg-secondary"></div> Популярные статьи</h4>
        <div className="space-y-6">
          {popular.map((pp) => (
            <Link key={pp.id} href={getBlogHref(pp)} className="flex gap-4 group">
              <div className="w-16 h-16 shrink-0 overflow-hidden rounded-sm"><img src={pp.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" /></div>
              <div className="justify-center flex flex-col"><p className="text-[9px] uppercase font-bold text-secondary tracking-wider mb-1">{pp.date.day} {pp.date.month}</p><h5 className="text-xs font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary">{pp.title}</h5></div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-secondary p-8 text-white text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"><Phone size={24} /></div>
        <h4 className="text-xl font-bold mb-4 uppercase tracking-wider leading-tight">Записаться на прием!</h4>
        <p className="text-2xl font-extrabold mb-8 whitespace-nowrap">+7 (XXX) XXX-XX-XX</p>
        <p className="text-xs opacity-80 border-t border-white/20 pt-6">dr.sas.ortho@gmail.com</p>
      </div>
    </aside>
  );
}

// --- Default Export (Home Page Section) ---

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="flex-1">
            <p className="uppercase tracking-[0.2em] text-secondary font-bold text-xs mb-3">Наш Блог</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Последние статьи и новости</h2>
            <p className="text-gray-500 text-lg max-w-2xl">Узнайте о современных методах лечения и новостях ортопедии в нашем блоге.</p>
          </div>
          <Link href="/blogs" className="hidden md:block">
            <button className="border-2 border-primary text-primary px-8 py-3 font-bold hover:bg-primary hover:text-white transition-all uppercase text-sm tracking-wider cursor-pointer">Все Статьи</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.slice(0, 3).map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>
      </div>
    </section>
  );
}
