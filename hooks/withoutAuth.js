import { useRouter } from 'next/router';

const withoutAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const router = useRouter();
    const isLoggedIn = localStorage.getItem('user');

    if (isLoggedIn) {
      router.push('/user/dashboard');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Authenticated.getInitialProps = async (ctx) => {
    // Implement your logic here to check if the user is authenticated
//     let isLoggedIn = false;

//   if (typeof window !== 'undefined') {
//     isLoggedIn = localStorage.getItem('user');
//   }
//     if (!isLoggedIn) {
//       if (ctx.res) {
//         ctx.res.writeHead(302, {
//           Location: '/',
//         });
//         ctx.res.end();
//       } else {
//         router.push('/');
//       }
//     }

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps };
  };

  return Authenticated;
};

export default withoutAuth;
