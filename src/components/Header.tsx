import { IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';

const subtitleSx = {
  fontWeight: 500,
  p: 0.5,
  bgcolor: 'info.main',
  borderRadius: 1,
} as const;

function Header() {
  return (
    <Stack spacing={3}>
      <Typography variant="h1" sx={{ fontWeight: '700' }}>
        Poutavý nadpis
      </Typography>
      <Typography variant="h4">Základní služby</Typography>
      <Stack direction={'row'} spacing={3}>
        <Typography variant="subtitle1" sx={subtitleSx}>
          Máš zájem?
        </Typography>
        <IconButton
          component="a"
          href="https://wa.me/420732424435"
          target="_blank"
          rel="noreferrer"
          aria-label="Kontaktovat přes WhatsApp"
          sx={{
            color: 'inherit',
            bgcolor: 'info.main',
            p: 1,
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
            '&:hover': { bgcolor: 'info.main', transform: 'scale(1.1)' },
            '&:focus-visible': { bgcolor: 'info.main', transform: 'scale(1.1)' },
          }}
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:veselymartin.online@gmail.com"
          aria-label="Napsat e-mail"
          sx={{
            color: 'inherit',
            bgcolor: 'info.main',
            p: 1,
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
            '&:hover': { bgcolor: 'info.main', transform: 'scale(1.1)' },
            '&:focus-visible': { bgcolor: 'info.main', transform: 'scale(1.1)' },
          }}
        >
          <MailIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Header;
