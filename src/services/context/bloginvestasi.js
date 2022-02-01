import React, { createContext, useState } from 'react'
import API from '../api'

export const BlogInvestasiContext = createContext()

function BlogInvestasiProvider({children}){
    const [dataBlog, setDataBlog] = useState({})
    const [blogBefore, setBlogBefore] = useState({})
    const [blogAfter, setBlogAfter] = useState({})
    const [onLoadingGlobal, setOnLoadingGlobal] = useState(false)

    function blogDetailGlobal(pathLocal, pathWindow){
        setOnLoadingGlobal(true)

        API.APIGetCategory()
        .then(res => {
            const respons = res.data[0].data
            const getPathBlog = pathWindow.split('/blog/').join('')

            const getDetailData = respons.filter(e => pathLocal === undefined ? e.path == getPathBlog : e.path == pathLocal)
            if (getDetailData.length > 0) {
                setDataBlog(getDetailData[0])

                const getIdxItems = respons.map((e, i) => {
                    if (pathLocal === undefined) {
                        if (e.path === getPathBlog) {
                            getBlogPaginate(respons, i)
                        }
                    } else {
                        if (e.path === pathLocal) {
                            getBlogPaginate(respons, i)
                        }
                    }
                })
                return getIdxItems
            }
            
            setOnLoadingGlobal(false)
        })
        .catch(err => console.log(err))
    }

    function getBlogPaginate(data, i) {
        const newBlogBefore = data.filter((e, a) => a === i - 1)
        const newBlogAfter = data.filter((e, a) => a === i + 1)

        setBlogBefore(newBlogBefore[0])
        setBlogAfter(newBlogAfter[0])
    }

    return(
        <BlogInvestasiContext.Provider value={[dataBlog, blogBefore, blogAfter, blogDetailGlobal, onLoadingGlobal, setOnLoadingGlobal, setDataBlog]}>
            {children}
        </BlogInvestasiContext.Provider>
    )
}

export default BlogInvestasiProvider