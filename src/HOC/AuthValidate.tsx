import { useRouter } from 'next/navigation';
import { useEffect, useState, ComponentType, ReactNode } from 'react';

interface WithAuthProps {
  children?: ReactNode;
}

function withAuth<T extends WithAuthProps>(WrappedComponent: ComponentType<T>) {
  const AuthenticatedComponent = (props: T) => {
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
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Asignar un displayName
  AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
}

export default withAuth;
