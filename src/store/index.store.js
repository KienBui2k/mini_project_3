import { createStore, combineReducers } from 'redux';

const commonReducer = (state = {
    reload: false
}, action) => {
    switch (action.type) {
        case "REDLOAD":
            return {
                ...state,
                reload: !state.reload
            }
        default:
            return state
    }
}
const routerReducer = combineReducers({
    commonStore: commonReducer,
})
export const store = createStore(routerReducer)