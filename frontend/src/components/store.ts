import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export function ImagesListReducer(
  state = {},
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOAD_IMAGES": {
      return { load: true, data: undefined, error: undefined };
    }
    case "DATA_IMAGES": {
      return { load: false, data: action.payload, error: undefined };
    }
    case "ERROR_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "FAIL_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "RESET_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    default: {
      return state;
    }
  }
}

const globalReducers = combineReducers({
  images: ImagesListReducer,
  // image: ImagesListReducer,
  // image_upload: ImagesListReducer,
});

const preloadedState = {
  //token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
}; // read from cookies / local storage

export const store = configureStore({
  reducer: globalReducers,
  devTools: true,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // @ts-ignore
  preloadedState: preloadedState,
});
