import { ImgHTMLAttributes, memo, ReactElement, useEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    errorFallback?: ReactElement;
    loadingFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, src, errorFallback, loadingFallback, alt, ...otherProps } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (hasError && errorFallback) {
        return errorFallback
    }

    if (isLoading && loadingFallback) {
        return loadingFallback
    }

    return <img className={className} src={src} alt={alt} {...otherProps}/>
});
