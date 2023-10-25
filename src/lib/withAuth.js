"use client"; // This is a client component 👈🏽"
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
      // Check if the user is authenticated (you need to implement this logic)
      const isAuthenticated = !!getCookie('token')

      if (!isAuthenticated) {
        // Redirect to the login page with the original requested route as a query parameter
        router.push('/login');
      }else{
        router.push(pathName);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
