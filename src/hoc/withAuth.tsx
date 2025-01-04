import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constants/auth';

export function withAuth<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (!token) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
