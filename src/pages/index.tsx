import React, { useLayoutEffect } from "react";

import { BoardController } from "../modules/board-controller";
import MainLayout from "../containers/main-layout";
import { useAppDispatch } from "../hooks";
import { init } from "../modules/board-controller/board-slice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(init())
  }, [dispatch]);

  return (
    <MainLayout>
      <BoardController />
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;