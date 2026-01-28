import { Atuacao } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import { Icon } from "@/components/Icon";
import Link from "next/link";

async function getAtuacoes(): Promise<Atuacao[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/atuacoes/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (error) { return []; }
}

export default async function AtuacoesPage() {
  const atuacoes = await getAtuacoes();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner Simples */}
      <div className="bg-[#3D0C11] py-20 text-center">
        <h1 className="font-billgest text-5xl text-white">Nossas Atuações</h1>
        <p className="text-[#D8B48D] mt-4 text-lg">Excelência jurídica em diversas áreas</p>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {atuacoes.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 overflow-hidden relative">
                 {/* Se tiver imagem de capa, mostra, senão um fundo padrão */}
                 {item.imagem_capa ? (
                    <img src={getImageUrl(item.imagem_capa)} alt={item.titulo} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Icon name={item.icone} className="w-12 h-12 text-gray-400" />
                    </div>
                 )}
              </div>
              <div className="p-8">
                <h3 className="font-billgest text-2xl text-[#3D0C11] mb-3">{item.titulo}</h3>
                <p className="text-gray-600 line-clamp-3 mb-6 font-jakarta">{item.descricao_curta}</p>
                <Link href={`/atuacoes/${item.slug}`}>
                  <button className="text-[#3D0C11] font-bold uppercase text-sm tracking-wide border-b-2 border-[#D8B48D] pb-1 hover:text-[#D8B48D] transition-colors">
                    Ler Mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}