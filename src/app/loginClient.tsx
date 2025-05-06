'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/auth/actions';
import { Loader2 } from 'lucide-react';
import { CustomInput } from '@/components/ui/input';
import { CustomPasswordInput } from '@/components/ui/password-input';
import { CustomButton } from '@/components/ui/button';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invalidToken = searchParams.get('invalidToken') === 'true';

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: '',
    redirectTo: '',
  });

  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  useEffect(() => {
    if (invalidToken) {
      fetch('/api/auth/clear-cookies');
    }
  }, [invalidToken]);

  return (
    <form className="space-y-6" action={formAction}>
      {state.message && (
        <div
          className={`p-3 rounded-md ${
            state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </div>
      )}

      {invalidToken && (
        <div className="p-3 rounded-md bg-yellow-50 text-yellow-700">
          Tu sesión ha expirado. Por favor inicia sesión nuevamente.
        </div>
      )}

      <div className="space-y-2">
        <CustomInput
          id="email"
          name="email"
          type="email"
          label="Correo"
          placeholder="correo@ejemplo.com"
          disabled={isPending}
          required
        />
      </div>

      <div className="space-y-2">
        <CustomPasswordInput
          id="password"
          name="password"
          label="Contraseña"
          placeholder=""
          disabled={isPending}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-[#a100ff] focus:ring-[#a100ff]"
            disabled={isPending}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Mantener sesión
          </label>
        </div>

        <div className="text-sm">
          {/*<link href="/auth/forgot-password" className="text-accenture-purple hover:underline">
            Olvidaste tu contraseña
          </link>*/}
        </div>
      </div>

      <CustomButton
        disabled={isPending}
        variant="purple"
        size="sm"
        className="w-full"
        action={{ type: 'submit' }}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </CustomButton>
    </form>
  );
}
