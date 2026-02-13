import { HeroData } from "@/types";
import { getImageUrl } from '@/utils/imageUrl';
import { getApiUrl } from "@/utils/api";
import Link from "next/link";

async function getHeroData(): Promise<HeroData | null> {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/api/hero/`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) {
    console.error("Erro ao buscar Hero:", error);
    return null;
  }
}

export default async function HeroSection() {
  const hero = await getHeroData();

  if (!hero) return null;

  // Traduz a URL da imagem para o navegador
  const bgImage = getImageUrl(hero.imagem_fundo);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-[#0B0E13]">
      
      {/* Imagem de Fundo Corrigida */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url('${bgImage}')`, // <--- Usa a variável tratada
          backgroundPosition: "center right" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E13] via-[#0B0E13]/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 h-full">
        <div className="text-left text-white max-w-2xl py-20 flex flex-col justify-center">
          <h1 
            className="font-billgest text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: hero.titulo }} 
          />
          <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-light max-w-lg">
            {hero.subtitulo}
          </p>
          <div>
            <Link href={hero.link_botao}>
              <button className="px-8 py-4 bg-[#F2ECE4] text-[#0B0E13] rounded-md font-semibold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                {hero.texto_botao}
              </button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}