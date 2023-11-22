"use client"

import { createContext, useContext, useReducer } from 'react';

const RestaurantContext = createContext(null);

const RestaurantDispatchContext = createContext(null);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
    const [tasks, dispatch]: any[] = useReducer(
        RestaurantReducer,
        initialTasks
    );

    return (
        <RestaurantContext.Provider value={tasks}>
            <RestaurantDispatchContext.Provider value={dispatch}>
                {children}
            </RestaurantDispatchContext.Provider>
        </RestaurantContext.Provider>
    );
}

export function useRestaurant() {
    return useContext(RestaurantContext);
}

export function useRestaurantDispatch() {
    return useContext(RestaurantDispatchContext);
}

function RestaurantReducer(state: any, action: { payload: {_id: string}, id: string, type: string }) {
    switch (action.type) {
        case 'added': {
            return {
                ...state,
                ...action.payload
            };
        }
        case 'changed': {
            return {
                ...state,
                ...action.payload
            };
        }
        case 'deleted': {
            const { [action.id]: id, ...rest } = state;
            return {};
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialTasks = {}
