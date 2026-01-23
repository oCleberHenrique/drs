import { Icon } from "@/components/Icon";
import Navbar from "@/components/Navbar";
import { Atuacao } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";

// Função para buscar os dados de UMA atuação específica
async function getAtuacaoDetalhe(slug: string): Promise<Atuacao | null> {
  try {
    // Busca direto pelo SLUG na API do Django
    const res = await fetch(`http://backend:8000/api/atuacoes/${slug}/`, {
      cache: "no-store", // Garante dados sempre frescos
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Erro ao buscar detalhe:", error);
    return null;
  }
}

// Params no Next.js 15 agora são Promises, precisamos aguardar
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AtuacaoDetalhePage({ params }: PageProps) {
  // 1. Desembrulhar os parametros (Next 15)
  const { slug } = await params;
  
  // 2. Buscar dados no Backend
  const dados = await getAtuacaoDetalhe(slug);

  // 3. Se não achar (ex: slug errado), manda para página 404 oficial
  if (!dados) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col font-jakarta bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Cabeçalho da Página Interna */}
        <section className="bg-gray-50 py-16 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-purple-700 mb-6 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
              Voltar para Home
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center shrink-0">
                 <Icon name={dados.icone} className="w-8 h-8" />
              </div>
              <h1 className="font-billgest text-4xl md:text-5xl text-purple-950">
                {dados.titulo}
              </h1>
            </div>
          </div>
        </section>

        {/* Conteúdo do Artigo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              
              {/* Renderização do Texto */}
              {/* Nota: Futuramente podemos usar um parser de Markdown/HTML aqui */}
              <div className="prose prose-lg prose-purple text-gray-600 leading-relaxed whitespace-pre-line">
                {dados.conteudo || dados.descricao_curta}
              </div>

              {/* Botão de CTA no final do texto */}
              <div className="mt-16 p-8 bg-purple-900 rounded-2xl text-white text-center">
                <h3 className="font-billgest text-2xl mb-4">Precisa dessa solução na sua empresa?</h3>
                <p className="mb-8 opacity-90">Nossa equipe de especialistas está pronta para desenhar o projeto ideal para você.</p>
                <Link 
                  href="/contato"
                  className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Falar com Consultor
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}