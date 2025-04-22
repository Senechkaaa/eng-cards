import { classNames } from '@shared/lib/classNames/classNames';
import cls from './DropDown.module.scss';
import { memo, ReactNode, useState } from 'react';
import { Button } from '../Button';
import { AppLink } from '../AppLink';

interface DropDownProps {
    className?: string;
    trigger: ReactNode;
    items: DropDownItems[];
}

interface DropDownItems {
    onClick?: (args?: any) => void;
    content?: ReactNode;
    href?: string;
}

export const DropDown = memo(({ className, trigger, items }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={classNames(cls.DropDown, {}, [className])}>
            <Button variant='none' onClick={handleToggle}>
                {trigger}
            </Button>
            {isOpen && (
                <div>
                    <ul className={cls.menu}>
                        {items.map((item) => {
                            const content = (
                                <li
                                    onClick={item.onClick}
                                    className={cls.menuItem}
                                    key={`dropdown key ${item.content}`}
                                >
                                    {item.content}
                                </li>
                            );

                            if (item.href) {
                                return (
                                    <AppLink to={item.href} key={`dropdown key ${item.content}`}>
                                        {content}
                                    </AppLink>
                                );
                            }

                            return <>{content}</>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});
