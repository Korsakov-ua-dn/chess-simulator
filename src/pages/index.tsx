import React, { useLayoutEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BoardController } from "../containers/board-controller";
import MainLayout from "../containers/main-layout";
import { useAppDispatch } from "../hooks";
import { boardActions } from "../store/board-slice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   dispatch(boardActions.init())
  // }, [dispatch]);

  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <BoardController />
      </DndProvider>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;