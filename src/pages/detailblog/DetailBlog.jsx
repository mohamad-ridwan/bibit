import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './DetailBlog.scss'
import TipsInvestasi from '../../components/tipsinvestasi/TipsInvestasi'
import Card from '../../components/card/Card'
import endpoint from '../../services/api/endpoint'
import { BlogInvestasiContext } from '../../services/context/bloginvestasi'
import Loading from '../../components/loading/Loading'
import NotFound from '../../components/notfound/NotFound'

function DetailBlog() {
    const [dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog] = useContext(BlogInvestasiContext)

    const getPath = window.location.pathname
    const originHttp = window.location.origin
    const http = `${originHttp}/blog`

    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
        blogDetailGlobal(undefined, getPath)
    }, [])

    function RenderKonten({ txt }) {
        return (
            <>
                <p dangerouslySetInnerHTML={{ __html: txt }}></p>
            </>
        )
    }

    const dropdown = document.getElementsByClassName('dropdown-shared')

    function mouseOverShared() {
        if(dropdown.length > 0){
            dropdown[0].style.display = 'flex'
        }
    }

    function mouseLeaveShared() {
        dropdown[0].style.display = 'none'
    }

    function btnMedsos(className) {
        document.getElementsByClassName(className)[0].click()
    }

    function clickPaginate(path) {
        setDataBlog({})
        setOnLoadingGlobal(true)
        history.push(`/blog/${path}`)
        blogDetailGlobal(path, '')
        window.scrollTo(0, 0)
    }

    return (
        <>
            {dataBlog && Object.keys(dataBlog).length > 0 ? (
                <div className="wrapp-detail-blog">
                    <div className="container-detail-blog">
                        <div className="konten-detail-blog">
                            {Object.keys(dataBlog).length > 0 ? (
                                <Card
                                    title={dataBlog.title}
                                    date={`${dataBlog.date} in ${dataBlog.category}`}
                                    img={`${endpoint}/${dataBlog.image}`}
                                    kontenUtama={<RenderKonten txt={dataBlog.kontenUtama} />}
                                    kontenDetail={<RenderKonten txt={dataBlog.kontenDetail} />}
                                    displayBtn="none"
                                    displayKontenDetail="flex"
                                    cursorImg="default"
                                    cursorTitle="text"
                                    widthRightKonten="auto"
                                    bgColorWrapp="#fff"
                                    displayWrappShared="flex"
                                    colorTitle="#00ab6b"
                                    colorKontenUtama="#000"
                                    pathShare={`${http}/${dataBlog.path}`}
                                    mouseOverShared={mouseOverShared}
                                    mouseLeaveShared={mouseLeaveShared}
                                    btnWhatsapp={() => btnMedsos('whatsapp-btn')}
                                    btnTwitter={() => btnMedsos('twitter-btn')}
                                    btnFacebook={() => btnMedsos('facebook-btn')}
                                />
                            ) : (
                                <div></div>
                            )}

                            <div className="column-bawah-blog">
                                {blogBefore && Object.keys(blogBefore).length > 0 ? (
                                    <button className="btn-paginate btn-left-paginate" onClick={() => clickPaginate(blogBefore.path)}>
                                        ← {blogBefore.title}
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                                {blogAfter && Object.keys(blogAfter).length > 0 ? (
                                    <button className="btn-paginate btn-right-paginate" onClick={() => clickPaginate(blogAfter.path)}>
                                        {blogAfter.title} →
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <TipsInvestasi />
                    </div>
                </div>
            ) : (
                <>
                    <Loading display={onLoadingGlobal ? 'flex' : 'none'} />
                    <NotFound />
                </>
            )}
        </>
    )
}

export default DetailBlog