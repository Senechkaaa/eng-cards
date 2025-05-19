import { classNames } from '@shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { memo } from 'react';
import { UserInfoAndFriends } from '@widgets/UserInfoAndFriends';

export interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {

    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <UserInfoAndFriends />
        </div>
    );
});

export default ProfilePage;
