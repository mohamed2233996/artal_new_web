import { NextArrow, PrevArrow } from '@/components/Arrows';
import classNames from 'classnames';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import categoryImg1 from "../../../public/1.png"


export default function CategorySlider({ filters, filterBy, setFilterBy, categoryData }) {
    const settings = {
        dots: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        className: "categories-slide__wrapper",
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        infinite: false,
        dotsClass: "categories-slider-dots container",
        customPaging: () => {
            return <div className="categories-slider-dot"></div>;
        },
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                },
            }

        ],
    };
    const isAr = useLocale() === "ar";


    console.log(categoryData)

    return (
        <Slider {...settings}>
            <div className="categories-slide__item">
                <div className={classNames({
                    active: !filterBy.categoryId,
                })}>
                    <Link
                        href={"#"}
                        onClick={(e) => {
                            e.preventDefault();
                            setFilterBy({ ...filterBy, categoryId: "all" });
                        }}
                        className='categoryItem d-flex flex-column justify-content-center align-items-center'
                    >
                        <span className='category-icon mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={55} height={55} fill={"none"}>
                                <path d="M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V2H16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.5 10.5L18.2421 11.197C17.9039 12.111 17.7348 12.568 17.4014 12.9014C17.068 13.2348 16.611 13.4039 15.697 13.7421L15 14L15.697 14.2579C16.611 14.5961 17.068 14.7652 17.4014 15.0986C17.7348 15.432 17.9039 15.889 18.2421 16.803L18.5 17.5L18.7579 16.803C19.0961 15.889 19.2652 15.432 19.5986 15.0986C19.932 14.7652 20.389 14.5961 21.303 14.2579L22 14L21.303 13.7421C20.389 13.4039 19.932 13.2348 19.5986 12.9014C19.2652 12.568 19.0961 12.111 18.7579 11.197L18.5 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M7 2H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h2>{isAr ? 'الكل' : "All"}</h2>
                    </Link>
                </div>
            </div>

            {categoryData.map((item, index) => (
                <div key={index} className="categories-slide__item">
                    <div className={classNames({
                        active: item.id === filterBy?.categoryId,
                    })}>
                        <Link
                            href={"#"}
                            onClick={(e) => {
                                e.preventDefault();
                                setFilterBy({ ...filterBy, categoryId: item.id });
                            }}
                            className='categoryItem d-flex flex-column justify-content-center align-items-center'
                        >
                            <span className='category-icon mb-4'>
                                <Image src={item.image} width={55} height={55} alt={""} />
                            </span>
                            <h2>{isAr ? item.name_ar : item.name_en}</h2>
                        </Link>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

