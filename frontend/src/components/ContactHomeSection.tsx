import Link from "next/link";

interface HomeContatoData {
  subtitulo: string;
  titulo: string;
  descricao: string;
  texto_whatsapp: string;
  link_whatsapp: string;
  texto_botao_form: string;
}

async function getData(): Promise<HomeContatoData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/home-contato/`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const lista = data.results || data || [];
    return lista.length > 0 ? lista[0] : null;
  } catch (error) { return null; }
}

export default async function ContactHomeSection() {
  const data = await getData();

  if (!data) return null;

  return (
    <section className="py-24 bg-[#FBFBFB]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LADO ESQUERDO: Textos e WhatsApp */}
          <div className="space-y-8">
            
            {/* Subtítulo com Ícone */}
            <div className="flex items-center gap-3">
               <div className="text-[#3D0C11]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <span className="font-jakarta text-[#3D0C11] font-bold text-lg">
                 {data.subtitulo}
               </span>
            </div>

            <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11] leading-tight">
              {data.titulo}
            </h2>
            
            {/* Renderiza o texto respeitando quebras de linha */}
            <div className="prose prose-lg text-gray-800 font-jakarta leading-relaxed whitespace-pre-line">
              {data.descricao}
            </div>

            {/* Botão WhatsApp */}
            <div className="pt-4">
                <Link href={data.link_whatsapp} target="_blank">
                    <button className="flex items-center gap-3 px-8 py-4 bg-[#3D0C11] text-white rounded-sm font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        {/* Ícone Wpp */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {data.texto_whatsapp}
                    </button>
                </Link>
            </div>
          </div>

          {/* LADO DIREITO: Formulário */}
          <div className="bg-white p-0 md:p-4 rounded-xl">
             <form className="space-y-6">
                
                {/* Campo Nome */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#3D0C11] font-bold text-sm">Nome:</label>
                    <input 
                        type="text" 
                        placeholder="Digite seu nome completo" 
                        className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
                    />
                </div>

                {/* Campo E-mail */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#3D0C11] font-bold text-sm">E-mail:</label>
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
                    />
                </div>

                {/* Campo Telefone */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#3D0C11] font-bold text-sm">Telefone:</label>
                    <input 
                        type="tel" 
                        placeholder="(21) 9.9999-9999" 
                        className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
                    />
                </div>

                {/* Botão Enviar (Alinhado à direita) */}
                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-8 py-3 bg-[#3D0C11] text-white rounded-sm font-medium hover:bg-opacity-90 transition-all shadow-md">
                        {data.texto_botao_form}
                    </button>
                </div>

             </form>
          </div>

        </div>
      </div>
    </section>
  );
}