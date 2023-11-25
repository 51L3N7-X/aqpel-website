interface item {
  id: string;
}

export function ItemsReducer(
  state: any,
  action: {
    payload: [{ _id: string }];
    id: string;
    type: string;
    categorieId: string;
  }
) {
  switch (action.type) {
    case "addFirstTime": {
      return {
        [action.categorieId]: action.payload,
      };
    }
    case "added": {
      return {
        ...state,
        [action.categorieId]: [...state[action.categorieId], action.payload],
      };
    }
    case "changed": {
      return {
        ...state,
        [action.categorieId]: state[action.categorieId].map((item: item) => {
          if (item.id == action.id) return action.payload;
          return item;
        }),
      };
    }
    case "deleted": {
      return {
        ...state,
        [action.categorieId]: state[action.categorieId].filter(
          (item: item) => item.id !== action.id
        ),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
