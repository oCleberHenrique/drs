"use client";

import { useState } from "react";

interface ContactFormProps {
  textoBotao: string;
}

export default function ContactForm({ textoBotao }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${apiUrl}/api/contato/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Mensagem enviada com sucesso!" });
        setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
      } else {
        const error = await res.json();
        setMessage({
          type: "error",
          text: error.message || "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erro ao enviar mensagem. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campo Nome */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-[#3D0C11] font-bold text-sm">
          Nome:
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite seu nome completo"
          className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
        />
      </div>

      {/* Campo E-mail */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[#3D0C11] font-bold text-sm">
          E-mail:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Digite seu e-mail"
          className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
        />
      </div>

      {/* Campo Telefone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="telefone" className="text-[#3D0C11] font-bold text-sm">
          Telefone:
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(21) 9.9999-9999"
          className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white"
        />
      </div>

      {/* Campo Mensagem */}
      <div className="flex flex-col gap-2">
        <label htmlFor="mensagem" className="text-[#3D0C11] font-bold text-sm">
          Mensagem:
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Como podemos ajudar?"
          rows={4}
          className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-[#3D0C11] transition-colors bg-white resize-none"
        />
      </div>

      {/* Mensagem de feedback */}
      {message && (
        <div
          className={`p-4 rounded ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Botão Enviar */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#3D0C11] text-white rounded-sm font-medium hover:bg-opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : textoBotao}
        </button>
      </div>
    </form>
  );
}
