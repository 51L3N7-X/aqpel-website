export function Reducer(
  state: any,
  action: { payload: { _id: string }; id: string; type: string }
) {
  switch (action.type) {
    case "added": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "changed": {
      return {
        ...state,
        ...action.payload,
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
