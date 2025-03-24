import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderToolbar.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { IconSwitcher } from '@shared/ui/IconSwitcher/IconSwitcher';
import PalleteIcon from '@shared/assets/icons/palette.svg';
import PalleteFilledIcon from '@shared/assets/icons/palette-filled.svg';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';
import StatisticsIcon from '@shared/assets/icons/statistics.svg';
import StatisticsFilledIcon from '@shared/assets/icons/statistics-filled.svg';
import { SlidingDrawer } from '@shared/ui/SlidingDrawer/SlidingDrawer';

interface HeaderToolbarProps {
    className?: string;
}

type Item = 'pallete' | 'statistics'

export const HeaderToolbar = memo(({ className }: HeaderToolbarProps) => {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState<Item>();

    const handleSelected = (item: Item) => {
        setSelectedItem(item)
    };

    return (
        <div className={classNames(cls.HeaderToolbar, {}, [className])}>
            <IconSwitcher
                onClick={() => handleSelected('pallete')}
                Icon={PalleteIcon}
                SelectedIcon={PalleteFilledIcon}
                isSelected={selectedItem === 'pallete'}
            />
            <LangSwitcher className={cls.lang_switcher} />

            <IconSwitcher
                onClick={() => handleSelected('statistics')}
                Icon={StatisticsIcon}
                SelectedIcon={StatisticsFilledIcon}
                isSelected={selectedItem === 'statistics'}
            />
            <SlidingDrawer>
                <h2>fdksfds</h2>
                <div>fddfdsf</div>
            </SlidingDrawer>
        </div>
    );
});
