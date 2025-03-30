import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderCards.module.scss';
import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
import { IconSwitcher } from '@shared/ui/IconSwitcher/IconSwitcher';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';
import { SlidingDrawer } from '@shared/ui/SlidingDrawer/SlidingDrawer';
import PalleteIcon from '@shared/assets/icons/palette.svg';
import PalleteFilledIcon from '@shared/assets/icons/palette-filled.svg';
import StatisticsIcon from '@shared/assets/icons/statistics.svg';
import StatisticsFilledIcon from '@shared/assets/icons/statistics-filled.svg';

interface HeaderCardsProps {
    className?: string;
}

interface onChangeDrawerProps {
    setCurrentState: Dispatch<SetStateAction<boolean>>;
    setOtherState: Dispatch<SetStateAction<boolean>>;
}

export const HeaderCards = memo(({ className }: HeaderCardsProps) => {
    const [isShowDrawerPallete, setIsShowDrawerPallete] = useState(false);
    const [isShowDrawerStatistics, setIsShowDrawerStatistics] = useState(false);

    const onChangeDrawer = useCallback(
        ({ setCurrentState, setOtherState }: onChangeDrawerProps) => {
            setOtherState(false);
            setCurrentState((prev) => !prev);
        },
        [],
    );

    return (
        <div className={classNames(cls.header_cards, {}, [className])}>
            <IconSwitcher
                onClick={() =>
                    onChangeDrawer({
                        setCurrentState: setIsShowDrawerPallete,
                        setOtherState: setIsShowDrawerStatistics,
                    })
                }
                Icon={PalleteIcon}
                SelectedIcon={PalleteFilledIcon}
                isSelected={isShowDrawerPallete}
            />
            <LangSwitcher className={cls.lang_switcher} />
            <IconSwitcher
                onClick={() =>
                    onChangeDrawer({
                        setCurrentState: setIsShowDrawerStatistics,
                        setOtherState: setIsShowDrawerPallete,
                    })
                }
                Icon={StatisticsIcon}
                SelectedIcon={StatisticsFilledIcon}
                isSelected={isShowDrawerStatistics}
            />

            {isShowDrawerPallete && (
                <SlidingDrawer
                    lazy
                    isOpen={isShowDrawerPallete}
                    onClose={() => setIsShowDrawerPallete(false)}
                >
                    <h2>Pallete</h2>
                </SlidingDrawer>
            )}
            {isShowDrawerStatistics && (
                <SlidingDrawer
                    isOpen={isShowDrawerStatistics}
                    onClose={() => setIsShowDrawerStatistics(false)}
                >
                    <h2>Statistics</h2>
                </SlidingDrawer>
            )}
        </div>
    );
});
