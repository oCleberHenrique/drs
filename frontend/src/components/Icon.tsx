import { 
  Scale, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  BarChart3, 
  PieChart,
  Users,
  Building2,
  LucideIcon
} from "lucide-react";

// Mapeamento de string para componente
const icons: Record<string, LucideIcon> = {
  "scale": Scale,
  "star": Star,
  "shield-check": ShieldCheck,
  "briefcase": Briefcase,
  "bar-chart": BarChart3,
  "pie-chart": PieChart,
  "users": Users,
  "building": Building2,
};

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  // Se o ícone não existir no mapa, usa o Star como fallback
  const IconComponent = icons[name] || Star;
  return <IconComponent className={className} />;
};