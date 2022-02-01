import React from 'react'
import {TwitterShareButton, FacebookShareButton, WhatsappShareButton} from 'react-share'
import './Card.scss'

function Card({ title, date, img, kontenUtama, displayImg, displayKontenUtama, displayBtn, fontSizeTitle, colorKontenUtama, fontSizeKontenUtama, lineHeightKontenUtama, flexDirectionWrapp, fontSizeDate, dateLight, displayDateLight, cursorKontenUtama, clickToBlog, displayKontenDetail, kontenDetail, cursorImg, cursorTitle, marginWrapp, displayDate, displayImgLeft, imgLeft, titleLight, displayTitle, displayTitleLight, widthRightKonten, fontSizeBtn, flexDirectionRightKonten, borderWrapp, fontSizeKontenDetail, colorTitle, colorTitleLight, cursorWrapp, fontSizeTitleLight, widthImgLeft, heightImgLeft, positionImgLeft, positionWrapp, rightImgLeft, paddingWrapp, marginRightImgLeft, topImgLeft, imgBlogSearch, displayImgBlogSearch, bgColorWrapp, displayRightContent, displayWrappShared, mouseOverShared, mouseLeaveShared, displayDropdownShared, btnWhatsapp, pathShare, btnTwitter, btnFacebook, clickKontenUtama, clickWrapp }) {
    return (
        <>
            <div className="wrapp-card" style={{
                flexDirection: flexDirectionWrapp,
                margin: marginWrapp,
                borderBottom: borderWrapp,
                cursor: cursorWrapp,
                position: positionWrapp,
                padding: paddingWrapp,
                backgroundColor: bgColorWrapp,
            }} onClick={clickWrapp}>
                <img src={imgLeft} width={widthImgLeft} height={heightImgLeft} alt="" className="img-left-card" style={{
                    display: displayImgLeft,
                    position: positionImgLeft,
                    top: topImgLeft,
                    right: rightImgLeft,
                    marginRight: marginRightImgLeft,
                }} onClick={clickToBlog}/>
                <div className="column-right-konten" style={{
                    display: displayRightContent,
                    width: widthRightKonten,
                    flexDirection: flexDirectionRightKonten
                }}>
                    <img src={imgBlogSearch} alt="" className="img-blog-search" style={{
                        display: displayImgBlogSearch
                    }} />
                    <p className="title-card" style={{
                        display: displayTitle,
                        fontSize: fontSizeTitle,
                        cursor: cursorTitle,
                        color: colorTitle,
                    }}
                        onClick={clickToBlog}
                    >
                        {title}
                    </p>
                    <p className="title-card-light" style={{
                        display: displayTitleLight,
                        color: colorTitleLight,
                        fontSize: fontSizeTitleLight
                    }} onClick={clickToBlog}>
                        {titleLight}
                    </p>
                    <p className="date-card" style={{
                        fontSize: fontSizeDate,
                        display: displayDate
                    }}>
                        {date}
                    </p>
                    <p className="date-card-light" style={{
                        display: displayDateLight
                    }}>
                        {dateLight}
                    </p>
                    <img src={img} alt="" className="img-card" style={{
                        display: displayImg,
                        cursor: cursorImg,
                    }}
                        onClick={clickToBlog}
                    />
                    <p className="konten-utama" style={{
                        display: displayKontenUtama,
                        color: colorKontenUtama,
                        fontSize: fontSizeKontenUtama,
                        lineHeight: lineHeightKontenUtama,
                        cursor: cursorKontenUtama
                    }} onClick={clickKontenUtama}>
                        {kontenUtama}
                    </p>
                    <p className="konten-detail" style={{
                        display: displayKontenDetail,
                        fontSize: fontSizeKontenDetail
                    }}>
                        {kontenDetail}
                    </p>
                    <button className="read-more" style={{
                        display: displayBtn,
                        fontSize: fontSizeBtn
                    }} onClick={clickToBlog}>
                        Read More
                    </button>

                    <div className="container-shared" onMouseOver={mouseOverShared} onMouseLeave={mouseLeaveShared} style={{
                        display: displayWrappShared
                    }}>
                        <button className="btn-share">
                            <i className="fas fa-share-alt"></i>
                            <p className="share">
                                Share
                            </p>
                        </button>

                        <ul className="dropdown-shared" style={{
                            display: displayDropdownShared
                        }}>
                            <div className="list-dropdown-shared">
                                <li className="list-link" style={{
                                    backgroundColor: '#25D366'
                                }} onClick={btnWhatsapp}>
                                    <i className="fab fa-whatsapp"></i>
                                    <WhatsappShareButton url={pathShare} className='whatsapp-btn'/> 
                                    <span className="name-medsos">
                                        Whatsapp
                                    </span>
                                </li>
                                <li className="list-link" style={{
                                    backgroundColor: '#1d9bf0'
                                }} onClick={btnTwitter}>
                                    <i className="fab fa-twitter"></i>
                                    <TwitterShareButton url={pathShare} className='twitter-btn'/>

                                    <span className="name-medsos">
                                        Twitter
                                    </span>
                                </li>
                                <li className="list-link" style={{
                                    backgroundColor: '#4267B2'
                                }} onClick={btnFacebook}>
                                    <i className="fab fa-facebook-f"></i>
                                    <FacebookShareButton url={pathShare} className='facebook-btn'/>
                                    <span className="name-medsos">
                                        Facebook
                                    </span>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card