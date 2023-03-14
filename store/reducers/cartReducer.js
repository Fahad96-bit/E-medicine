
import productData from '../../mock/products.json';

const initState = {
    items:productData.products,
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{

    if(action.type === 'ADD_TO_CART'){
          let addedItem = state.items.find(item=> item.id === action.id)
         let existedItem= state.addedItems.find(item=> action.id === item.id)
         if(existedItem)
         {
            existedItem.quantity += 1 
  
             return{
                ...state,
                 total: state.total + existedItem.price 
                  }
        }
         else{
            let newTotal = state.total + addedItem.price 
            return{
                ...state,
                addedItems: [...state.addedItems, {...addedItem,quantity:1}],
                total : newTotal
            }
            
        }
    }
    if(action.type=== 'ADD_QUANTITY'){
        let addedItem = state.items.find(item=> item.id === action.id)
       let existedItem= state.addedItems.find(item=> action.id === item.id)
       if(existedItem)
       {
          existedItem.quantity += 1 

           return{
              ...state,
               total: state.total + existedItem.price 
                }
      }
       else{
          let newTotal = state.total + addedItem.price 
          return{
              ...state,
              addedItems: [...state.addedItems, {...addedItem,quantity:1}],
              total : newTotal
          }
          
      }
    }
    if(action.type=== 'SUB_QUANTITY'){  
        let existedItem= state.addedItems.find(item=> action.id === item.id)
        if(existedItem){
        if(existedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - existedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            existedItem.quantity -= 1
            let newTotal = state.total - existedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
    }else{
        return state
    }
    }
  else{
    return state
    }
    
}

export default cartReducer