# Rebasing onto `origin/main` before a PR

This guide explains how to update your branch with the latest `main` **before
you open a pull request**, and why we prefer `rebase` over `merge` to do it.

## What problem are we solving?

While you were working on your branch, other people merged their work into
`main`. So your branch and `main` have **drifted apart**: you have commits they
don't, and they have commits you don't.

```
        A---B---C   your branch (feature)
       /
  D---E---F---G      origin/main   <- moved forward while you worked
```

Before your PR is reviewed and merged, your branch needs to "catch up" to the
latest `main`. There are two ways to do that: **merge** or **rebase**. They
reach a similar result but produce very different histories.

## The two strategies, side by side

### Merge — _combine_ the two histories

`git merge origin/main` creates a brand-new **merge commit** (`M`) that ties the
two histories together. Your original commits stay exactly where they were.

```
        A---B---C-------M   feature
       /               /
  D---E---F---G--------     origin/main
```

- ✅ Your commits are never rewritten — their hashes don't change.
- ❌ History becomes a **tangle of branches** with extra merge commits.
- ❌ The graph no longer reads as a simple story of "what changed."

### Rebase — _replay_ your work on top of the latest `main`

`git rebase origin/main` takes your commits, sets them aside, fast-forwards your
branch to the tip of `main`, then **replays your commits one by one** on top.

```
                  A'--B'--C'   feature  (replayed on top of main)
                 /
  D---E---F---G              origin/main
```

- ✅ History stays **linear** — it reads like you started your work _today_, from
  the current `main`.
- ✅ No noisy merge commits; the PR diff shows only your changes.
- ⚠️ Your commits are **rewritten** — `A B C` become _new_ commits `A' B' C'`
  with new hashes. This is why a rebased branch needs a force-push (see below).

### Why we prefer rebase here

A clean, linear history makes pull requests easier to review and `git log` /
`git bisect` far easier to read later. **We rebase before opening a PR** so the
reviewer sees a tidy series of commits applied on top of current `main`, with no
merge noise.

> Rule of thumb: **rebase to update your _own_ branch before a PR; never rebase a
> branch other people are already building on.** Rewriting shared history forces
> everyone else to untangle their copies.

## How to rebase your branch onto `origin/main`

### 1. Commit or stash your work first

Rebase needs a clean working tree. Either commit your changes or stash them:

```bash
git status            # make sure nothing important is uncommitted
git stash             # (optional) shelve work-in-progress
```

### 2. Fetch the latest `main`

`fetch` downloads the newest commits from the remote **without changing your
branch**. This updates your local `origin/main` pointer.

```bash
git fetch origin
```

### 3. Rebase onto it

```bash
git rebase origin/main
```

Git now replays each of your commits on top of the latest `main`:

```
  before:  D---E---F---G  origin/main
                \
                 A---B---C  feature

  git rebase origin/main

  after:   D---E---F---G  origin/main
                       \
                        A'--B'--C'  feature
```

If you stashed earlier, bring your work back now: `git stash pop`.

### 4. Resolve conflicts, one commit at a time

A **conflict** happens when your changes and the new `main` changes touch the
same lines. Unlike merge (which throws all conflicts at you at once), rebase
stops at **each conflicting commit** so you fix them in small batches.

```bash
# Git pauses and tells you which files conflict.
# Open them, look for the <<<<<<< ======= >>>>>>> markers, and fix by hand.

git add <fixed-files>     # mark each file resolved
git rebase --continue     # move on to the next commit
```

Other handy controls while a rebase is paused:

```bash
git rebase --skip      # drop the current commit (use with care)
git rebase --abort     # bail out entirely and return to where you started
```

`--abort` is your safety net: it puts the branch back exactly as it was before
you ran `rebase`.

### 5. Push the rebased branch

Because rebase **rewrote your commits**, the remote still has the old ones. A
normal `git push` will be rejected ("the remote contains work you don't have").
You must force-push — but use the **safe** variant:

```bash
git push --force-with-lease
```

- `--force` blindly overwrites the remote — it can destroy a teammate's commits
  if someone pushed to your branch in the meantime.
- `--force-with-lease` only overwrites if the remote is **still where you last
  saw it**. If someone else pushed, it refuses, protecting their work.

Always prefer `--force-with-lease`.

### 6. Open your PR

Your branch now sits cleanly on top of `origin/main`. Open the pull request — the
diff shows only your changes, with no merge commits in the way.

## Quick reference

```bash
git fetch origin                 # 1. get the latest main
git rebase origin/main           # 2. replay your commits on top
#   ...fix conflicts, then:
git add <files>                  #    mark resolved
git rebase --continue            #    continue the rebase
git push --force-with-lease      # 3. update your branch safely
#   ...then open the PR
```

## Mental model: merge vs. rebase in one picture

```
  MERGE  (preserves history, adds a merge commit)

        A---B---C-------M   feature
       /               /
  D---E---F---G--------     origin/main


  REBASE (rewrites history, stays linear)

                  A'--B'--C'   feature
                 /
  D---E---F---G              origin/main
```

Same end state (your work sits on top of the latest `main`); very different
history. We choose **rebase** for a clean, linear, review-friendly PR.
