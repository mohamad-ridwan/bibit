import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Category.scss'
import Card from '../../components/card/Card'
import API from '../../services/api'
import endpoint from '../../services/api/endpoint'
import Loading from '../../components/loading/Loading'
import NotFound from '../../components/notfound/NotFound'
import { NavbarContext } from '../../services/context/navbar'
import { BlogInvestasiContext } from '../../services/context/bloginvestasi'

function Category() {
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal, searchGlobal, setSearchGlobal] = useContext(NavbarContext)
    const [dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog] = useContext(BlogInvestasiContext)
    const [blog, setBlog] = useState([])
    const [onLoading, setOnLoading] = useState(false)

    const path = window.location.pathname
    const history = useHistory()

    function setAllAPI() {
        setOnLoading(true)

        API.APIGetCategory()
            .then(res => {
                const respons = res.data[0].data
                setOnLoading(false)

                if (path.includes('education') || path.includes('features') || path.includes('lifestyle') || path.includes('news') || path.includes('promo')) {
                    const getPath = path.split('/category/').join('')

                    const blogPath = respons.filter(e => e.category.toLowerCase().includes(getPath))

                    if (blogPath.length > 0) {
                        const get10Items = blogPath.filter((e, i) => i < 10)
                        setBlog(get10Items)
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI()
        setDataBlog({})
    }, [])

    function RenderTxt({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function toBlog(path) {
        history.push(`/blog/${path}`)
        setOnLoadingGlobal(true)
        loadActiveMenu(0)
        activeMenuCollapseGlobal()
    }

    return (
        <>
            {blog && blog.length > 0 ? (
                <div className="wrapp-category">
                    <div className="container-category">
                        {blog && blog.length > 0 ? blog.map((e, i) => {
                            return (
                                <>
                                    <Card key={i}
                                        titleLight={e.title}
                                        dateLight={`${e.category} • ${e.date}`}
                                        imgLeft={`${endpoint}/${e.image}`}
                                        displayDate="none"
                                        displayDateLight="flex"
                                        kontenUtama={<RenderTxt txt={e.kontenUtama} />}
                                        clickToBlog={() => toBlog(e.path)}
                                        displayTitleLight="flex"
                                        displayImgLeft="flex"
                                        displayImg="none"
                                        marginWrapp="0 0 30px 0"
                                        displayTitle="none"
                                        fontSizeKontenUtama="14px"
                                        fontSizeBtn="14px"
                                        widthImgLeft="400"
                                        heightImgLeft="200"
                                        bgColorWrapp="#fff"
                                        colorKontenUtama="#000"
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <Loading display={onLoading ? 'flex' : 'none'} />
                    <NotFound />
                </>
            )}
        </>
    )
}

export default Category