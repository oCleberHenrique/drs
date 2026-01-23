import { getImageUrl } from "@/utils/imageUrl";
import Link from "next/link";

interface HomeBlogData {
  subtitulo: string;
  titulo: string;
  descricao: string;
  texto_botao: string;
  link_botao: string;
  imagem_1: string;
  imagem_2: string;
}

async function getData(): Promise<HomeBlogData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch("http://backend:8000/api/home-blog/", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) { return null; }
}

export default async function BlogHomeSection() {
  const data = await getData();

  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO ESQUERDO: Imagens (Composição) */}
          <div className="relative h-[450px] w-full max-w-lg mx-auto lg:mx-0">
            
            {/* Imagem 1 (Superior Esquerda) */}
            <div className="absolute top-0 left-0 z-10">
                <img 
                    src={getImageUrl(data.imagem_1)} 
                    alt="Blog DSR" 
                    className="w-[280px] h-[280px] object-cover rounded-2xl shadow-lg"
                />
            </div>

            {/* Imagem 2 (Inferior Direita) */}
            <div className="absolute bottom-0 right-0 md:right-10 z-0">
                <img 
                    src={getImageUrl(data.imagem_2)}
                    alt="Conteúdo Jurídico" 
                    className="w-[260px] h-[340px] object-cover rounded-2xl shadow-md grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
            </div>

          </div>

          {/* LADO DIREITO: Texto */}
          <div className="space-y-6">
            
            {/* Subtítulo com Ícone */}
            <div className="flex items-center gap-3">
               <div className="text-[#3D0C11]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <span className="font-billgest text-[#3D0C11] text-lg">
                 {data.subtitulo}
               </span>
            </div>

            <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] leading-tight">
              {data.titulo}
            </h2>
            
            <div className="prose prose-lg text-gray-600 font-jakarta leading-relaxed whitespace-pre-line">
              {data.descricao}
            </div>

            <div className="pt-4">
                <Link href={data.link_botao}>
                    <button className="px-8 py-4 bg-[#3D0C11] text-white rounded-md font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    {data.texto_botao}
                    </button>
                </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}