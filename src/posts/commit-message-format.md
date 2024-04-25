---
title: Commit Message Format
image: ""
date: 25/04/2024
---
Header of a commit message includes a **type**, a **scope** and a **subject**.

```
<type>(<scope>): <subject>
```

The **header** is mandatory and the **scope** of the header is optional.

```
docs(changelog): update changelog to beta.5
```
Commit message with `!` to draw attention to breaking change
```
feat!: send an email to the customer when a product is shipped
```
**Type**
Must be one of the following:
```
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing test
```

**Subject**
The subject contains a succinct description of the change:
-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize the first letter
-   no dot (.) at the end
