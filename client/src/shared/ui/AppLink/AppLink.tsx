import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '@shared/lib/classNames/classNames';
interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
    const { children, className, to, ...otherProps } = props;

    return (
        <Link className={classNames(cls.AppLink, {}, [className])} {...otherProps} to={to}>
            {children}
        </Link>
    );
});
