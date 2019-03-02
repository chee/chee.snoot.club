---
date: 2017-01-12T22:11:29.108Z
---
# adding commands to git

did you know that you can add commands to git by naming them right and placing
them in your path?

if you put this:

```bash
#!/bin/sh
git branch | awk '/\*/ {print $2}'
```

into a file called `git-current-branch`, make it executable and put it somewhere
in `$PATH` (i use `~/bin` which i've added to `$PATH`), you will be able to use
it like this:

```bash
$ git current-branch
feature/lolSausages
```

and bash/zsh completions will tab complete them too

that example would probably make more sense to be an alias, but what about
something like this:

```bash
#!/bin/sh
branch=$1

if [ -z "$branch" ]; then
  branch=$(git current-branch)
fi

git branch -u origin/${branch}
```

ooh, or

```bash
#!/bin/sh

function=$1
file=$2

if [ -z "$function" ] || [ -z "$file" ]; then
  echo 'usage: git log-function <function> <file>'
  exit 1
fi

git log -L ":$function:$file"
```


i'm sure you can come up with something more useful
