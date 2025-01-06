import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '@/lib/storage';

export function withAuth<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();

    useEffect(() => {
      const token = getUserData()?.token;
      if (!token) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
