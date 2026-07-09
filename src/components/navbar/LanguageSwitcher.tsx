import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useLanguage } from '../../context/useLanguage';

const TEXT = {
  cs: {
    tooltip: 'Switch to English',
    ariaLabel: 'Přepnout jazyk na angličtinu',
  },
  en: {
    tooltip: 'Přepnout do češtiny',
    ariaLabel: 'Switch language to Czech',
  },
} as const;

function LanguageSwitcher() {
  const { lang, toggle } = useLanguage();
  const text = TEXT[lang];

  return (
    <Tooltip title={text.tooltip}>
      <IconButton color="inherit" onClick={toggle} aria-label={text.ariaLabel}>
        <TranslateOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default LanguageSwitcher;
