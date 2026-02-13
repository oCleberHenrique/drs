import { getImageUrl } from "@/utils/imageUrl";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";

async function getPostDetalhe(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    // Usa o lookup_field 'slug' diretamente na URL
    const res = await fetch(`${apiUrl}/api/blog/${slug}/`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) { return null; }
}

export default async function BlogPostInterna({ params }: { params: { slug: string } }) {
  const post = await getPostDetalhe(params.slug);
  if (!post) return notFound();

  return (
    <article className="bg-white min-h-screen pb-24 font-jakarta">
       {/* Capa Gigante */}
       <div className="w-full h-[400px] md:h-[500px] relative">
          <img 
            src={getImageUrl(post.capa)} 
            alt={post.titulo} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
             <div className="container mx-auto">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                        <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(post.publicado_em).toLocaleDateString()}</span>
                        {post.autor_nome && <span className="flex items-center gap-2"><User size={16}/> {post.autor_nome}</span>}
                    </div>
                    <h1 className="font-billgest text-4xl md:text-6xl text-white leading-tight">{post.titulo}</h1>
                </div>
             </div>
          </div>
       </div>

       <div className="container mx-auto px-4 mt-12">
          <div className="max-w-3xl mx-auto">
             <p className="text-xl text-gray-500 font-serif italic mb-8 border-l-4 border-[#D8B48D] pl-4">
                {post.resumo}
             </p>
             
             {/* Conteúdo HTML do Django (CKEditor ou similar) */}
             <div 
                className="prose prose-lg text-gray-800 prose-headings:font-billgest prose-headings:text-[#3D0C11] prose-a:text-[#D8B48D]"
                dangerouslySetInnerHTML={{ __html: post.conteudo || "" }}
             />
          </div>
       </div>
    </article>
  );
}