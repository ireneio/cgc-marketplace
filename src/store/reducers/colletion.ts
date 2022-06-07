interface CollectionState {
  collections: any[];
  currentCollection: Record<string, any>;
}

const initialState: CollectionState = {
  collections: [],
  currentCollection: {
    active: false,
    contracts: [],
    createdAt: '',
    createdBy: '',
    id: '',
    name: '',
    metadata: {
      name: '',
      slug: '',
    },
    services: [],
    categories: [],
    genre: [],
    tags: [],
    tokens: [],
    updatedAt: '',
    updatedBy: '',
  },
};

type Action =
  | {
      type: 'SET_CURRENT_COLLECTION';
      payload: Record<string, any>;
    }
  | {
      type: 'SET_COLLECTIONS';
      payload: any[];
    };

export default function collectionReducer(
  state: CollectionState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'SET_COLLECTIONS':
      return {
        ...state,
        collections: action.payload,
      };
    case 'SET_CURRENT_COLLECTION':
      return {
        ...state,
        currentCollection: action.payload,
      };
    default:
      return state;
  }
}
