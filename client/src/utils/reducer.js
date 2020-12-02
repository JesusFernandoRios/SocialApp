// this is the store
export const initialState = {
    users: {}
}

function reducer(state, action) {
    // this console log is important 
    console.log(action)

    switch(action.type){

        case 'SET_USER':
            
            return {
                ...state, user: action.user
            }
        default:
            return state
    }
}

export default reducer;