import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BoardWrapper from "../containers/board-wrapper";
import MainLayout from "../containers/main-layout";
import { useAppSelector } from "../hooks";

const App: React.FC = () => {
  // const select = useAppSelector((state) => ({
  //   knightPosition: state.board.knightPosition,
  // }));

  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <BoardWrapper />
      </DndProvider>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;
