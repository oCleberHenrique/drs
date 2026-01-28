export default function ContatoPage() {
  return (
    <div className="bg-white font-jakarta">
       {/* Banner */}
       <div className="bg-[#3D0C11] py-24 text-center">
        <h1 className="font-billgest text-5xl text-white">Fale Conosco</h1>
        <p className="text-[#D8B48D] mt-4 text-lg">Estamos prontos para ouvir você</p>
      </div>

      <div className="container mx-auto px-4 py-20">
         <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Informações */}
            <div className="space-y-8">
               <h2 className="font-billgest text-3xl text-[#3D0C11]">Informações de Contato</h2>
               <p className="text-gray-600 text-lg">
                  Entre em contato para agendar uma reunião ou tirar dúvidas sobre nossos serviços.
               </p>
               
               <div className="space-y-4 mt-8">
                  <div className="p-6 bg-gray-50 border-l-4 border-[#D8B48D]">
                     <h3 className="font-bold text-[#3D0C11]">Endereço</h3>
                     <p className="text-gray-600">Av. Paulista, 1000 - Sala 42, São Paulo - SP</p>
                  </div>
                  <div className="p-6 bg-gray-50 border-l-4 border-[#D8B48D]">
                     <h3 className="font-bold text-[#3D0C11]">Telefone / WhatsApp</h3>
                     <p className="text-gray-600">(11) 9.9999-9999</p>
                  </div>
                  <div className="p-6 bg-gray-50 border-l-4 border-[#D8B48D]">
                     <h3 className="font-bold text-[#3D0C11]">E-mail</h3>
                     <p className="text-gray-600">contato@dsrsolucoes.com.br</p>
                  </div>
               </div>
            </div>

            {/* Formulário */}
            <div className="bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg">
               <form className="space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-[#3D0C11] mb-2">Nome Completo</label>
                     <input type="text" className="w-full p-3 border border-gray-300 rounded focus:border-[#3D0C11] outline-none" placeholder="Seu nome" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#3D0C11] mb-2">E-mail</label>
                     <input type="email" className="w-full p-3 border border-gray-300 rounded focus:border-[#3D0C11] outline-none" placeholder="seu@email.com" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#3D0C11] mb-2">Telefone</label>
                     <input type="tel" className="w-full p-3 border border-gray-300 rounded focus:border-[#3D0C11] outline-none" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#3D0C11] mb-2">Mensagem</label>
                     <textarea className="w-full p-3 border border-gray-300 rounded focus:border-[#3D0C11] outline-none h-32" placeholder="Como podemos ajudar?"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#3D0C11] text-white font-bold rounded hover:bg-[#D8B48D] transition-colors shadow-lg">
                     Enviar Mensagem
                  </button>
               </form>
            </div>

         </div>
      </div>
    </div>
  );
}