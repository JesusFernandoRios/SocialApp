// this is the store
export const initialState = {
    show:[],
    orders:[],
    preOrders:[],
    user: null,
}

function reducer(state, action) {
    // this console log is important 
    // console.log(action)

    switch(action.type){

        case 'SET_USER':
            // logic for adding item to basket
            return {
                ...state, user: action.user
            }
        case 'GET_ITEMS':
            return {
                ...state, show: action.show
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                orders:[...state.orders, action.pre_ordered_item]
            }
        case "GET_PREORDER_ITEMS":
            return {
                ...state, preOrders: action.preOrders
            }
        case "REMOVE_ITEM":
            
            const newPreOrder = [...state.preOrders];

            const index = state.preOrders.findIndex((item) => item._id === action.id)
                if(index >= 0){
                    newPreOrder.splice(index,1)
                }else{
                    console.warn(`Cannot remove product (id: ${action.id}) as it does not exists`)
                }

            return {...state, preOrders: newPreOrder}

        default:
            return state
    }
}

export default reducer;