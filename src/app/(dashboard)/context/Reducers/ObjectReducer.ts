export function Reducer(
  state: any,
  action: { payload: { _id: string }; id: string; type: string }
) {
  switch (action.type) {
    case "added": {
      return {
        ...state,
        ...action.payload,
        data: true,
      };
    }
    case "noData": {
      return {
        data: false,
      };
    }
    case "changed": {
      return {
        ...state,
        ...action.payload,
        data: true,
      };
    }
    case "deleted": {
      const { [action.id]: id, ...rest } = state;
      return rest;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export interface ObjectAction {
  type: string;
  payload?: object;
  id?: string;
}
