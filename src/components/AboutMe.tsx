import { Box, Stack, Typography } from '@mui/material';

import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';

const styles = {
  title: { fontWeight: 700 },
  sectionTitle: { fontWeight: 700 },
  groupTitle: { fontWeight: 700, textDecoration: 'underline' },
  bulletList: {
    m: 0,
    pl: 2.5,
    listStyleType: 'disc',
  },
  bulletItem: { typography: 'body1' },
} as const;

function AboutMe() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {ABOUT_ME_CONTENT.title}
      </Typography>
      <Box component="ul" sx={styles.bulletList}>
        {ABOUT_ME_CONTENT.intro.map((p, idx) => (
          <Box key={idx} component="li" sx={styles.bulletItem}>
            {p.parts.map((part, i) =>
              part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>,
            )}
          </Box>
        ))}
      </Box>

      {ABOUT_ME_CONTENT.sections.map((section) => (
        <Stack key={section.title} spacing={1}>
          <Typography variant="h5" sx={styles.sectionTitle}>
            {section.title}
          </Typography>

          {section.groups.map((group) => (
            <Stack key={group.title} spacing={0.5}>
              <Typography variant="subtitle1" sx={styles.groupTitle}>
                {group.title}
              </Typography>

              {'items' in group ? (
                <Box component="ul" sx={styles.bulletList}>
                  <Box component="li" sx={styles.bulletItem}>
                    {group.items.join(', ')}
                  </Box>
                </Box>
              ) : (
                <Box component="ul" sx={styles.bulletList}>
                  <Box component="li" sx={styles.bulletItem}>
                    {group.description}
                  </Box>
                </Box>
              )}
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default AboutMe;
