---
date: 2019-08-10T21:29:11Z
---
# emacs

when you press a key with a letter on it in emacs, it doesn't put that key on
the screen right away. first it checks what lisp command is bound to that
key. by default, it runs `self-insert-command`, which inserts the letter you
have pressed into the buffer you're on. you can override this, or any other
keybinding, mouse click, wheel roll with any other command. even commands
you wrote yourself.

there are packages for everything, there's a [twitter
mode](http://twmode.sourceforge.net/ "twittering-mode's homepage"). and there's
a mode^[emacs has this concept of modes. there is always a current "major mode"
and any number of "minor modes". the modes are definitions of what different
keys do and commands that run at different times. your major-mode will be
whatever the language is you're writing in (rust, lisp, markdown, text etc) and
the minor modes will take care of things like linting.] for markdown, i'm using
it right now. i've also got a pane at the bottom running the local copy of my
blog server, and a pane over on the right with an embedded webkit pointed at the
server so i can see the article while i write.

![screenshot of the emacs session described
above](https://share.snoot.club/peqax/viyip.png)

<small>
  /it even has devtools./
  /i mean it's webkit's devtools but come on still p cool right??/
</small>


i own [a paper
copy](https://shop.fsf.org/books/gnu-emacs-manual-18th-edition-v-261) of [the
emacs manual](https://www.gnu.org/software/emacs/manual/html_mono/emacs.html),
it's really big. i used it the other day when i was setting up gnus to read my
email in emacs. i also have a copy of a [gnu book about emacs
lisp](https://shop.fsf.org/books/signed-introduction-programming-emacs-lisp-3rd-edition).
it's less big. all the content is available _free_ly online. it's also built
into the text editor.

if you press <kbd>C\-h</kbd><kbd>k</kbd>^[this notation means `Ctrl+H H`.  `M-a`
would mean `Meta` and `a`. Meta means alt/option. `s-p` is `super` and
`p`. Super means command, or the windows key. emacs is older than all the normal
words for things. cut and paste are called kill and yank. i don't know when we
agreed on all the normal names for things, but back when emacs was invented it
was all still pretty psychedelic. a few years later when the folks at bell labs
made [plan9](https://9p.io/plan9/index.html) they called copy "snarf". i don't
know.] and then any other key, you'll be told what command is bound to that key,
and where that command is defined. <kbd>C\-h</kbd><kbd>k</kbd> itself runs the
command `describe-key`. the `C-h` prefix also lets you interogate the emacs
process for lots of other kinds of information. If you press
<kbd>C-h</kbd><kbd>?</kbd> it will tell you itself:

<details>
<summary>Expand to see the output of <kbd>C-h</kbd><kbd>?</kbd></summary>
```
You have typed C-h, the help character.  Type a Help option:
(Use SPC or DEL to scroll through this text.  Type q to exit the Help command.)

a PATTERN   Show commands whose name matches the PATTERN (a list of words
              or a regexp).  See also the ‘apropos’ command.
b           Display all key bindings.
c KEYS      Display the command name run by the given key sequence.
C CODING    Describe the given coding system, or RET for current ones.
d PATTERN   Show a list of functions, variables, and other items whose
              documentation matches the PATTERN (a list of words or a regexp).
e           Go to the *Messages* buffer which logs echo-area messages.
f FUNCTION  Display documentation for the given function.
F COMMAND   Show the Emacs manual’s section that describes the command.
g           Display information about the GNU project.
h           Display the HELLO file which illustrates various scripts.
i           Start the Info documentation reader: read included manuals.
I METHOD    Describe a specific input method, or RET for current.
k KEYS      Display the full documentation for the key sequence.
K KEYS      Show the Emacs manual’s section for the command bound to KEYS.
l           Show last 300 input keystrokes (lossage).
L LANG-ENV  Describes a specific language environment, or RET for current.
m           Display documentation of current minor modes and current major mode,
              including their special commands.
n           Display news of recent Emacs changes.
o SYMBOL    Display the given function or variable’s documentation and value.
p TOPIC     Find packages matching a given topic keyword.
P PACKAGE   Describe the given Emacs Lisp package.
r           Display the Emacs manual in Info mode.
s           Display contents of current syntax table, plus explanations.
S SYMBOL    Show the section for the given symbol in the Info manual
              for the programming language used in this buffer.
t           Start the Emacs learn-by-doing tutorial.
v VARIABLE  Display the given variable’s documentation and value.
w COMMAND   Display which keystrokes invoke the given command (where-is).
.           Display any available local help at point in the echo area.

C-a         Information about Emacs.
C-c         Emacs copying permission (GNU General Public License).
C-d         Instructions for debugging GNU Emacs.
C-e         External packages and information about Emacs.
C-f         Emacs FAQ.
C-m         How to order printed Emacs manuals.
C-n         News of recent Emacs changes.
C-o         Emacs ordering and distribution information.
C-p         Info about known Emacs problems.
C-s         Search forward "help window".
C-t         Emacs TODO list.
C-w         Information on absence of warranty for GNU Emacs.
```
</details>


everything lives in one lisp session, you can evaluate code and change how the
editor works. you can rewrite functions that are used by other packages.  you
can save that code so it's loaded later, otherwise it'll live only for this
session. you can have subprocesses and terminals and nothing is ever "just the way it
is", everything can be made to work the way that suits you.

it has the potential to be the smoothest, most streamlined process for
developing code (or editing text at all) in the world. it has the potential to
let you be faster than you could with any other editor. except, because things
are never "just the way it is" it slows me down so much. in any other editor if
i was like "i wish that terminal didn't open all the way across" or whatever,
i'd be like "oh well" but in emacs i'm like "oh let's open up some elisp^[that's
the programming language you can use to configure emacs, and the language it's
mainly written in. emacs lisp, a lisp dialect]".

while i was writing this i got distracted a whole bunch of times. at the top of
all my posts there is a single line of
[frontmatter](https://jekyllrb.com/docs/front-matter/)^[frontmatter is kind of
gross, right? oh damn i should put it in the filename. like
`emacs.2019-08-10.23:53.md` or something. that's a great idea thanks chee]. a
variable called "date" that tells the program that builds my blog into html what
date the post was written. as i went to type the date i thought "i shouldn't
have to type this" so i pressed <kbd>M\-x</kbd>^[This opens up a thing that lets
me run any lisp function that's been defined as "interactive". i guess it's like
<kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> in sublime text or atom or
whatever.] and went looking for a function to insert a date. then i googled^[i
use duckduckgo like anna shipman,, but what's the verb? duck'd?  duckduck'd?
duckduckgo'd?] "emacs insert date" and "elisp current date". i read some docs.

i pressed <kbd>M\-:</kbd> /(this is the command "`eval-expression`" which lets
you run some run some lisp and see the result)/

i typed `(insert-string (format-time-string "%FT%H:%M:%SZ"))`

it seemed to work, so then i pressed:

<kbd>s-p</kbd> /(my [projectile](https://github.com/bbatsov/projectile) prefix binding)/

<kbd>p</kbd> /(lets me select one of my projects)/

`emacs.d` <kbd>f</kbd> `chee/util` /(to open up my `util.el` file)/

and added this:

```lisp
(defun insert-time nil
  "Insert the current time in the format used in contents's frontmatter!"
  (interactive)
  (insert-string (format-time-string "%FT%H:%M:%SZ")))
```

now i can press <kbd>M-x</kbd> `insert-time` <kbd>RET</kbd> and it puts the time
in just like it should. this was 5 minutes spent before i'd even gotten to the
title.

i started the post. i like to keep my markdown files hard-wrapped at 80 columns
so they look nice when you run `cat post.md` on a
[teletype](https://en.wikipedia.org/wiki/Computer_terminal#Text_terminals). and
in a normal text editor i'd write a paragraph and then highlight it and tell it
to "reflow text", or i'd do it by hand. but emacs has `auto-fill-mode`, a minor
mode for exactly this purpose. (when you go over the limit (set to 80 columns by
default) it adds a newline before the previous word).

so:

<kbd>M\-x</kbd> `auto-fill-mode`

type some more, neat it works. let's make sure that happens every time:

<kbd>s-p</kbd><kbd>p</kbd> `emacs.d` <kbd>f</kbd> `config.d/init-markdown-mode.el`

```lisp
(add-hook 'markdown-mode-hook #'auto-fill-mode)
```

this means `auto-fill-mode` will come on automatically any time i've activated
markdown mode.

anyway, eventually i wrote the post. but i started at 9:29pm and now it's
0:57am and like wtf you know.

oh, should the post time be the time i started or the time i finished? should i
generate the time when a post first appears and then store that out of band??
