import { Stack, Typography } from '@mui/material';

function AboutMe() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" align="center" sx={{ fontWeight: '700' }}>
        O Mně
      </Typography>
      <Typography variant="body1">
        Zdravím, já jsem Martin, jsem z venkova a věnuji se <strong>IT</strong> už{' '}
        <strong>4 rokem</strong> a jsem také <strong>OSVČ</strong>. <br />
        Jsem <strong>student</strong>, rád dělám sporty a rád se bavím s lidmi, kteří mi mají co
        předat. <br />
        Můj silný zájem o učení a <strong>osobní rozvoj</strong> mě motivuje využívat každou{' '}
        <strong>příležitost</strong> ke kariérnímu růstu. <br />
        Rád budu <strong>čelit</strong> novým výzvám a <strong>rád přispěju</strong> ke společnému
        úspěchu.
      </Typography>
    </Stack>
  );
}

export default AboutMe;
