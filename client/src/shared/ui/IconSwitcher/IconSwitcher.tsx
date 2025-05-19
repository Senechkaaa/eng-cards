import { FC, memo, SVGProps } from 'react';
import { Button } from '../Button';

interface IconSwitcherProps {
    Icon: FC<SVGProps<SVGSVGElement>>;
    SelectedIcon: FC<SVGProps<SVGSVGElement>>;
    isSelected: boolean;
    onClick?: () => void;
}

export const IconSwitcher = memo((props: IconSwitcherProps) => {
    const { Icon, SelectedIcon, isSelected, onClick } = props;

    return (
        <Button variant='none' onClick={onClick}>
            {isSelected ? <SelectedIcon /> : <Icon />}
        </Button>
    )
});
