import { classNames } from '@shared/lib/classNames/classNames';
import cls from './StatBlock.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@shared/ui/Text';

interface StatBlockProps {
    className?: string;
}

export const StatBlock = memo(({ className }: StatBlockProps) => {
    const { t } = useTranslation();

    return (
        <div className={cls.CardStatistic}>
            <div className={classNames(cls.StatBlock, {}, [className])}>
                <Text theme='blue' title={"85"} size='l' bold/>
                <Text theme='blue' title={t('Учить')} size='m' />
            </div>
            <div className={classNames(cls.StatBlock, {}, [className])}>
                <Text theme="green" title={"26"} size='l' bold/>
                <Text theme="green" title={t('Знаю')} size='m' />
            </div>
            <div className={classNames(cls.StatBlock, {}, [className])}>
                <Text theme='yellow' title={"112"} size='l' bold/>
                <Text theme='yellow' title={t('Выучено')} size='m' />
            </div>
        </div>
    );
});
