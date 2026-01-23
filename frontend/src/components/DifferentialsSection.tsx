import { Diferencial } from "@/types";

async function getDiferenciais(): Promise<Diferencial[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch("http://backend:8000/api/diferenciais/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (error) {
    console.error("Erro ao buscar diferenciais:", error);
    return [];
  }
}

export default async function DifferentialsSection() {
  const diferenciais = await getDiferenciais();

  if (diferenciais.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título da Seção com Ícone SVG */}
        <div className="flex items-center justify-center gap-3 mb-16">
          {/* Ícone SVG que você colocou na pasta public */}
          <img 
            src="/icone-diferenciais.svg" 
            alt="Ícone" 
            className="w-8 h-8 md:w-10 md:h-10 text-[#3D0C11]" 
          />
          <h2 className="font-billgest text-4xl md:text-5xl text-[#3D0C11]">
            Diferenciais
          </h2>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {diferenciais.map((item) => (
            <div 
              key={item.id}
              className="bg-[#3D0C11] p-10 rounded-sm text-white hover:-translate-y-2 transition-transform duration-300 shadow-xl flex flex-col justify-center min-h-[280px]"
            >
              <h3 className="text-2xl font-jakarta font-semibold mb-6 leading-tight">
                {item.titulo}
              </h3>
              <p className="text-gray-300 font-jakarta leading-relaxed text-sm md:text-base">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}