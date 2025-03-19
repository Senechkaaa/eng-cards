import { Button } from '@shared/ui/Button';
import cl from './Switch.module.scss';
import { Text } from '@shared/ui/Text';
import { FC } from 'react';
import { classNames } from '@shared/lib/classNames/classNames';

interface SwitchProps {
    setVisible: (visible: boolean) => void;
    visible: boolean;
}

export const Switch: FC<SwitchProps> = ({ setVisible, visible }) => {
    return (
        <div className={cl.container_text}>
            <Button
                className={classNames(cl.btn, { [cl.visible]: visible }, [])}
                variant='none'
                onClick={() => setVisible(false)}
            >
                <Text bold classname={cl.text} size='sm' title='Sign Up' />
            </Button>
            <Button
                className={classNames(cl.btn, { [cl.visible]: visible }, [])}
                variant='none'
                onClick={() => setVisible(true)}
            >
                <Text bold classname={cl.text} size='sm' title='Sign In' />
            </Button>

            {/* {visible ? <SignInForm /> : <SignUpForm />} */}
        </div>
    );
};
