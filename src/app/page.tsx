'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import LoginClient from './loginClient';

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-12">
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/isotype-LeB08fSQGXtfo1SZlZNz14X5gfqaC8.png" alt="Accenture" width={412} height={122} className="h-12 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-center text-accenture-purple mb-2">Bienvenido de Nuevo</h1>
          <p className="text-center text-gray-600 mb-10">Porfavor Ingresa tus Datos</p>

          <Suspense fallback={<div>Cargando formulario...</div>}>
            <LoginClient />
          </Suspense>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/40 z-10"></div>
        <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accenture-bg-vTIDqKvXJRJZWNbQI53x86YqsvhyrS.png" alt="Accenture Building" fill className="object-cover" priority />
      </div>
    </div>
  );
}
