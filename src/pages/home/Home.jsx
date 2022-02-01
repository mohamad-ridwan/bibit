import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.scss'
import Card from '../../components/card/Card'
import TipsInvestasi from '../../components/tipsinvestasi/TipsInvestasi'
import API from '../../services/api'
import endpoint from '../../services/api/endpoint'
import { NavbarContext } from '../../services/context/navbar'
import Loading from '../../components/loading/Loading'
import { BlogInvestasiContext } from '../../services/context/bloginvestasi'

function Home() {
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal] = useContext(NavbarContext)
    const [dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog] = useContext(BlogInvestasiContext)
    const [blog, setBlog] = useState([])
    const [onShared, setOnShared] = useState(null)
    const [onLoading, setOnLoading] = useState(false)

    const history = useHistory()
    const originHttp = window.location.origin
    const http = `${originHttp}/blog`

    function setAllAPI() {
        setOnLoading(true)

        API.APIGetCategory()
            .then(res => {
                const respons = res.data[0].data

                if (respons.length > 0) {
                    const get10Items = respons.filter((e, i) => i < 5)
                    setBlog(get10Items)
                }
                setOnLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI()
        activeMenuCollapseGlobal(false)
        setDataBlog({})
    }, [])

    function RenderKontenUtama({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function toBlog(path) {
        setOnLoadingGlobal(true)
        history.push(`/blog/${path}`)
    }

    function mouseOverShared(idx) {
        setOnShared(idx)
    }

    function mouseLeaveShared() {
        setOnShared(null)
    }

    function btnMedsos(className) {
        document.getElementsByClassName(className)[onShared].click()
    }

    return (
        <>
            <div className="wrapp-home">
                <div className="container-home">
                    <div className="konten-blog">
                        {blog && blog.length > 0 ? blog.map((e, i) => {
                            return (
                                <>
                                    <Card key={i}
                                        title={e.title}
                                        date={`${e.date} in ${e.category}`}
                                        img={`${endpoint}/${e.image}`}
                                        kontenUtama={<RenderKontenUtama txt={e.kontenUtama} />}
                                        clickToBlog={() => toBlog(e.path)}
                                        marginWrapp="0 0 90px 0"
                                        widthRightKonten="auto"
                                        colorKontenUtama="#000"
                                        bgColorWrapp="#fff"
                                        displayWrappShared="flex"
                                        pathShare={`${http}/${e.path}`}
                                        displayDropdownShared={onShared === i ? 'flex' : 'none'}
                                        mouseOverShared={() => mouseOverShared(i)}
                                        mouseLeaveShared={mouseLeaveShared}
                                        btnWhatsapp={() => btnMedsos('whatsapp-btn')}
                                        btnTwitter={() => btnMedsos('twitter-btn')}
                                        btnFacebook={() => btnMedsos('facebook-btn')}
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                    <TipsInvestasi />
                </div>

                <Loading display={onLoading ? 'flex' : 'none'}/>
            </div>
        </>
    )
}

export default Home