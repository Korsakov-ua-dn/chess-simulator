import React from "react";

import Layout from "../../components/layout";
import { useAppSelector } from "../../hooks";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = (props) => {
  const select = useAppSelector((state) => ({
    pieces: state.board.pieces,
    loading: state.board.loading,
    error: state.board.error,
  }));

  return (
    <Layout>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!Object.keys(select.pieces).length && props.children}
    </Layout>
  );
};

export default React.memo(MainLayout);
