export function ArrayReducer(
  state: any[],
  action: { payload: [{ _id: string }]; id: string; type: string }
) {
  switch (action.type) {
    case "addFirstTime": {
      return action.payload;
    }
    case "added": {
      return [...state, action.payload];
    }
    case "changed": {
      return state.map((obj) => {
        if (obj.id == action.id) return action.payload;
        return obj;
      });
    }
    case "deleted": {
      return state.filter((obj) => obj.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export interface ArrayAction {
  payload?: Array<object>;
  type: "addFirstTime" | "added" | "changed" | "deleted";
  id?: string;
}
