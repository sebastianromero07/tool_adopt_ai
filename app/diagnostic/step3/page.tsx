'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/src/frontend/components/TopNavBar';

interface Step3FormData {
  fullName: string;
  email: string;
  position: string;
  company: string;
  employeeCount: string;
}

const employeeRanges = [
  { id: '5-15', label: '5-15' },
  { id: '15-50', label: '15-50' },
  { id: '50+', label: '50+ empleados' },
];

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<Step3FormData>({
    fullName: '',
    email: '',
    position: '',
    company: '',
    employeeCount: '15-50',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const diagData = JSON.parse(localStorage.getItem('diagnosticData') || '{}');
    setFormData((prev) => ({
      ...prev,
      ...diagData,
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectEmployeeCount = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      employeeCount: id,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('El nombre completo es requerido');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Por favor ingresa un email válido');
      return false;
    }
    if (!formData.position.trim()) {
      setError('El cargo o área es requerido');
      return false;
    }
    if (!formData.company.trim()) {
      setError('El nombre de la empresa es requerido');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Obtener todos los datos del diagnóstico del localStorage
      const diagData = JSON.parse(localStorage.getItem('diagnosticData') || '{}');

      // Guardar los datos de Step3 en localStorage también
      localStorage.setItem('diagnosticData', JSON.stringify({
        ...diagData,
        fullName: formData.fullName,
        email: formData.email,
        position: formData.position,
        company: formData.company,
        employeeCount: formData.employeeCount,
      }));

      // ✅ AHORA ENVIAMOS TODOS LOS DATOS AL BACKEND
      const response = await fetch('/api/diagnostic/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Datos de contacto (STEP 3)
          clientName: formData.fullName,
          email: formData.email,
          company: formData.company,
          position: formData.position,
          employeeCount: formData.employeeCount,
          
          // Datos del diagnóstico (STEP 1 Y 2)
          mainChallenge: diagData.mainChallenge || 'No especificado',
          customChallenge: diagData.customChallenge || null,
          context: diagData.context || 'No especificado',
          
          // Fecha del diagnóstico
          scheduledAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Error al procesar el diagnóstico';
        
        if (contentType?.includes('application/json')) {
          try {
            const data = await response.json();
            errorMessage = data.error || errorMessage;
          } catch (e) {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
          }
        } else {
          errorMessage = `Error ${response.status}: ${response.statusText}. Por favor, verifica la configuración del servidor.`;
        }
        throw new Error(errorMessage);
      }      // Obtener la respuesta del servidor
      const responseData = await response.json();
      console.log('✅ Respuesta del servidor:', responseData);

      setSuccess(true);
      
      // Guardar el sessionId en localStorage para uso posterior
      if (responseData.sessionId) {
        localStorage.setItem('lastSessionId', responseData.sessionId);
      }

      setTimeout(() => {
        const sessionId = responseData.sessionId;
        if (sessionId) {
          router.push(`/diagnostic/processing?sessionId=${sessionId}`);
        } else {
          router.push('/diagnostic/processing');
        }
      }, 1000);
    } catch (err) {
      let errorMessage = 'Error al procesar el formulario';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.position && formData.company;
  return (
    <>
      <TopNavBar />
      <main className="flex items-center justify-center p-4 bg-surface text-on-surface min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-12px_rgba(25,28,30,0.04)] overflow-hidden relative border border-outline-variant/10">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-surface-container-highest">
            <div className="h-full bg-gradient-to-r from-primary to-primary-container w-full transition-all duration-500" />
          </div>          <div className="p-8 md:p-10">
            {/* Header Section */}
            <header className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface mb-3 leading-tight">
                Ultimo paso: Conectemos tu vision con nuestra tecnologia
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                Completa tus datos para agendar tu primera visita de diagnostico y empezar a medir el ROI.
              </p>
            </header>            {error && (
              <div className="mb-5 p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-800 flex items-center gap-2 text-xs md:text-sm">
                <span className="material-symbols-outlined text-sm">error</span>
                <p className="font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-5 p-4 rounded-lg bg-green-50 border-2 border-green-200 text-green-800 flex items-center gap-2 text-xs md:text-sm">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <p className="font-medium">Informacion enviada correctamente. Redirigiendo...</p>
              </div>
            )}            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5">              {/* Input Group: Grid for split layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">                {/* Nombre Completo */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">
                    Nombre Completo
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-sm">person</span>                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all placeholder:text-outline/60 text-on-surface text-sm font-medium"
                      placeholder="Ej. Juan Perez"
                    />
                  </div>
                </div>                {/* Correo */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">
                    Correo Corporativo
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-sm">mail</span>                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all placeholder:text-outline/60 text-on-surface text-sm font-medium"
                      placeholder="juan@empresa.com"
                    />
                  </div>
                </div>
              </div>              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Cargo */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">
                    Cargo o Area
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-sm">work</span>                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all placeholder:text-outline/60 text-on-surface text-sm font-medium"
                      placeholder="Director de Operaciones"
                    />
                  </div>
                </div>                {/* Empresa */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">
                    Empresa
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-sm">corporate_fare</span>                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 bg-surface-container-low border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all placeholder:text-outline/60 text-on-surface text-sm font-medium"
                      placeholder="AdoptAI Solutions"
                    />
                  </div>
                </div>
              </div>

              {/* Employees Range Selector */}              <div className="flex flex-col gap-3 mt-4">
                <label className="text-xs font-semibold text-on-surface-variant ml-1">
                  Numero de empleados
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {employeeRanges.map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => handleSelectEmployeeCount(range.id)}
                      className={`py-2.5 px-2 rounded-full text-xs font-bold transition-all ${
                        formData.employeeCount === range.id
                          ? 'bg-[#0D7EC0] text-white shadow-lg shadow-[#0D7EC0]/20 scale-[1.02]'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>              {/* Form Action */}
              <div className="pt-3 flex flex-col items-center gap-2">                <div className="w-full flex gap-2 items-center">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => router.push('/diagnostic/step2')}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-sm bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-base">
                      arrow_back
                    </span>
                    <span className="hidden sm:inline">Atras</span>
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`group flex-1 flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-lg font-bold text-sm transition-all ${
                      isFormValid && !isLoading
                        ? 'bg-[#0D7EC0] text-white hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-[#0D7EC0]/20'
                        : 'bg-surface-container-highest text-outline cursor-not-allowed opacity-50'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">hourglass_empty</span>
                        <span className="hidden sm:inline">Generando...</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Generar Roadmap</span>
                        <span className="sm:hidden">Generar</span>
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-base">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Decorative Subtle Background Element */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Contextual Aesthetic Background */}
        <div className="fixed inset-0 -z-10 bg-surface">
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#006196 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
        </div>
      </main>
    </>
  );
}
