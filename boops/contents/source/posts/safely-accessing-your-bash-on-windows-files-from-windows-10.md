---
date: 2017-08-13T17:10:42.830Z
---
# safely accessing your bash-on-windows files from windows 10
## *formerly: mounting your bash on windows folder over sshfs*

_/this may be specific to [alwsl](https://github.com/alwsl/alwsl)/_

editing files created through the linux subsystem from the windows side can be
problematic; the last time i did so the file disappeared on the linux side and
was inaccessible even after a reboot. very microsoft.

apart from this, they've done a quite un–microsoft job of making it good. and as
i live mostly in the terminal anyhoot, i haven't been in much more pain than my
base pain rate (bpr) during this, probably brief, dalliance with microsoft's
windows 10 operating system for x86-compatible personal computers

to get around this issue i've decided to try mounting the user directory over
ssh. perhaps there are better ideas, but this was mine.

there aren't many steps to it but it took a little research, so here's what i
needed to do:

## 1. install dokany 0.7.4

get it here:
[dokany#v0.7.4](https://github.com/dokan-dev/dokany/releases/tag/v0.7.4)

the current version of WinSSHFS does not support anything higher than 0.7.4, as
0.8.0 and above broke the API. if you are reading this in the future (which you
are, because that's how time works), a newer version may well be preferable.

## 2. download WinSSHFS

get it here: [win-sshfs#1.5.12.8](https://github.com/Foreveryone-cz/win-sshfs/releases/tag/1.5.12.8)

## 3. set up sshd on the linux side

do this with the package manager for whatever distro you've installed into the
subsystem.

for arch the instructions are as follows:

```
# pacman -S openssh
# $EDITOR /etc/ssh/sshd_config
```

to `sshd_config` add:

```
KexAlgorithms diffie-hellman-group14-sha1
```

ensure `UsePAM` is set to yes. i also added `AllowUsers chee`. if you want to
use a port other than 22, set `Port` to whatever that port is.

```
# sshd
```

## 4. configure WinSSHFS

* run the WinSSHFS exe, it will open up a cute wee panel.
* click `+ Add` at the bottom.
* set the Drive Name to something, i used "bash on windows" because i did a
creative writing class when i was in high school
* set `Host` to `localhost`
* set `Port` to 22 or whatever custom port you chose
* set `Username` to your username
* enter your password, or select `PrivateKey` and locate your `id_rsa` and type the password in for that
* set `Directory` to `.` to mount your homedir, or to whatever dir you like
* choose a drive letter or a mount folder and choose if you want to mount at login or not. i did
* leave `the proxy section` alone, leave `Proxy Type` as `None`
* hit Save
* hit Mount
* bask in the glory of your mounted drive in `This PC`
* freely edit lxss-created files on windows as the lord God intended

## 5. rejoice in the splendor of the day, it may well be your last
