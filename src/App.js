import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.authReducer.signed);

  const Routes = createRouter(signed);

  return <Routes />;
}
