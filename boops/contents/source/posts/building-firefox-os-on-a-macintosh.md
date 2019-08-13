---
date: 2012-12-08T13:10:03.333Z
---
# building firefox os on a Macintosh

## firefox OS, huh?

firefox OS looks cool, doesn’t it? For a while you were a bit embarrassed for
Mozilla, seemed like they felt left out as
nearly<sup>([?](http://www.opera.com/))</sup> the only major browser
manufacturer who hadn’t built an operating system based on JavaScript.

but now you see we live in a defiant new world where [CSS3 or 4 never
existed](http://www.xanthir.com/b4Ko0) and [Internet Explorer is actually pretty
rad](http://browseryoulovedtohate.com/testimonials).  And in this world, Firefox
OS (or Boot2Gecko) is possibly going to be what we all need and it will do what
it promised and bring freedom to the world of mobile the way “firefox did to
desktop browsing”.

today I saw a screenshot of Mozilla Phoenix and nearly cried my eyes out.
Those were the days, huh?

## horse’s mouth

read
[this](https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/Firefox_OS_build_prerequisites?redirectlocale=en-US&redirectslug=Mozilla%2FBoot_to_Gecko%2FB2G_build_prerequisites),
the canonical source for building b2g. I'm only here because I ran into a couple
prollems you might
like to avoid.

the issues I’m going to go into here may well be specific to the Galaxy Nexus
build of Firefox OS, and building for the Galaxy Nexus on Mountain Lion. Also,
I do a couple of naughty things when I’m working around the bugs. Forgive me.

the stumbling blocks are few, but they tied my shoelaces together when I was
trying to build it, so here you go.

i’m assuming you’ve got XCode installed here. There are instructions on how to
get that available via the link above and the link below.

first thing, install [homebrew](http://mxcl.github.com/homebrew/) if you
haven’t already because of some kind of illness you have.

once you’ve installed homebrew and added its bin directory to the
***the front of*** ur path, be all like:

```bash
curl -fsSL https://raw.github.com/mozilla-b2g/B2G/master/scripts/bootstrap-mac.sh | bash
```


okay, so that’s boss. that’s installed a whole fireworks display of stuff you’ll
need to build B2G. but, if you’re building for an android you’re going to need a
couple more packages from homebrew too.

I think this should cover it:

```bash
brew install git coreutils findutils gnu-sed gnupg pngcrush repo
```


you’ll need a few gnu utilities available under their normal names too, so:

```bash
ln -s /usr/local/bin/gfind /usr/local/bin/find && ln -s /usr/local/bin/gsed /usr/local/bin/sed
```


this will prevent you from getting:

```
sed: RE error: illegal byte sequence
sed: 1: "/^INSERT$/ { :l; n; p;  ...": unexpected EOF (pending }'s)
target thumb C: dbus-daemon <= external/dbus/bus/desktop-file.c
sed: RE error: illegal byte sequence
sed: 1: "/^INSERT$/ { :l; n; p;  ...": unexpected EOF (pending }'s)
sed: 1: "/^INSERT$/ { :l; n; p;  ...": unexpected EOF (pending }'s)
```


when you try to build later with a sed that doesn’t work the way seds are meant
to work in the modern world.

i like to

```
export PATH=$(brew --prefix coreutils)/libexec/gnubin:$PATH
```

too because then I get the GNU coreutils instead of the BSD coreutils. The BSD
coreutils are simpler in a [cat-v](http://cat-v.org/) sort of way, but I am lazy
and this way when mkdir is all “lol can’t make directory because directory
doesn’t exist” i can be all <kbd>C-p</kbd> `-p` RET and it’s all "lol ok" and
I’m out of there. because the gnu tools let you put the options after the
arguments.

now you’ve got all that, install the Android SDK starter package. once mine was
unzipped I put it in `~/Android` and added `~/Android/sdk/platform-tools` to my
`$PATH` and I felt pretty good about it too.

give ccache a little more room to work with, I gave it 5GB

```
ccache --max-size 5GB
```

now, you’re working on OS X and you’ve probably got a case-insensitive file
system. That’s gonna cause you some nightmares when it gets to building the
android stuff. You’re going to want to create a sparse image and do the rest
of the work in there.

```
hdiutil create -type SPARSE -fs 'Case-sensitive Journaled HFS+' -size 40g ~/omgFirefox.dmg
open ~/omgFirefox.dmg
cd /Volumes/untitled
```

next, clone the git repo and configure

```bash
git clone git://github.com/mozilla-b2g/B2G.git`
cd B2G
./config.sh galaxy-nexus
```

that worked fine, right? good. and it only took 72 hours! HEre is where the
first naughty thing happens.

if you try to build on Mountain Lion it will tell you “nuh-uh, you don’t got
10.6 or 10.5 sdk”, except it’ll pronounce it like this:

```diff
build/core/combo/HOST_darwin-x86.mk:42: ***********************************************************
build/core/combo/HOST_darwin-x86.mk:43: * No 10.6 or 10.5 SDK found, do you have Xcode installed? *
build/core/combo/HOST_darwin-x86.mk:44: ***********************************************
```

i did a naughty thing here. i was all:

```bash
mkdir -p /Developers/SDKs
ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.7.sdk /Developer/SDKs/MacOSX10.6.sdk
```

don’t tell anyone I did this.

okay, ready? let’s build!

```bash
./build.sh
```

please wait for the next half of your life until you reach an error that looks
A LITTLE SOMETHING LIKE THIS:

```
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c: In function ‘exec_conf’:
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c:469: error: ‘SIGWINCH’ undeclared (first use in this function)
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c:469: error: (Each undeclared identifier is reported only once
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c:469: error: for each function it appears in.)
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c: In function ‘main’:
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c:1051: warning: statement with no effect
/Volumes/untitled/external/busybox/scripts/kconfig/mconf.c:1052: warning: statement with no effect
```

crying your eyes out? I would be. well it turns out that this busybox is pretty
out of date. the new version has been updated to build on Mountain Lion. It
turns out that nowadays `SIGWINCH` isn’t declared unless `_DARWIN_C_SOURCE` is
set.

here’s the second naughty bit. i opened up
`external/busybox/scripts/kconfig/mconf.c` in a text editor and changed

```c
#define _XOPEN_SOURCE 700
#include <sys/ioctl.h>
```


to

```c
#define _XOPEN_SOURCE 700

#define _DARWIN_C_SOURCE 1

#include <sys/ioctl.h>
```


around line 12. This will help us get past that error.

now you can try building again.

```
./build.sh
```


did you make a sparse image? are you doing the work in there? why not?

there’s a problem here if you’re using a case-insensitive file system
(why do you do that, OS X? y o y?)

i told you to do that for a very good reason.

a reason that looks like this:

```
hardware/ti/omap4xxx/camera/../libtiutils/semaphore.h:30: error: previous definition of 'class android::Semaphore'
In file included from hardware/ti/omap4xxx/camera/inc/CameraHal.h:41,
                from hardware/ti/omap4xxx/camera/CameraHal_Module.cpp:28:
hardware/ti/omap4xxx/camera/../libtiutils/Semaphore.h:29: error: redefinition of 'class android::Semaphore'
hardware/ti/omap4xxx/camera/../libtiutils/semaphore.h:30: error: previous definition of 'class android::Semaphore'
make: *** [out/target/product/maguro/obj/SHARED_LIBRARIES/camera.omap4_intermediates/CameraHal_Module.o] Error 1
```

if you’re getting that error, MAKE A SPARSE IMAGE AND DO THE WORK IN THERE. now,

```
./build.sh
```


and we’ll hope and pray that nothing else goes wrong.

#### if you followed my advice about gnubin:

okay. was that seriously another error? omg. %z what.

it turns out, like a dick, android actually expects to get the old BSD stat; the
homebrew version of status is no longer acceptable. you’ll want to take the
homebrew stat out of the way for a moment, so you can get the mac version of
stat. I did it like this:

```bash
export PATH=/usr/bin:$PATH
./build.sh
```

#### endif

## AND YOU ARE DONE.

I hope that was a fair enough guide to building boot2gecko on mac.

quick recap:


* read the mozilla wiki on the subject
* install the necessary packages
* get gnu sed and gnu find in your path
* make a sensitive sparse image and get inside
* clone the repo
* fix external/busybox/scripts/kconfig/mconf.c
* celebrate.

i’ll tell you this:

```
./flash.sh
./flash.sh gaia
```

you need to flash gaia separately on the Nexus.

i love you, goodbye.
