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
    // 1. Tentar buscar dados
    console.log("Tentando buscar dados em: http://backend:8000/api/atuacoes/");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch("http://backend:8000/api/atuacoes/", { 
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Erro HTTP: ${res.status}`);
      return [];
    }

    const data: DjangoResponse = await res.json();
    console.log("Dados recebidos:", data);

    return data.results || [];
  } catch (error) {
    console.error("Erro CRÍTICO no fetch:", error);
    return [];
  }
}

export default async function ServicesSection() {
  const atuacoes = await getAtuacoes();

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-billgest text-4xl md:text-5xl text-purple-950 mb-4">
            Áreas de Atuação
          </h2>
          <p className="text-lg text-gray-600 font-jakarta">
            Expertise técnica combinada com visão estratégica.
          </p>
        </div>

        {/* --- MUDANÇA AQUI: Debug Visual na Tela --- */}
        {atuacoes.length === 0 ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center text-red-600">
            <p className="font-bold">Nenhuma atuação encontrada.</p>
            <p className="text-sm mt-2">
              Verifique se você cadastrou itens no Painel Admin ou se a API está conectando.
              <br />
              (Olhe o terminal do Docker para ver os logs de erro)
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {atuacoes.map((item) => (
              <div 
                key={item.id} 
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={item.icone || "star"} className="w-7 h-7" />
                </div>
                <h3 className="font-billgest text-2xl text-gray-900 mb-3 group-hover:text-purple-800 transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {item.descricao_curta}
                </p>
                <Link 
                  href={`/atuacoes/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900 gap-2"
                >
                  Saiba mais
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}