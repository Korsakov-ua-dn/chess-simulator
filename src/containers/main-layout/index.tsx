import React, { useLayoutEffect } from 'react';

import Layout from '../../components/layout';
interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = (props) => {

  useLayoutEffect(() => {
    // init app
  }, []);

  return (
    <Layout>
      {props.children}
    </Layout>
  );
};

export default React.memo(MainLayout);
