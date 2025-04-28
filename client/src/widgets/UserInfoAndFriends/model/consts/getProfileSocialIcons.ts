import FacebookIcon from '@shared/assets/icons/facebook.svg';
import InstagramIcon from '@shared/assets/icons/instagram.svg';
import TwitterIcon from '@shared/assets/icons/twitter.svg';
import TelegramIcon from '@shared/assets/icons/telegram.svg';
import { SocialLinks } from '@shared/const/links';

export interface SocialIcon {
    Icon: string;
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
