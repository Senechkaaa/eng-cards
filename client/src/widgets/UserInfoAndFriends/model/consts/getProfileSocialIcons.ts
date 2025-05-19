import {ReactComponent as FacebookIcon} from '@shared/assets/icons/facebook.svg';
import {ReactComponent as InstagramIcon} from '@shared/assets/icons/instagram.svg';
import {ReactComponent as TwitterIcon} from '@shared/assets/icons/twitter.svg';
import {ReactComponent as TelegramIcon} from '@shared/assets/icons/telegram.svg';
import { SocialLinks } from '@shared/const/links';
import { FC, SVGProps } from 'react';

export interface SocialIcon {
    Icon:  FC<SVGProps<SVGSVGElement>>;
    link: SocialLinks;
}

export const getProfileSocialIcons = (): SocialIcon[] => {
    return [
        {
            Icon: FacebookIcon,
            link: SocialLinks.Facebook,
        },
        {
            Icon: InstagramIcon,
            link: SocialLinks.Instagram,
        },
        {
            Icon: TwitterIcon,
            link: SocialLinks.Twitter,
        },
        {
            Icon: TelegramIcon,
            link: SocialLinks.Telegram,
        },
    ];
};
