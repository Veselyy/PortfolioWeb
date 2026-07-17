---
name: work-issue
description: >-
  Take a GitHub issue on Veselyy/PortfolioWeb from branch to reviewable PR.
  Use when the user says "do my issue", "work on issue #N", "pick up issue N",
  or wants the full issue -> branch -> commit -> push -> PR flow.
---

# Work an issue

Drive a single GitHub issue on `Veselyy/PortfolioWeb` end-to-end: branch, implement,
commit, push, open PR, assign for review.

## 0. Pick the issue

If no issue number was given, run `gh issue list --repo Veselyy/PortfolioWeb` and ask
which one. Then fetch full context:

```bash
gh issue view <N> --repo Veselyy/PortfolioWeb --json title,body,labels,comments
```

If title/body are terse or empty, use judgment (and the repo's `portfolioweb_context/CONTEXT.md`)
to infer what's actually being asked, and confirm the interpretation with the user
before writing code if it's ambiguous.

## 1. Branch

From an up-to-date `main`, create a branch named `issue-<N>-<slug>`, where `<slug>`
is a short kebab-case version of the issue title (transliterate/translate non-English
titles to English for the slug).

```bash
git checkout main && git pull
git checkout -b issue-<N>-<slug>
```

If this repo depends on `vesely-dev-config`, note that plain `pnpm install` won't pull
in commits pushed there since the last install — the lockfile pins the resolved version.
If lint/format rules seem out of date, run `pnpm update vesely-dev-config` to refresh it.

## 2. Implement

Do the actual work interactively — this step is not scripted. Follow the repo's
existing conventions and CLAUDE.md / portfolioweb_context/CONTEXT.md. Keep the diff scoped to the issue.

## 3. Commit

Stage only the files relevant to this change (never `git add -A`/`.` blindly — check
`git status` first). Write a commit message describing the _why_, ending with a line
`Closes #<N>`.

## 4. Push and open PR

```bash
git push -u origin issue-<N>-<slug>
gh pr create --repo Veselyy/PortfolioWeb \
  --title "<concise title referencing the issue>" \
  --body "$(cat <<'EOF'
## Summary
- ...

Closes #<N>

## Test plan
- [ ] ...
EOF
)"
```

## 5. Assign for review

GitHub rejects review requests where the requester is also the PR author, so request
review does not work for a single-person repo. Instead assign the PR to the user so it
shows up in their queue:

```bash
gh pr edit --repo Veselyy/PortfolioWeb --add-assignee @me
```

If the user later adds a second collaborator to the repo, switch this step to
`gh pr edit --add-reviewer <username>` instead.

## 6. Report back

Give the PR URL and a one-line summary of what changed. Do not merge — leave that to the user.
