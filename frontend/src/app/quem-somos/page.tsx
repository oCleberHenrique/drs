import { getImageUrl } from "@/utils/imageUrl";
import { getApiUrl } from "@/utils/api";
import GallerySection from "@/components/GallerySection";
import { Target, Eye, Diamond } from "lucide-react";

// Tipagem dos dados
interface PaginaQuemSomosData {
  banner_topo: string;
  titulo_principal: string;
  subtitulo_principal: string;
  descricao_principal: string;
  imagem_lateral: string;
  missao: string;
  visao: string;
  valores: string;
  iframe_mapa: string;
  imagens_galeria: any[];
}

async function getData(): Promise<PaginaQuemSomosData | null> {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/api/pagina-quem-somos/`, { cache: "no-store" });
    
    if (!res.ok) return null;
    const data = await res.json();
    
    // Pega o primeiro item ou o objeto direto
    return Array.isArray(data) || Array.isArray(data.results) ? (data.results ? data.results[0] : data[0]) : data;
  } catch (error) { return null; }
}

export const dynamic = "force-dynamic";

export default async function QuemSomosPage() {
  const data = await getData();

  if (!data) return <div className="py-20 text-center">Carregando conteúdo...</div>;

  return (
    <div className="bg-white font-jakarta">
      
      {/* DOBRA 1: Banner Topo (Max 300px) */}
      <div className="w-full h-[300px] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${getImageUrl(data.banner_topo)}')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <h1 className="font-billgest text-5xl md:text-6xl text-white">Quem Somos</h1>
        </div>
      </div>

      {/* DOBRA 1 (Continuação): Conteúdo Descritivo */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
                <span className="text-[#D8B48D] font-bold uppercase tracking-widest text-sm mb-2 block">
                    {data.subtitulo_principal}
                </span>
                <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] mb-6 leading-tight">
                    {data.titulo_principal}
                </h2>
                <div className="prose prose-lg text-gray-600 whitespace-pre-line text-justify">
                    {data.descricao_principal}
                </div>
            </div>
            {/* Imagem Lateral */}
            <div>
                <img 
                    src={getImageUrl(data.imagem_lateral)} 
                    alt="Quem Somos" 
                    className="w-full h-auto rounded-lg shadow-xl"
                />
            </div>
        </div>
      </section>

      {/* DOBRA 2: Missão, Visão e Valores */}
      <section className="py-20 bg-[#3D0C11] text-white">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Missão */}
                <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-[#D8B48D] rounded-full flex items-center justify-center text-[#3D0C11] mb-6">
                        <Target size={24} />
                    </div>
                    <h3 className="font-billgest text-3xl mb-4 text-[#D8B48D]">Missão</h3>
                    <p className="text-gray-300 leading-relaxed">{data.missao}</p>
                </div>

                {/* Visão */}
                <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-[#D8B48D] rounded-full flex items-center justify-center text-[#3D0C11] mb-6">
                        <Eye size={24} />
                    </div>
                    <h3 className="font-billgest text-3xl mb-4 text-[#D8B48D]">Visão</h3>
                    <p className="text-gray-300 leading-relaxed">{data.visao}</p>
                </div>

                {/* Valores */}
                <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-[#D8B48D] rounded-full flex items-center justify-center text-[#3D0C11] mb-6">
                        <Diamond size={24} />
                    </div>
                    <h3 className="font-billgest text-3xl mb-4 text-[#D8B48D]">Valores</h3>
                    <p className="text-gray-300 leading-relaxed">{data.valores}</p>
                </div>
            </div>
        </div>
      </section>

      {/* DOBRA 3: Galeria de Imagens */}
      <GallerySection imagens={data.imagens_galeria} />

      {/* DOBRA 4: Mapa */}
      <section className="h-[400px] w-full bg-gray-200 relative">
         {data.iframe_mapa ? (
            <div 
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                dangerouslySetInnerHTML={{ __html: data.iframe_mapa }} 
            />
         ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-500">Mapa não configurado</div>
         )}
      </section>

    </div>
  );
}