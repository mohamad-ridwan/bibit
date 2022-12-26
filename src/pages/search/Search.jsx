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
    const [searchMessage, setSearchMessage] = useState('')
    const [dataSementara, setDataSementara] = useState([])

    const history = useHistory()

    const regexSpecialCharacters = /[^a-zA-Z0-9 ]/g

    useEffect(() => {
        setDataBlog({})
        window.scrollTo(0, 0)

        if (searchGlobal.length > 0) {
            setLoading(true)

            setTimeout(() => {
                API.APIGetCategory()
                    .then(res => {
                        const respons = res.data[0].data

                        const getItems = respons.filter(e =>
                            e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(searchGlobal.replace(regexSpecialCharacters, '').toLowerCase()) ||
                            e.kontenUtama.replace(regexSpecialCharacters, '').toLowerCase().includes(searchGlobal.replace(regexSpecialCharacters, '').toLowerCase()))

                        setBlog(getItems)
                        setDataSementara(getItems)
                        setLoading(false)

                        if (getItems.length === 0) {
                            setSearchMessage('Your search did not match any documents.')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                        alert('Oops!, telah terjadi kesalahan server')
                        window.location.reload()
                    })
            }, 500)
        }
    }, [])

    async function getDataSearch(value) {
        return await new Promise((resolve, reject) => {
            if (dataSementara.length === 0 && value.length > 0 && value.length <= 1) {
                setLoading(true)

                API.APIGetCategory()
                    .then(res => {
                        const respons = res.data[0].data
                        setDataSementara(respons)
                        resolve(respons)

                        setTimeout(() => {
                            setLoading(false)
                        }, 10);
                    })
                    .catch(err => reject({ message: 'error search', serverMessage: err }))
            } else if (dataSementara.length > 0) {
                resolve(dataSementara)
            }
        })
    }

    function changeInput(v) {
        setSearchGlobal(v.target.value)

        if (v.target.value.trim() && dataSementara.length === 0) {
            setSearchMessage('Looking for...')
        }

        getDataSearch(v.target.value)
            .then(res => {
                const getItems = res.filter(e =>
                    e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(v.target.value.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()) ||
                    e.kontenUtama.replace(regexSpecialCharacters, '').toLowerCase().includes(v.target.value.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase())
                )

                setBlog(getItems)

                if (getItems.length === 0 && res.length > 0) {
                    setSearchMessage('Your search did not match any documents.')
                } else if (getItems.length === 0) {
                    setSearchMessage('')
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                alert('Oops!, telah terjadi kesalahan server')
                window.location.reload()
            })
    }

    function RenderTxt({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function toBlog(path) {
        history.push(`/blog/${path}`)
        setOnLoadingGlobal(true)
        setSearchGlobal('')
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
                        <input type="text" className="input-page-search" placeholder='Type to search...' value={searchGlobal} onChange={changeInput} />
                    </div>

                    <div className="container-results-search" style={{
                        display: searchGlobal.trim() ? 'flex' : 'none'
                    }}>
                        {searchGlobal.trim() && blog.length > 0 ? blog.map((e, i) => {
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
                                    clickToBlog={() => toBlog(e.path)}
                                />
                            )
                        }) : (
                            <p className='no-results'>{searchMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search