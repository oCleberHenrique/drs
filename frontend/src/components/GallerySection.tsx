"use client";

import { useState } from "react";
import { getImageUrl } from "@/utils/imageUrl";
import { X } from "lucide-react";
import { GaleriaItem } from "@/types"; // <--- Importando do arquivo global

export default function GallerySection({ imagens }: { imagens: GaleriaItem[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!imagens || imagens.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="font-billgest text-4xl text-[#3D0C11] text-center mb-12">Nossa Estrutura</h3>
        
        {/* Grid de Imagens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imagens.map((item) => (
            <div 
              key={item.id} 
              className="h-64 cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImage(getImageUrl(item.imagem))}
            >
              <img 
                src={getImageUrl(item.imagem)} 
                alt={item.legenda} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Modal (Lightbox) */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gray-300">
              <X size={48} />
            </button>
            <img 
              src={selectedImage} 
              alt="Zoom" 
              className="max-w-full max-h-[90vh] rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
      </div>
    </section>
  );
}