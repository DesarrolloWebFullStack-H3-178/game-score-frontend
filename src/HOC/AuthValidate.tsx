import { useRouter } from 'next/navigation';
import { useEffect, useState, ComponentType, ReactNode } from 'react';

interface WithAuthProps {
  children?: ReactNode;
}

function withAuth<T extends WithAuthProps>(WrappedComponent: ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push('/auth/login');
      }
    }, [router]);

    if (!isAuthenticated) {
      return null; // Puedes mostrar un indicador de carga si lo prefieres
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
