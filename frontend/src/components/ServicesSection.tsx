import { Atuacao } from "@/types";
import { Icon } from "./Icon";
import Link from "next/link";

interface DjangoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Atuacao[];
}

async function getAtuacoes(): Promise<Atuacao[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // CORREÇÃO: Usando a variável apiUrl e template string
    const res = await fetch(`${apiUrl}/api/atuacoes/`, { 
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data: DjangoResponse = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar atuações:", error);
    return [];
  }
}

export default async function ServicesSection() {
  const atuacoes = await getAtuacoes();

  // Se não tiver nada, não mostra a seção para não ficar feio
  if (atuacoes.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] mb-4">
            Áreas de Atuação
          </h2>
          <p className="text-lg text-gray-600 font-jakarta">
            Expertise técnica combinada com visão estratégica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {atuacoes.map((item) => (
            <div 
              key={item.id} 
              className="group p-8 rounded-sm bg-[#FBFBFB] hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Ícone: Fundo Vinho com Ícone Dourado Claro */}
              <div className="w-14 h-14 bg-[#3D0C11] text-[#F2ECE4] rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name={item.icone || "star"} className="w-7 h-7" />
              </div>

              <h3 className="font-billgest text-2xl text-[#1A202C] mb-3 group-hover:text-[#3D0C11] transition-colors">
                {item.titulo}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-jakarta">
                {item.descricao_curta}
              </p>
              
              <Link 
                href={`/atuacoes/${item.slug}`}
                className="inline-flex items-center text-sm font-semibold text-[#3D0C11] hover:text-[#D8B48D] gap-2 transition-colors uppercase tracking-wider"
              >
                Saiba mais
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}