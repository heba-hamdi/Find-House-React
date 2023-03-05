import React, {createContext, useContext, useState} from 'react'


export const StateContext= createContext(0);

const initialState={
    chat:false,
    notification:false,
    cart:false,
    userProfile:false,
}


export const ContextProvider=({children})=>{
    const [activeMenu, setActiveMenu]=useState(false);
    const [showMenu, setShowMenu] = useState(false);
   

    
 

   

return (
    <StateContext.Provider value={{activeMenu, setActiveMenu,showMenu,setShowMenu }}>
        {children}
    </StateContext.Provider>
)
}

export const useStateContext=()=>useContext(StateContext);