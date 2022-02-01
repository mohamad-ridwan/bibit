import React from 'react'
import './Loading.scss'

function Loading({display}){
    return(
        <>
        <div className="wrapp-loading" style={{
            display: display
        }}>
            <div className="circle-loading">

            </div>
        </div>
        </>
    )
}

export default Loading