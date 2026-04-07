'use client';

import React, { useState } from 'react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    company: '',
    date: '',
    time: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const scheduledDateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

      const response = await fetch('/api/diagnostic/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: formData.clientName,
          email: formData.email,
          company: formData.company,
          scheduledAt: scheduledDateTime,
        }),
      });

      if (response.ok) {
        setMessage('¡Diagnóstico agendado exitosamente! Revisa tu email para confirmar.');
        setFormData({ clientName: '', email: '', company: '', date: '', time: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error || 'No se pudo agendar el diagnóstico'}`);
      }
    } catch (error) {
      setMessage('Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-on-primary-fixed rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold text-primary">Agendar Diagnóstico</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-on-surface">Nombre</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-on-surface">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-on-surface">Empresa</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-on-surface">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-on-surface">Hora</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-sm ${message.includes('Error') ? 'bg-error/10 text-error' : 'bg-[#2A915E]/10 text-[#2A915E]'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-container transition-all disabled:opacity-50"
          >
            {isLoading ? 'Agendando...' : 'Agendar diagnóstico'}
          </button>
        </form>
      </div>
    </div>
  );
}
