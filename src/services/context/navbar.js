import {createContext, useState} from 'react'

export const NavbarContext = createContext()

function NavbarProvider({children}){
    const [idxActive, setIdxActive] = useState(null)
    const [idxMenuCollapse, setIdxMenuCollapse] = useState(null)
    const [searchGlobal, setSearchGlobal] = useState('')

    function loadActiveMenu(idx){
        const elementMenu = document.getElementsByClassName('menu-nav')

        if(elementMenu.length > 0){
            for(let i = 0; i < elementMenu.length; i++){
                elementMenu[i].style.color = '#000'
            }

            elementMenu[idx].style.color = '#00ab6b'
            setIdxActive(idx)
        }
    }

    function activeMenuCollapseGlobal(condition, idx){
        const elementMenuCollapse = document.getElementsByClassName('menu-collapse')

        if(elementMenuCollapse.length > 0){
            for(let i = 0; i < elementMenuCollapse.length; i++){
                elementMenuCollapse[i].style.color = '#000'
            }
        }
        
        if(condition){
            elementMenuCollapse[idx].style.color = '#00ab6b'
            setIdxMenuCollapse(idx)
        }else{
            setIdxMenuCollapse(null)
        }
    }

    return(
        <NavbarContext.Provider value={[idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal, searchGlobal, setSearchGlobal]}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider