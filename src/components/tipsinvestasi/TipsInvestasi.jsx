import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './TipsInvestasi.scss'
import API from '../../services/api'
import Card from '../card/Card'
import endpoint from '../../services/api/endpoint'
import { NavbarContext } from '../../services/context/navbar'
import { BlogInvestasiContext } from '../../services/context/bloginvestasi'

function TipsInvestasi() {
    const [idxActive, setIdxActive, loadActiveMenu, idxMenuCollapse, setIdxMenuCollapse, activeMenuCollapseGlobal, searchGlobal, setSearchGlobal] = useContext(NavbarContext)
    const [dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog] = useContext(BlogInvestasiContext)
    const [blogEducation, setBlogEducation] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [blogSearch, setBlogSearch] = useState([])
    const [searchMessage, setSearchMessage] = useState('')
    const [loadSearch, setLoadSearch] = useState(false)
    const [dataSementara, setDataSementara] = useState([])

    const history = useHistory()
    const getPath = window.location.pathname

    function setAllAPI() {
        API.APIGetCategory()
            .then(res => {
                const respons = res.data[0].data

                if (respons.length > 0) {
                    const getEducation = respons.filter(e => e.category.toLowerCase().includes('education'))
                    const get5Items = getEducation.filter((e, i) => i < 5)
                    setBlogEducation(get5Items)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI()
    }, [])

    function RenderTxt({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function changeBottomDropdown(e) {
        if (e.length > 2) {
            const dropDown = document.getElementsByClassName('dropdown-blog-search')

            dropDown[0].style.bottom = '0'
        } else if (e.length <= 2) {
            const dropDown = document.getElementsByClassName('dropdown-blog-search')

            dropDown[0].style.bottom = 'inherit'
        }
    }

    async function getDataSearch(value) {
        return await new Promise((resolve, reject) => {
            if (dataSementara.length === 0 && value.length > 0 && value.length <= 1) {
                setLoadSearch(true)

                API.APIGetCategory()
                    .then(res => {
                        const respons = res.data[0].data

                        setDataSementara(respons)
                        resolve(respons)

                        setTimeout(() => {
                            setLoadSearch(false)
                        }, 10)
                    })
                    .catch(err => reject({ message: 'error search', serverMessage: err }))
            } else if(dataSementara.length > 0){
                resolve(dataSementara)
            }
        })
    }

    function changeInput(v) {
        setInputValue(v.target.value)
        const regexSpecialCharacters = /[^a-zA-Z0-9 ]/g

        if (dataSementara.length === 0) {
            setSearchMessage('Looking for...')
        }

        getDataSearch(v.target.value)
            .then(res => {
                const getItems = res.filter(e =>
                    e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(v.target.value.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()) ||
                    e.kontenUtama.replace(regexSpecialCharacters, '').toLowerCase().includes(v.target.value.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase())
                )
                setBlogSearch(getItems)
                changeBottomDropdown(getItems)

                if (getItems.length === 0 && res.length > 0) {
                    setSearchMessage('No results found.')
                }
            })
            .catch(err => {
                console.log(err)
                setLoadSearch(false)
                alert('Oops!, telah terjadi kesalahan server')
                window.location.reload()
            })
    }

    function submit(e) {
        e.preventDefault()
        if (inputValue.trim()) {
            history.push('/search')
            setIdxActive(null)

            setSearchGlobal(inputValue.replace(/ /g, '+').split('+').filter(e => e !== '').join(' '))

            document.getElementsByClassName('menu-nav')[0].style.color = '#000'
        }
    }

    function toBlog(path) {
        history.push(`/blog/${path}`)
        if (getPath.includes('/blog')) {
            setDataBlog({})
            setOnLoadingGlobal(true)
            blogDetailGlobal(path, '')
            window.scrollTo(0, 0)
        }
    }

    return (
        <>
            <div className="wrapp-tips-investasi">
                <div className="container-tips-investasi">
                    <form onSubmit={(e) => submit(e)} className="input-search">
                        <div className="circle-loading" style={{
                            display: loadSearch ? 'flex' : 'none'
                        }}>

                        </div>
                        <i className="fas fa-search" style={{
                            display: loadSearch ? 'none' : 'flex'
                        }}></i>
                        <input type="text" className="input" placeholder='Search' value={inputValue}
                            onChange={changeInput}
                        />
                        <i className="fas fa-times close" style={{
                            display: inputValue.length > 0 ? 'flex' : 'none'
                        }} onClick={() => {
                            setInputValue('')
                            setBlogSearch([])
                            setLoadSearch(false)
                        }}></i>
                    </form>

                    <p className="title-tips-investasi">
                        Tips Investasi
                    </p>

                    <div className="card-blog">
                        {blogEducation && blogEducation.length > 0 ? blogEducation.map((e, i) => {
                            return (
                                <>
                                    <Card key={i}
                                        dateLight={e.date}
                                        kontenUtama={e.title}
                                        displayImg="none"
                                        displayBtn="none"
                                        fontSizeKontenUtama="13.5px"
                                        fontSizeDate='12px'
                                        displayDateLight="flex"
                                        lineHeightKontenUtama="1.3"
                                        flexDirectionRightKonten="column-reverse"
                                        cursorKontenUtama="pointer"
                                        bgColorWrapp="#fff"
                                        clickKontenUtama={() => toBlog(e.path)}
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="dropdown-blog-search" style={{
                        display: inputValue.trim() ? 'flex' : 'none'
                    }}>
                        <div className="container-blog-search">
                            <div className="content-blog-search">
                                {inputValue.trim() && blogSearch.length > 0 ? blogSearch.map((e, i) => {
                                    const kontenUtama = e.kontenUtama.length > 200 ? `${e.kontenUtama.substr(0, 200)}...` : e.kontenUtama

                                    return (
                                        <Card key={i}
                                            imgBlogSearch={`${endpoint}/${e.image}`}
                                            titleLight={e.title}
                                            kontenUtama={<RenderTxt txt={kontenUtama} />}
                                            displayImgBlogSearch="flex"
                                            displayImg="none"
                                            displayBtn="none"
                                            fontSizeTitleLight="16px"
                                            colorTitleLight="#000"
                                            displayTitleLight="flex"
                                            fontSizeKontenUtama="12px"
                                            lineHeightKontenUtama="1.3"
                                            borderWrapp="1px solid #bbb"
                                            cursorWrapp="pointer"
                                            widthRightKonten="auto"
                                            displayDate="none"
                                            colorKontenUtama="#000"
                                            paddingWrapp="5px 15px 15px 15px"
                                            displayRightContent="block"
                                            clickWrapp={() => toBlog(e.path)}
                                        />
                                    )
                                }) : (
                                    <p className='no-results'>{searchMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TipsInvestasi