import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Search.scss'
import Card from '../../components/card/Card'
import API from '../../services/api'
import endpoint from '../../services/api/endpoint'
import { NavbarContext } from '../../services/context/navbar'
import { BlogInvestasiContext } from '../../services/context/bloginvestasi'

function Search() {
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal, searchGlobal, setSearchGlobal] = useContext(NavbarContext)
    const [dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog] = useContext(BlogInvestasiContext)
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    useEffect(()=>{
        setDataBlog({})
        window.scrollTo(0, 0)
        
        API.APIGetCategory()
        .then(res=>{
            const respons = res.data[0].data

            const getItems = respons.filter(e =>
                e.title.toLowerCase().includes(searchGlobal.toLowerCase()) ||
                e.kontenUtama.toLowerCase().includes(searchGlobal.toLowerCase()))
            
            if(searchGlobal.length > 0){
                setBlog(getItems)
            }
        })
        .catch(err=>console.log(err))
    }, [])

    function changeInput(e) {
        const value = e.target.value
        setSearchGlobal(value)
        setLoading(true)

        API.APIGetCategory()
            .then(res => {
                const respons = res.data[0].data

                const getItems = respons.filter(e =>
                    e.title.toLowerCase().includes(value.toLowerCase()) ||
                    e.kontenUtama.toLowerCase().includes(value.toLowerCase()))

                if (getItems.length > 0) {
                    setBlog(getItems)
                    setLoading(false)
                } else {
                    setBlog([])
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))
    }

    function RenderTxt({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function toBlog(path){
        history.push(`/blog/${path}`)
        setOnLoadingGlobal(true)
    }

    return (
        <>
            <div className="wrapp-search">
                <div className="container-responsive-search">
                    <div className="container-input-search">
                        <div className="circle-loading" style={{
                            display: loading ? 'flex' : 'none'
                        }}>

                        </div>
                        <i className="fas fa-search" style={{
                            display: loading ? 'none' : 'flex'
                        }}></i>
                        <input type="text" className="input-page-search" placeholder='Type to search...' value={searchGlobal} onChange={changeInput} autoFocus/>
                    </div>

                    <div className="container-results-search">
                        {searchGlobal.length > 0 ? (
                            <>
                                {searchGlobal.length > 0 && blog.length > 0 ? blog.map((e, i) => {
                                    return (
                                        <Card key={i}
                                            titleLight={e.title}
                                            imgLeft={`${endpoint}/${e.image}`}
                                            displayDate="none"
                                            kontenUtama={<RenderTxt txt={e.kontenUtama} />}
                                            displayTitleLight="flex"
                                            displayImgLeft="flex"
                                            displayImg="none"
                                            displayTitle="none"
                                            fontSizeKontenUtama="14px"
                                            fontSizeBtn="14px"
                                            widthImgLeft="350"
                                            heightImgLeft="200"
                                            bgColorWrapp="#fff"
                                            colorTitleLight="#000"
                                            colorKontenUtama="#000"
                                            borderWrapp="1.5px solid #eee"
                                            paddingWrapp="30px 0px 30px 0px"
                                            clickToBlog={()=>toBlog(e.path)}
                                        />
                                    )
                                }) : (
                                    <p className='no-results'>Your search did not match any documents.</p>
                                )}
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search