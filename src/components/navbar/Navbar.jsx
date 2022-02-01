import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Navbar.scss'
import API from '../../services/api'
import endpoint from '../../services/api/endpoint'
import { NavbarContext } from '../../services/context/navbar'

function Navbar() {
    const [logo, setLogo] = useState('')
    const [menu, setMenu] = useState([])
    const [onMenu, setOnMenu] = useState(false)
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal] = useContext(NavbarContext)

    const history = useHistory()

    const path = window.location.pathname
    const urlOrigin = window.location.origin

    function setAllAPI() {
        API.APIGetNavbar()
            .then(res => {
                const respons = res.data

                const getLogo = respons.filter(e => e.id === "logo-web")
                const getMenu = respons.filter(e => e.id === "menu-page")

                if (getLogo.length > 0) {
                    setLogo(getLogo[0].image)
                }

                if (getMenu.length > 0) {
                    setMenu(getMenu)
                }

                if (path === '/') {
                    loadActiveMenu(0)
                } else if (path.includes('/blog')) {
                    loadActiveMenu(0)
                } else if (path.includes('/category')) {
                    loadActiveMenu(1)
                }

                const getPathCategory = path.split('/category/').join('')

                const elementMenuCollapse = document.getElementsByClassName('menu-collapse')
                setTimeout(() => {
                    if (elementMenuCollapse.length > 0) {
                        for (let i = 0; i < elementMenuCollapse.length; i++) {
                            if (elementMenuCollapse[i].innerHTML.toLowerCase() === getPathCategory) {
                                activeMenuCollapseGlobal(true, i)
                            }
                        }
                    }
                }, 500);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
    }, [])

    function toPage(path, idx) {
        if (path !== 'null') {
            history.push(path)
            loadActiveMenu(idx)
        }
    }

    function activeMenu(condition, i) {
        const elementMenu = document.getElementsByClassName('menu-nav')

        if (elementMenu.length > 0) {
            for (let a = 0; a < elementMenu.length > 0; a++) {
                elementMenu[a].style.color = '#000'
            }

            if (condition) {
                elementMenu[i].style.color = '#00ab6b'

                if(idxActive !== null){
                    elementMenu[idxActive].style.color = '#00ab6b'
                }
            } else {
                if(idxActive !== null){
                    elementMenu[idxActive].style.color = '#00ab6b'
                }
            }
        }
    }

    function mouseOverMenu(i) {
        activeMenu(true, i)

        if (i === 1) {
            setOnMenu(true)
        }
    }

    function mouseLeaveMenu() {
        activeMenu(false)
        setOnMenu(false)
    }

    function activeMenuCollapse(condition, i) {
        const elementMenuCollapse = document.getElementsByClassName('menu-collapse')

        if (elementMenuCollapse.length > 0) {
            for (let a = 0; a < elementMenuCollapse.length; a++) {
                elementMenuCollapse[a].style.color = '#000'
            }

            if (condition) {
                elementMenuCollapse[i].style.color = '#00ab6b'
                elementMenuCollapse[idxMenuCollapse].style.color = '#00ab6b'
            } else {
                elementMenuCollapse[idxMenuCollapse].style.color = '#00ab6b'
            }
        }
    }

    function mouseOverMenuCollapse(i) {
        activeMenuCollapse(true, i)
    }

    function mouseLeaveMenuCollapse() {
        activeMenuCollapse(false)
    }

    return (
        <>
            <div className="wrapp-navbar">
                <div className="container-nav">
                    {logo.length > 0 ? (
                        <img src={`${endpoint}/${logo}`} alt="" className="logo-web" onClick={() => toPage('/', 0)} />
                    ) : (
                        <div></div>
                    )}

                    <ul className="list-menu-nav">
                        {menu && menu.length > 0 ? menu.map((e, i) => {
                            const getMenuCollapse = e.menuCollapse

                            return (
                                <li className="menu-nav" key={i}
                                    onClick={() => toPage(e.path, i)}
                                    onMouseOver={() => mouseOverMenu(i)}
                                    onMouseLeave={mouseLeaveMenu}
                                >
                                    {e.name}

                                    {getMenuCollapse.length > 0 ? (
                                        <ul className="list-menu-collapse" style={{
                                            display: onMenu ? 'flex' : 'none'
                                        }}>
                                            <div className="container-menu-collapse">
                                                {getMenuCollapse.length > 0 ? getMenuCollapse.map((e, a) => {
                                                    return (
                                                        <a key={a} href={`${urlOrigin}/category${e.path}`} className="menu-collapse"
                                                            onMouseOver={() => mouseOverMenuCollapse(a)}
                                                            onMouseLeave={mouseLeaveMenuCollapse}
                                                        >
                                                            {e.name}
                                                        </a>
                                                    )
                                                }) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </li>
                            )
                        }) : (
                            <div></div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar