import { Box } from '@mui/material';

import { useLanguage } from '../../context/useLanguage';
import { LANGUAGE_SWITCHER_LABELS, LANGUAGE_SWITCHER_TEXT } from '../../data/languageSwitcherText';
import { bold } from '../../theme/sharedStyles';
import { PILL_SWITCH_SIZES } from '../../theme/tokens';
import PillToggleSwitch from './PillSwitch';

function LanguageSwitcher({ small = false }: { small?: boolean }) {
  const { lang, toggle } = useLanguage();
  const isCs = lang === 'cs';
  const text = LANGUAGE_SWITCHER_TEXT[lang];
  const { track, height, thumb, labelFontSize } = PILL_SWITCH_SIZES[small ? 'small' : 'medium'];
  const labelSx = { fontSize: labelFontSize, ...bold };

  return (
    <PillToggleSwitch
      size={{ track, height, thumb }}
      checked={isCs}
      onChange={toggle}
      ariaLabel={text.ariaLabel}
      tooltip={text.tooltip}
      startContent={
        <Box component="span" sx={labelSx}>
          {LANGUAGE_SWITCHER_LABELS.en}
        </Box>
      }
      endContent={
        <Box component="span" sx={labelSx}>
          {LANGUAGE_SWITCHER_LABELS.cs}
        </Box>
      }
    />
  );
}

export default LanguageSwitcher;
