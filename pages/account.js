import NavWrapper from '../components/NavWrapper';
import AccountSettings from '../components/AccountSettings';
import Head from 'next/head';

const account = () => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie.includes('token')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <NavWrapper>
        <AccountSettings />
      </NavWrapper>
    </>
  );
};

export default account;
