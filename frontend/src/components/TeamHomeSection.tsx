import { MembroEquipe } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import Link from "next/link";
import { Icon } from "./Icon"; // Opcional se quiser ícone no subtítulo

// Interface para os textos da seção
interface HomeEquipeData {
  subtitulo: string;
  titulo: string;
  descricao: string;
  textura_fundo: string;
  texto_botao: string;
  link_botao: string;
}

// Busca Textos da Seção
async function getSectionData(): Promise<HomeEquipeData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch("http://backend:8000/api/home-equipe/", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) { return null; }
}

// Busca os 3 primeiros membros da equipe
async function getTeamMembers(): Promise<MembroEquipe[]> {
  try {
    const res = await fetch("http://backend:8000/api/equipe/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const lista = data.results || data || [];
    // Pega apenas os 3 primeiros para o destaque da home
    return lista.slice(0, 3);
  } catch (error) { return []; }
}

export default async function TeamHomeSection() {
  const sectionData = await getSectionData();
  const members = await getTeamMembers();

  if (!sectionData) return null;

  return (
    // Fundo Vinho (#3D0C11)
    <section className="relative py-24 bg-[#3D0C11] overflow-hidden">
      
      {/* Textura PNG de Fundo (Se existir) */}
      {sectionData.textura_fundo && (
        <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('${getImageUrl(sectionData.textura_fundo)}')` }}
        ></div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Cabeçalho: Grid de 2 colunas (Texto Esq vs Descrição Dir) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-start">
          
          {/* Lado Esquerdo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
                {/* Ícone de Escudo (SVG) - opcional */}
                <div className="text-[#D8B48D]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span className="font-jakarta text-white uppercase tracking-widest text-sm">
                    {sectionData.subtitulo}
                </span>
            </div>
            <h2 className="font-billgest text-4xl md:text-5xl text-[#D8B48D] leading-tight max-w-md">
              {sectionData.titulo}
            </h2>
          </div>

          {/* Lado Direito (Alinhado à direita no desktop) */}
          <div className="lg:text-right flex flex-col items-start lg:items-end">
             <p className="text-gray-300 font-jakarta leading-relaxed max-w-lg">
                {sectionData.descricao}
             </p>
          </div>
        </div>

        {/* Grid dos Cards das Profissionais */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {members.map((membro) => (
            <div key={membro.id} className="group relative rounded-lg overflow-hidden h-[400px] shadow-2xl">
              
              {/* Foto (Ocupa tudo) */}
              <img 
                src={getImageUrl(membro.foto)} 
                alt={membro.nome}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Faixa Dourada/Bege no Rodapé */}
              <div className="absolute bottom-0 left-0 w-full bg-[#D8B48D] p-6">
                <h3 className="font-jakarta text-[#3D0C11] font-bold text-lg leading-none">
                    {membro.nome}
                </h3>
                <p className="font-jakarta text-[#3D0C11] text-sm mt-1 opacity-90 font-medium">
                    {membro.cargo} {/* Aqui aparecerá a Área (ex: Direito Civil) */}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Botão Centralizado */}
        <div className="text-center">
            <Link href={sectionData.link_botao}>
                <button className="px-10 py-4 bg-white text-[#3D0C11] rounded-sm font-bold uppercase tracking-wide hover:bg-[#D8B48D] transition-colors shadow-lg">
                  {sectionData.texto_botao}
                </button>
            </Link>
        </div>

      </div>
    </section>
  );
}