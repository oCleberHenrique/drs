import { MembroEquipe } from "@/types";
import TeamGalleryClient from "@/components/TeamGalleryClient";
import { getApiUrl } from "@/utils/api";

async function getEquipe(): Promise<MembroEquipe[]> {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/api/equipe/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (error) { return []; }
}

export default async function EquipePage() {
  const members = await getEquipe();

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-[#3D0C11] py-24 text-center">
        <h1 className="font-billgest text-5xl text-white">Nosso Time</h1>
        <p className="text-[#D8B48D] mt-4 text-lg">Talentos unidos pelo propósito de servir</p>
      </div>

      <div className="container mx-auto px-4 mt-20">
         <TeamGalleryClient members={members} />
      </div>
    </div>
  );
}