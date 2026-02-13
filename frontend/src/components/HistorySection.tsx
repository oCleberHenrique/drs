import { getImageUrl } from "@/utils/imageUrl";
import { getApiUrl } from "@/utils/api";
import Link from "next/link";
import { Icon } from "./Icon"; 

// Interface dos dados
interface HistoryData {
  subtitulo: string;
  titulo: string;
  texto: string;
  texto_botao: string;
  link_botao: string;
  imagem_fundo: string;
  imagem_frente: string;
}

async function getHistory(): Promise<HistoryData | null> {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/api/historia/`, { cache: "no-store" });
    
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) { return null; }
}

export default async function HistorySection() {
  const data = await getHistory();

  if (!data) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO ESQUERDO: Texto e Botão */}
          <div className="space-y-8 order-2 lg:order-1">
            
            {/* Subtítulo com Ícone */}
            <div className="flex items-center gap-3">
               <div className="text-[#3D0C11]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <span className="font-jakarta text-[#3D0C11] font-semibold uppercase tracking-wider text-sm">
                 {data.subtitulo}
               </span>
            </div>

            <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] leading-tight">
              {data.titulo}
            </h2>
            
            <div className="prose prose-lg text-gray-600 font-jakarta leading-relaxed whitespace-pre-line">
              {data.texto}
            </div>

            <Link href={data.link_botao}>
                <button className="px-8 py-4 bg-[#3D0C11] text-white rounded-md font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  {data.texto_botao}
                </button>
            </Link>
          </div>

          {/* LADO DIREITO: Imagens (Espelhadas) */}
          <div className="relative h-[400px] w-full max-w-lg mx-auto lg:mx-0 flex flex-col justify-center order-1 lg:order-2">
            
            {/* IMAGEM 1 (Fundo - Livros): Topo/Direita */}
            <div className="absolute top-0 right-0 z-0">
                <img 
                    src={getImageUrl(data.imagem_fundo)} 
                    alt="Fundo" 
                    className="w-[260px] h-[320px] object-cover rounded-sm shadow-sm"
                />
            </div>

            {/* IMAGEM 2 (Frente - Reunião): Baixo/Esquerda */}
            <div className="absolute bottom-0 left-0 md:left-10 z-10">
                <img 
                    src={getImageUrl(data.imagem_frente)}
                    alt="Frente" 
                    className="w-[300px] md:w-[380px] h-[220px] md:h-[260px] object-cover rounded-sm shadow-2xl border-4 border-white"
                />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}