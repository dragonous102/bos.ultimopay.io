import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import cookie from 'js-cookie';
const withAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const router = useRouter();
    const isLoggedIn = localStorage.getItem('user');

    if (!isLoggedIn) {
      router.push('/');
      return null;
    }
    const [user, setUserData] = useState(null)
    useEffect(() => {
      const userser = JSON.parse(isLoggedIn)
      const user = userser.res.data.signinResponse;
      const newData =  RefreshToken(user);
        setUserData(newData);
        
    }, [router])

    const RefreshToken = async (user) => {
    await  userService.refreshToken(user).then((d) => {
           user.auth_token = d.data.refreshTokenResponse.auth_token;
          
          const newUserdata = {res: {data:{signinResponse : user}}};
          

          localStorage.setItem('user', JSON.stringify(newUserdata));
          cookie.set('user', JSON.stringify({ newUserdata }), { path: '/' });
          return newUserdata;

      }).catch((d) => {
        //localStorage.removeItem('user')
       // router.push('/');
        //return null;
      })
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

export default withAuth;
