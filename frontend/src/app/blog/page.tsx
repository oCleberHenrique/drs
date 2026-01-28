import { BlogPost } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

async function getPosts(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/blog/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (error) { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#3D0C11] py-20 text-center">
        <h1 className="font-billgest text-5xl text-white">Blog & Notícias</h1>
        <p className="text-[#D8B48D] mt-4 text-lg">Informação jurídica relevante para o seu negócio</p>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
               <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                  <div className="h-56 overflow-hidden">
                     <img 
                        src={getImageUrl(post.capa)} 
                        alt={post.titulo} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(post.publicado_em).toLocaleDateString()}</span>
                        {post.autor_nome && <span className="flex items-center gap-1"><User size={14}/> {post.autor_nome}</span>}
                     </div>
                     <h2 className="font-billgest text-xl text-[#3D0C11] mb-3 group-hover:text-[#D8B48D] transition-colors">
                        {post.titulo}
                     </h2>
                     <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                        {post.resumo}
                     </p>
                     <span className="text-[#3D0C11] font-bold text-sm uppercase tracking-wide">Ler Artigo &rarr;</span>
                  </div>
               </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}