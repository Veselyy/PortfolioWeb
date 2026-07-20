---
name: save-context
description: Save a short, dated summary of the current work session — split automatically between what's project-specific and what's general/cross-project. Project-specific parts go to the project's context file (path taken from CLAUDE.md, e.g. notes/CONTEXT.md); general parts (about how the user works, standing preferences, reusable practices — not tied to this one codebase) go to the general vault (Coding/notes/General-Context.md). Use this whenever the user asks to "save context", "save this to context", "update context.md", "remember this session", "log what we did", or wants to wrap up a work session and preserve continuity for next time. Also trigger proactively when a work session is clearly wrapping up and meaningful progress was made (code changed, decisions made, a feature finished), even if the user doesn't explicitly name the file — context that isn't saved is lost the moment the session ends.
---

# Save Context

## Why this matters

A fresh session (even in the same project folder) does not automatically remember what happened in a previous conversation. Context files are the only thing that persist — but only if they're actually updated, and only if the right fact ends up in the right file. Something learned about _how the user likes to work_ is useless sitting in one project's log where no other project will ever read it; something specific to _this codebase_ is clutter in the general profile every other project loads. This skill's job is to close both gaps at once: turn "what we just did" into short, durable notes, filed in the place a future session will actually look for them.

## Steps

1. **Find both destination files from the project's `CLAUDE.md`.** Read the project's `CLAUDE.md` — it lists both files as `@import` lines. The line pointing _outside_ the current project (e.g. `@../notes/General-Context.md`) is the general vault; the line pointing _inside_ the project (e.g. `@notes/CONTEXT.md`, `@problem-tree-app_context/CONTEXT.md`, or any other folder name) is the project file. Folder naming varies per project — always read the actual path from `CLAUDE.md` rather than assuming `notes/`.

   If `CLAUDE.md` doesn't exist or has no imports, fall back to checking `notes/CONTEXT.md`, `CONTEXT.md` (project root), or `notes/CLAUDE.md`/`CLAUDE.md` directly for the project file, and treat this project as having no general vault wired up (only save the project file, don't guess at a general-vault path).

   If no project file exists either, ask the user where it should go, or offer to create one at a sensible path.

2. **Review the current conversation** and identify what actually happened this session — files changed, features fixed, bugs resolved, decisions made, things tried and abandoned (and why, if useful later).

3. **Sort each item into one of two buckets:**
   - **Project-specific** — anything tied to this codebase: a component renamed, a bug fixed, an architectural decision for this app, a workflow detail for this repo. This is the large majority of most sessions.
   - **General** — anything true regardless of which project the user is in: a communication preference they stated or corrected, a standing tool/workflow choice, a best practice they asked you to always follow, something about their background or goals. This bucket is often empty — most sessions don't surface anything general, and that's fine.

   When in doubt, ask: "would this fact change what I do in a _different_ project?" If yes, it's general. If it only makes sense in the context of this codebase, it's project-specific.

4. **Draft the entries:**
   - **Project entry**: under a `## Session Log` section (add it at the end of the file if it doesn't exist yet):
     ```
     ### YYYY-MM-DD
     - [specific thing accomplished]
     - [specific thing accomplished]
     ```
     Use today's date. Aim for 2-6 bullets — specific enough to be useful, short enough to stay scannable. If today's date already has an entry, add to it rather than duplicating the heading. Don't repeat what's already captured elsewhere in the file.
   - **General entry** (only if step 3 found something): don't create a dated log entry for this one — merge it as a bullet into whichever existing section of the general vault it belongs to (e.g. "Communication preferences," "Best practices," "Stack I typically work in"). These are standing facts, not session events, so they should read naturally alongside what's already there, not as a timestamped diary. If nothing in the vault fits, propose a new section rather than forcing it into an unrelated one.

5. **Show the user both drafts before writing anything** — the project Session Log entry, and (if applicable) the general vault addition with the exact section it'll go under. Something like: "Here's what I'd add to the project context, and this one bit seems general enough for `General-Context.md` — look right?" Wait for confirmation or edits. This step is not optional.

6. **Once confirmed, write each entry to its own file** — don't rewrite or reorder other sections, just append/insert as described above. If the user requests changes, incorporate them and confirm the revised draft before writing.

## What this is not

This is session-continuity + profile-maintenance, not a full changelog or commit log — git history and PR descriptions already cover implementation detail. Focus on what someone (or some future Claude session, in this project or another) picking things back up would actually need to know that isn't obvious from the code alone: what was decided, what's still open, what to watch out for, and — rarely — what's true about the user across every project, not just this one.
