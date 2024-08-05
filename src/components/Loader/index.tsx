"use client"

import { useEffect, useRef } from 'react';
import dots from '/images/dots.gif'
import { default as NextImage } from 'next/image';

type ImageLoaderProps = {
    type: string,
    src: string,
    onErrorSrc?: string,
    parentStyle?: object,
    style?: object,
    imageClassName?: string,
    className?: string,
    alt?: String,
};

function imageLoadingHandler(image: HTMLImageElement, src: string, onErrorSrc: string) {
    const placeholder = new Image();
    placeholder.src = src;

    placeholder.onload = function () {
        image.src = src;
    };

    placeholder.onerror = function () {
        if (onErrorSrc) image.src = onErrorSrc
    };
}

export function ImageLoader({ type = 'dots', src, onErrorSrc = '/images/no-internet_up2.png', parentStyle, style, imageClassName, className, alt }: ImageLoaderProps) {

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef?.current && src) imageLoadingHandler(imgRef?.current, src, onErrorSrc)
    }, [src]);

    return (
        <div className={`cust-loader ${type} ${className ?? ''}`} style={parentStyle}>
            <NextImage ref={imgRef} src={dots} alt={`${alt ?? ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    ...(style ?? {})
                }}
                layout="responsive"
                width={1920}
                height={1080}
                className={`${imageClassName ?? ''}`}
            />
        </div>
    )
}