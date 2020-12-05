const props = { props: {} };

import { check } from 'api/user';

export default async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie;
  const isAuthRoute =
    ['/home', '/login', '/register'].indexOf(ctx.resolvedUrl) === -1;

  try {
    const { data } = await check({ headers: { cookie } });
    return isAuthRoute
      ? {
          props: {
            id: data.id,
            name: data.name,
            admin: data.admin,
            badge: data.badge,
          },
        }
      : {
          redirect: {
            destination: '/',
            permanent: false,
          },
          props: {
            id: data.id,
            name: data.name,
            admin: data.admin,
            badge: data.badge,
          },
        };
  } catch (err) {
    console.log(err);
    return isAuthRoute
      ? {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        }
      : props;
  }
}
