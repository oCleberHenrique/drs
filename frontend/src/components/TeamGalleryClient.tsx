"use client";
import { useState } from "react";
import { MembroEquipe } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import { X, Linkedin, Mail } from "lucide-react";

export default function TeamGalleryClient({ members }: { members: MembroEquipe[] }) {
  const [selectedMember, setSelectedMember] = useState<MembroEquipe | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-4 gap-8">
        {members.map((member) => (
          <div key={member.id} className="group cursor-pointer" onClick={() => setSelectedMember(member)}>
             <div className="h-[350px] overflow-hidden rounded-lg relative">
                <img 
                   src={getImageUrl(member.foto)} 
                   alt={member.nome} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#3D0C11]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white border border-white px-6 py-2 uppercase tracking-widest text-sm hover:bg-white hover:text-[#3D0C11] transition-colors">Ver Perfil</span>
                </div>
             </div>
             <div className="mt-4 text-center">
                <h3 className="font-billgest text-2xl text-[#3D0C11]">{member.nome}</h3>
                <p className="text-[#D8B48D] font-medium">{member.cargo}</p>
             </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
           <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
              
              {/* Foto Modal */}
              <div className="md:w-1/3 h-[300px] md:h-auto relative">
                 <img src={getImageUrl(selectedMember.foto)} className="w-full h-full object-cover" alt={selectedMember.nome} />
              </div>

              {/* Conteúdo Modal */}
              <div className="md:w-2/3 p-8 md:p-12 relative overflow-y-auto max-h-[80vh]">
                 <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X size={24} />
                 </button>

                 <h2 className="font-billgest text-4xl text-[#3D0C11] mb-1">{selectedMember.nome}</h2>
                 <p className="text-[#D8B48D] text-lg font-medium mb-6">{selectedMember.cargo}</p>

                 <div className="prose text-gray-600 mb-8 whitespace-pre-line">
                    {/* Aqui viria o currículo/bio */}
                    {/* Se não tiver campo bio no backend, usamos um placeholder ou adicionamos depois */}
                    <p>Especialista com vasta experiência na área, focado em entregar resultados de excelência...</p> 
                 </div>

                 <div className="flex gap-4 border-t pt-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#0077b5]">
                       <Linkedin size={20} /> LinkedIn
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#3D0C11]">
                       <Mail size={20} /> E-mail
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}