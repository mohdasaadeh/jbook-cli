import { CellActionTypes } from "../action-types";
import { CellTypes, CellMoveDirections } from "../types";
import { Cell } from "../reducers";

export interface InsertCellAction {
  type: CellActionTypes.INSERT_CELL;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface MoveCellAction {
  type: CellActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: CellMoveDirections;
  };
}

export interface DeleteCellAction {
  type: CellActionTypes.DELETE_CELL;
  payload: string;
}

export interface UpdateCellAction {
  type: CellActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface FetchCells {
  type: CellActionTypes.FETCH_CELLS;
}

export interface FetchCellsComplete {
  type: CellActionTypes.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsError {
  type: CellActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsError {
  type: CellActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type CellAction =
  | InsertCellAction
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | FetchCells
  | FetchCellsComplete
  | FetchCellsError
  | SaveCellsError;
