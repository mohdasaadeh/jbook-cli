import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import { saveCellsMiddleware } from "./middlewares/saveCells";

export const store = createStore(
  reducers,
  applyMiddleware(thunk, saveCellsMiddleware)
);
