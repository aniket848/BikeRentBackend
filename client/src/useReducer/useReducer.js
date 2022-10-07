export const reducer = (state,action)=>{
    if(action.type === 'LOGIN')
      return {isLoggedIn:true,userEmail:action.val};
    else if(action.type === 'LOGOUT')  
      return {isLoggedIn:false,userEmail:''};
}

export const initialState = {isLoggedIn:false,userEmail:''};