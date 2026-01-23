import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 font-jakarta border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-billgest text-white block">
              DSR
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Transformamos a gestão do seu negócio com inteligência corporativa, 
              estratégia tributária e visão de futuro.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-white font-billgest text-xl mb-6">Navegação</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="/quem-somos" className="hover:text-purple-400 transition-colors">Quem Somos</Link></li>
              <li><Link href="/atuacoes" className="hover:text-purple-400 transition-colors">Áreas de Atuação</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400 transition-colors">Blog & Notícias</Link></li>
              <li><Link href="/contato" className="hover:text-purple-400 transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Atuações (Destaques) */}
          <div>
            <h3 className="text-white font-billgest text-xl mb-6">Expertise</h3>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400">Consultoria Tributária</li>
              <li className="text-gray-400">Gestão Financeira</li>
              <li className="text-gray-400">Auditoria Interna</li>
              <li className="text-gray-400">Compliance</li>
              <li className="text-gray-400">BPO Financeiro</li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-billgest text-xl mb-6">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                <span>Av. Paulista, 1000 - Sala 42<br/>São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <span>contato@dsrsolucoes.com.br</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Faixa Inferior */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {currentYear} DSR Soluções Corporativas. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}