import { BlogPost } from "@/types";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

// Buscar posts do Django
async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("http://backend:8000/api/blog/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-billgest text-5xl text-purple-950 mb-4">Blog & Insights</h1>
          <p className="text-gray-600 text-lg">
            Acompanhe as tendências de mercado, atualizações fiscais e estratégias de gestão.
          </p>
        </div>

        {/* Grid de Posts */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
                
                {/* Imagem de Capa */}
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                    {post.capa ? (
                        <img 
                            src={post.capa} 
                            alt={post.titulo} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Sem imagem</div>
                    )}
                    {/* Badge de Destaque */}
                    {post.destaque && (
                        <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                            Destaque
                        </span>
                    )}
                </div>

                {/* Conteúdo */}
                <div className="p-8 flex flex-col flex-1">
                  
                  {/* Metadados */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publicado_em).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.autor_nome || "DSR Equipe"}
                    </div>
                  </div>

                  <h2 className="font-billgest text-xl text-gray-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                        {post.titulo}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.resumo}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold text-purple-700 hover:text-purple-900 uppercase tracking-wide gap-2 mt-auto"
                  >
                    Ler Artigo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4">Ainda não publicamos artigos.</p>
            <p className="text-sm text-purple-600">Acesse o Painel Admin para criar o primeiro post.</p>
          </div>
        )}

      </div>
    </div>
  );
}