import React from 'react';

import MainLayout from '../containers/main-layout';

const App: React.FC = () => {
  return (
    <MainLayout>
      Доска
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;
