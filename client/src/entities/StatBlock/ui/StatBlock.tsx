import { classNames } from '@shared/lib/classNames/classNames';
import cls from './StatBlock.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@shared/ui/Text';
import { Row } from '@shared/ui/Row';

interface StatBlockProps {
    className?: string;
}

export const StatBlock = memo(({ className }: StatBlockProps) => {
    const { t } = useTranslation();

    return (
        <Row justify='between' className={cls.CardStatistic}>
            <Row
                direction='column'
                align='center'
                justify='center'
                className={classNames(cls.StatBlock, {}, [className])}
            >
                <Text theme='blue' title={'85'} size='l' />
                <Text theme='blue' title={t('Учить')} size='m' />
            </Row>
            <Row
                direction='column'
                align='center'
                justify='center'
                className={classNames(cls.StatBlock, {}, [className])}
            >
                <Text theme='green' title={'26'} size='l' />
                <Text theme='green' title={t('Знаю')} size='m' />
            </Row>
            <Row
                direction='column'
                align='center'
                justify='center'
                className={classNames(cls.StatBlock, {}, [className])}
            >
                <Text theme='yellow' title={'112'} size='l' />
                <Text theme='yellow' title={t('Выучено')} size='m' />
            </Row>
        </Row>
    );
});
