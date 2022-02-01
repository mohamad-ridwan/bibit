import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import './NotFound.scss'
import { NavbarContext } from '../../services/context/navbar'

function NotFound() {
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal, searchGlobal, setSearchGlobal] = useContext(NavbarContext)

    const history = useHistory()

    function backPage(path){
        history.push(path)
        
        if(path === '/'){
            loadActiveMenu(0)
        }
    }

    return (
        <>
            <div className="wrapp-not-found">
                <div className="container-not-found">
                    <p className="txt-not-found txt-group">
                        We couldn't find the page you were looking for. This is either because:
                    </p>

                    <div className="list-txt-not-found">
                        <li className="list-keterangan txt-group">
                            <p className="txt-list txt-group">
                                There is an error in the URL entered into your web browser. Please check the URL and try again.
                            </p>
                        </li>
                        <li className="list-keterangan txt-group">
                            <p className="txt-list txt-group">
                                The page you are looking for has been moved or deleted.
                            </p>
                        </li>
                    </div>

                    <p className="txt-not-found-bottom txt-group">
                        You can return to our homepage by <button className="btn-to-back" onClick={()=>backPage('/')}>
                            clicking here
                        </button>, or you can try searching for the content you are seeking by <button className="btn-to-back" onClick={()=>backPage('/search')}>
                            clicking here
                        </button>
                        .
                    </p>
                </div>
            </div>
        </>
    )
}

export default NotFound