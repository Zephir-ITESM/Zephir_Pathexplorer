'use client';

import React from 'react';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/auth/actions';
import { Loader2 } from 'lucide-react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/checkbox'
import { Icon } from '@/components/ui/icons';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invalidToken = searchParams.get('invalidToken') === 'true';
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: '',
    redirectTo: '',
    sessionId: '',
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


      <div className='flex flex-col gap-y-4'>
        <div className="space-y-2">
          <Input
          id='email'
          fullWidth={true}
          name='email'
          isRequired
          className="max-w"
          label="Correo"
          type="email"
          /> 
        </div>

        <div className="space-y-2">
          <Input
            className="max-w"
            fullWidth={true}
            endContent={
              <div className="flex items-center justify-center h-full">
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none m-auto"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Icon
                      name="icon-crossed-eye"
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <Icon
                      name="icon-eye"
                      className="text-2xl text-default-400 pointer-events-none"
                      />
                  )}
                </button>
              </div>
            }
            label="Contraseña"
            type={isVisible ? "text" : "password"}
            id='password'
            name='password'
            isRequired
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            color="primary">
              Mantener Sesion
          </Checkbox>
        </div>

        <div className="text-sm">
          {/*<link href="/auth/forgot-password" className="text-accenture-purple hover:underline">
            Olvidaste tu contraseña
          </link>*/}
        </div>
      </div>
      <Button 
        color="default" 
        type="submit"
        fullWidth={true}
        >
        Iniciar sesión
      </Button>
    </form>
  );
}
