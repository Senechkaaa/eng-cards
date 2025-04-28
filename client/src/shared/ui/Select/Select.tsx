import { classNames } from '../../lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Select.module.scss';
import { useCallback, useMemo, useState } from 'react';

export interface SelectOptions<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    options?: SelectOptions<T>[];
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, options, defaultValue, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<T | null>(null);

    const handleOptionClick = useCallback(
        (optionValue: T) => {
            setSelectedOption(optionValue)
            onChange?.(optionValue);
            setIsOpen(false);
        },
        [onChange],
    );

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <li onClick={() => handleOptionClick(opt.value)} className={cls.item} key={opt.value}>
                {opt.content}
            </li>
        ));
    }, [options, handleOptionClick]);

    return (
        <>
            <div className={cls.trigger} onClick={() => setIsOpen(true)}>
                {selectedOption
                    ? options?.find((opt) => opt.value === selectedOption)?.content
                    : defaultValue}
            </div>
            {isOpen && (
                <Portal>
                    <div className={classNames(cls.Select, {}, [className])}>
                        <Overlay isClosed={!isOpen} onClick={() => setIsOpen(false)} />
                        <div className={classNames(cls.wrapperSelect, {}, [])}>
                            <ul>{optionsList}</ul>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};
