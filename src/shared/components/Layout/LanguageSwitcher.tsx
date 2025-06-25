import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang?: string) => {
        setAnchorEl(null);
        if (lang) i18n.changeLanguage(lang);
    };

    return (
        <>
            <Tooltip title="เปลี่ยนภาษา">
                <IconButton color="inherit" onClick={handleClick}>
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                <MenuItem onClick={() => handleClose('th')}>ไทย</MenuItem>
                <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
            </Menu>
        </>
    );
}
