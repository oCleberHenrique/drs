import { getImageUrl } from "@/utils/imageUrl";
import Link from "next/link";
import { notFound } from "next/navigation";

// Buscar dados pelo SLUG
async function getAtuacaoDetalhe(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    // Usa o lookup_field 'slug' diretamente na URL
    const res = await fetch(`${apiUrl}/api/atuacoes/${slug}/`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) { return null; }
}

export default async function AtuacaoInterna({ params }: { params: { slug: string } }) {
  const atuacao = await getAtuacaoDetalhe(params.slug);

  if (!atuacao) return notFound();

  return (
    <div className="bg-white font-jakarta pb-20">
      {/* Banner Topo (Max 300px) */}
      <div className="w-full h-[300px] bg-[#3D0C11] relative flex items-center justify-center">
         {atuacao.imagem_capa && (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url('${getImageUrl(atuacao.imagem_capa)}')` }}
            ></div>
         )}
         <div className="relative z-10 text-center px-4">
             <h1 className="font-billgest text-4xl md:text-6xl text-white">{atuacao.titulo}</h1>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
         <div className="grid lg:grid-cols-12 gap-12">
            {/* Conteúdo (Esquerda) */}
            <div className="lg:col-span-8">
               <h2 className="font-billgest text-3xl text-[#3D0C11] mb-6">Sobre a área</h2>
               {/* Renderiza o conteúdo (pode ser HTML rico do Django) */}
               <div 
                 className="prose prose-lg text-gray-600 max-w-none whitespace-pre-line text-justify"
                 dangerouslySetInnerHTML={{ __html: atuacao.conteudo || atuacao.descricao_curta }}
               />
               
               {/* CTA ao final */}
               <div className="mt-12 p-8 bg-gray-50 rounded-lg border-l-4 border-[#3D0C11]">
                  <h3 className="font-bold text-xl mb-2 text-[#3D0C11]">Precisa de apoio nesta área?</h3>
                  <p className="text-gray-600 mb-6">Nossa equipe de especialistas está pronta para analisar o seu caso.</p>
                  <Link href="/contato">
                     <button className="px-8 py-3 bg-[#3D0C11] text-white font-bold rounded hover:bg-[#D8B48D] transition-colors">
                        Falar com Especialista
                     </button>
                  </Link>
               </div>
            </div>

            {/* Lateral (Imagem ou Menu) */}
            <div className="lg:col-span-4 space-y-8">
               {atuacao.imagem_capa && (
                  <img 
                    src={getImageUrl(atuacao.imagem_capa)} 
                    alt={atuacao.titulo} 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
               )}
               <div className="bg-[#3D0C11] p-6 rounded text-white">
                  <h4 className="font-billgest text-xl mb-4 text-[#D8B48D]">Outras Áreas</h4>
                  <ul className="space-y-3">
                     <li><Link href="/atuacoes" className="hover:text-[#D8B48D]">Ver todas as atuações &rarr;</Link></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}