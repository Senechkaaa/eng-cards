import { classNames } from '@shared/lib/classNames/classNames';
import cls from './UserInfoAndFriends.module.scss';
import { memo, useCallback, useMemo, useState } from 'react';
import { getUserAuthData } from '@entities/User';
import { useAppSelector } from '@shared/lib/hooks/useAppSelector/useAppSelector';
import { Text } from '@shared/ui/Text';
import { Divider } from '@shared/ui/Divider/Divider';
import { Row } from '@shared/ui/Row';
import { getProfileElements } from '../../model/consts/getProfileElements';
import { ProfileListItem } from '../ProfileListItem/ProfileListItem';
import LogoutIcon from '@shared/assets/icons/logout.svg';
import { getProfileSocialIcons } from '../../model/consts/getProfileSocialIcons';
import { AppLink } from '@shared/ui/AppLink';
import { useLogoutMutation } from '@features/AuthByUsername';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@shared/const/router';
import { AppImage } from '@shared/ui/AppImage';

interface UserInfoAndFriendsProps {
    className?: string;
}

export const UserInfoAndFriends = memo(({ className }: UserInfoAndFriendsProps) => {
    const user = useAppSelector(getUserAuthData);
    const profileList = getProfileElements();
    const profileLinksList = getProfileSocialIcons();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    console.log(file)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const itemsList = useMemo(() => {
        return profileList.map((item) => <ProfileListItem item={item} key={item.title} />);
    }, [profileList]);

    const linksList = useMemo(() => {
        return profileLinksList.map((link) => (
            <AppLink
                rel='noopener noreferrer'
                target='_blank'
                className={cls.linkItem}
                to={link.link}
                key={link.link}
            >
                <link.Icon />
            </AppLink>
        ));
    }, [profileLinksList]);

    const onLogout = useCallback(() => {
        console.log('logout');
        navigate(Routes.HOME);
        logout({});
    }, [logout, navigate]);

    return (
        <Row
            direction='column'
            align='center'
            className={classNames(cls.UserInfoAndFriends, {}, [className])}
        >
            {user && (
                <Row direction='column' align='center' className={cls.userData}>
                    <div className={cls.avatarCont}>
                        <AppImage
                            className={cls.avatar}
                            src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
                            alt='user avater'
                        />
                        <input className={cls.input} type='file' onChange={handleFileChange} />
                    </div>

                    <Text
                        className={cls.titleUsername}
                        align='center'
                        theme='gray'
                        title={user.username}
                        size='m'
                    />
                    <Text
                        className={cls.titleEmail}
                        align='center'
                        theme='gray'
                        title={user.email}
                        size='m'
                    />
                    <Divider className={cls.divider} one border='thin' />
                </Row>
            )}

            <div className={cls.profileList}>{itemsList}</div>
            <Row className={cls.listLinks} align='center' justify='center'>
                {linksList}
            </Row>
            <Row onClick={onLogout} align='center' className={cls.profileItem}>
                <LogoutIcon />
                <Text className={cls.title} size='m' theme='gray' title='Выйти' />
            </Row>
        </Row>
    );
});
