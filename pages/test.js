import React from 'react';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import NavWrapper from '../components/NavWrapper';
import { parseCookies } from 'nookies';
const Test = () => {
  const token = Cookies.get('token');
  let { token: token2 } = parseCookies();

  const { data } = useSWR(['/chargers', `Bearer ${token2} `]);
  console.log('test');
  return <NavWrapper></NavWrapper>;
};

export default Test;
