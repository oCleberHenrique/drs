import { QuemSomosHomeData } from "@/types"; // <--- Mudamos o nome aqui
import { getImageUrl } from "@/utils/imageUrl";

async function getAboutData(): Promise<QuemSomosHomeData | null> {
  try {
    // Pega a URL correta (Vercel ou Local)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // CORREÇÃO CRÍTICA AQUI: Usamos a variável apiUrl, não o endereço fixo backend:8000
    const res = await fetch(`${apiUrl}/api/quem-somos-home/`, { cache: "no-store" });
    
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) {
    console.error("Erro ao buscar Quem Somos:", error);
    return null;
  }
}

export default async function AboutSection() {
  const data = await getAboutData();

  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO ESQUERDO: Imagens */}
          <div className="relative h-[350px] md:h-[400px] w-full max-w-lg mx-auto lg:mx-0 flex flex-col justify-center">
            
            {/* IMAGEM 1 (Fundo) */}
            <div className="absolute top-0 left-0 z-0">
                <img 
                    src={getImageUrl(data.imagem_fundo)}
                    alt="Detalhe escritório" 
                    className="w-[263px] h-[283px] object-cover rounded-sm shadow-sm opacity-90"
                />
            </div>

            {/* IMAGEM 2 (Frente) */}
            <div className="absolute top-[60px] left-[40px] md:left-[80px] z-10">
                <img 
                    src={getImageUrl(data.imagem_frente)}
                    alt="Escritório DSR" 
                    className="w-[300px] md:w-[450px] h-[200px] md:h-[290px] object-cover rounded-sm shadow-2xl border-4 border-white"
                />
            </div>

          </div>

          {/* LADO DIREITO: Texto */}
          <div className="space-y-6 mt-8 lg:mt-0">
            <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] leading-tight">
              {data.titulo}
            </h2>
            <div className="prose prose-lg text-gray-600 font-jakarta leading-relaxed whitespace-pre-line text-justify">
              {data.texto}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}