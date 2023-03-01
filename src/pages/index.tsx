import React, { useLayoutEffect } from "react";
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' // or any other pipeline

import { BoardController } from "../containers/board-controller";
import MainLayout from "../containers/main-layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { init } from "../store/board-slice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    pieces: state.board.pieces,
    loading: state.board.loading,
    error: state.board.error,
  }));

  // Object.keys(obj).length

  useLayoutEffect(() => {
    dispatch(init())
  }, [dispatch]);

  return (
    <MainLayout>
      <DndProvider options={HTML5toTouch}>
        <BoardController />
      </DndProvider>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;