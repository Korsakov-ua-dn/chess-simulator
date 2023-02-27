import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Board } from "../components/board";
import BoardWrapper from "../components/board-wrapper";
import MainLayout from "../containers/main-layout";

const App: React.FC = () => {

  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <BoardWrapper>
          <Board />
        </BoardWrapper>
      </DndProvider>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;
