import React, { useLayoutEffect } from "react";
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' // or any other pipeline

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
      <DndProvider options={HTML5toTouch}>
        <BoardController />
      </DndProvider>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;