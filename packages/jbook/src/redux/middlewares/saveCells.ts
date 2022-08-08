import { Dispatch } from "redux";
import axios from "axios";

import { CellAction } from "../actions";
import { CellActionTypes } from "../action-types";
import { RootState } from "../reducers";

export const saveCellsMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<CellAction>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: CellAction) => void) => {
    return (action: CellAction) => {
      next(action);

      if (
        [
          CellActionTypes.MOVE_CELL,
          CellActionTypes.UPDATE_CELL,
          CellActionTypes.INSERT_CELL,
          CellActionTypes.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(async () => {
          const { cells } = getState();

          if (cells) {
            const { order, data } = cells;

            const cellsData = order.map((id) => data[id]);

            try {
              await axios.post("/cells", { cells: cellsData });
            } catch (error: any) {
              dispatch({
                type: CellActionTypes.SAVE_CELLS_ERROR,
                payload: error.message,
              });
            }
          }
        }, 250);
      }
    };
  };
};
