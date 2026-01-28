import { Atuacao } from "@/types";
import { Icon } from "./Icon";
import Link from "next/link";

// Interface para o texto da esquerda
interface SectionData {
  titulo: string;
  descricao: string;
  texto_cta: string;
  texto_botao: string;
  link_botao: string;
}

// Busca Texto da Esquerda
async function getSectionData(): Promise<SectionData | null> {
  try {
    // CORREÇÃO 1: Definindo e usando a variável de ambiente
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/home-atuacao/`, { cache: "no-store" });
    
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) { return null; }
}

// Busca Cards da Direita (Atuações)
async function getAtuacoes(): Promise<Atuacao[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // CORREÇÃO 2: Usando a variável apiUrl que você criou (estava fixo backend:8000 antes)
    const res = await fetch(`${apiUrl}/api/atuacoes/`, { cache: "no-store" });
    
    if (!res.ok) return [];
    const data = await res.json();
    const lista = data.results || data || [];
    // Limitamos a 4 itens para bater com o layout 2x2
    return lista.slice(0, 4); 
  } catch (error) { return []; }
}

export default async function PracticeSection() {
  const sectionData = await getSectionData();
  const cards = await getAtuacoes();

  if (!sectionData) return null;

  return (
    <section className="py-24 bg-[#FBFBFB]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LADO ESQUERDO: Texto Fixo (Col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-billgest text-5xl md:text-6xl text-[#3D0C11] mb-6 leading-tight">
              {sectionData.titulo}
            </h2>
            <p className="text-gray-600 font-jakarta text-lg leading-relaxed mb-8">
              {sectionData.descricao}
            </p>
            
            <div className="mt-4">
              <p className="text-gray-500 text-sm mb-4">{sectionData.texto_cta}</p>
              <Link href={sectionData.link_botao}>
                <button className="px-8 py-4 bg-[#3D0C11] text-white rounded-md font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  {sectionData.texto_botao}
                </button>
              </Link>
            </div>
          </div>

          {/* LADO DIREITO: Grid de Cards (Col-span-7) */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {cards.map((item) => (
                <div key={item.id} className="group cursor-default">
                  
                  {/* Ícone Circular (Vinho com ícone Dourado) */}
                  <div className="w-16 h-16 bg-[#3D0C11] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <div className="text-[#F2ECE4]">
                        <Icon name={item.icone} className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="font-jakarta text-xl font-bold text-[#1A202C] mb-3 group-hover:text-[#3D0C11] transition-colors">
                    {item.titulo}
                  </h3>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.descricao_curta}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}