"use client";

import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { blogData, BlogHero, getBlogSlug } from "@/components/Blog";

export default function BlogDetailPage() {
  const { id } = useParams();
  const routeValue = String(id || "");
  const decodedRouteValue = (() => {
    try {
      return decodeURIComponent(routeValue);
    } catch {
      return routeValue;
    }
  })();
  const postBySlug = blogData.find((p) => getBlogSlug(p) === decodedRouteValue);
  const numericId = parseInt(decodedRouteValue, 10);
  const postById = Number.isNaN(numericId)
    ? null
    : blogData.find((p) => p.id === numericId);
  const post = postBySlug || postById;

  if (!post) return <div className="min-h-screen flex items-center justify-center font-bold text-primary">Статья не найдена</div>;

  return (
    <main className="min-h-screen bg-white">
      <BlogHero title={post.title} />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[70%]">
            <div className="relative h-[300px] md:h-[500px] overflow-hidden mb-10 rounded-sm">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-secondary text-white p-3 min-w-[70px] text-center shadow-lg">
                <div className="text-2xl font-bold leading-none">{post.date.day}</div>
                <div className="text-[10px] uppercase font-bold mt-1 tracking-wider">{post.date.month}</div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link href="/blogs"><button className="bg-secondary text-white px-8 py-3 font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-2 hover:bg-primary transition-all duration-300"><ChevronRight size={14} className="rotate-180" /> Назад</button></Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
