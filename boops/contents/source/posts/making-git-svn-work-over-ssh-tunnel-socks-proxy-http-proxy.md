---
date: 2012-11-25T12:58:48.618Z
---
# Making git-svn work over SSH tunnel, SOCKS proxy + HTTP proxy

### bad connection, worse VCS

At work we use svn. They say there’s nothing we can do about it. I thought
perhaps we could burn everything. Subversion is a terrible piece of software.
I would really rather merge two branches with a magnet than with subversion.

I’m on holiday in Portugal right now. The hotel advertised free wi-fi available
in “all rooms”. I think the router is perhaps closer to Australia than to this
room.

The gombuter the central subversion repo lives on is set up only to accept
connections from a few whitelisted IP addresses. I forgot about this before I
came here. I did say holiday up there, but that’s not quite accurate. I’m just
in Portugal for kicks. When you work remotely, why work in any place in
particular? Might as well be in a country full of nightmareish howling midnight
jackal-dogs, hundreds upon thousands of hungry wild cats, upturned noses, sand
and cheap wine. No need to be in a warm comfy bed at home when you can come
halfway across the world to live in a shoebox for a thousand dollars a night.

So, first problem:

### Subversion hates your guts.

```
% git svn dcommit
URL access forbidden for unknown reason: access to 'http:///dev.peoplebrowsr.com/svn/projects/site/trunk' forbidden at /usr/local/Cellar/git/1.8.0/lib/Git/SVN.pm line 148
URL access forbidden for unknown reason: access to 'http:///dev.peoplebrowsr.com/svn/projects/site/trunk' forbidden at /usr/local/Cellar/git/1.8.0/lib/Git/SVN.pm line 717
```

:(.

Luckily when I was getting my IP address whitelisted, I also got them to
whitelist the IP address of my Linode.

I have a copy of the repo on the Linode, but it is out of date and I’ve made
local changes and commited them and the connection is terrible and I keep losing
connectivity and nothing about this seems tasty.

then I recall that I can use SSH to create some kind of a sexy
TUNNEL and push through that!

### Wear your lucky socks.

```
☀  chee@stickers ~ % ssh -CD2000 snaek
You have mail.
★  chee@zomg ~ %
```

I used -C for ssh compression, to halp deal with the bad network. -D 2000 to set
 the local port for the dynamic forwarding.

Then I open up my network settings over on the local side and tell gombuter to
use SOCKS proxy on localhost:2000.

Then I look into how to get git to push over a socks proxy.

### Chain my proxy to the bedposts

Things don’t go well for me in this hunt. So I decide to use a chaining proxy
that presents as an HTTP proxy, and can pass off to a SOCKS. I chose Privoxy for
 my own private and mysterious reasons. They are none of your concern.

```
brew install privoxy
# or
apt-get install privoxy
# or
pacman -S privoxy # like a boss.
```

in my privoxy config, I set:

```
forward-socks4 / localhost:2000 .
```

to forward all traffic that uses the http proxy to pass off through the SSH
tunnel.

Getting closer!

```
% export http_proxy='http://localhost:8118'
```

annnnnd…! nothing.

wat.

It’s still not working. So I spend some time reading about getting git to use an
 http proxy, and try a bunch of things until I realise I’m a moron.

open `~/.subversion/servers` in your favourite politically neutral editor.

```
% zile ~/.subversion/servers
```

### Talk dirty in subversion

now, I don’t have any other SVN things going on, so I was happy enough to set it
globally:

```
[global]
http-proxy-host = localhost
http-proxy-port = 8118
http-compression = yes
```

stuck http-compression on too, because what the hell.

Now a git svn fetch and a dcommit and we’re flying~! hooray!

So, to recap

* Set up an ssh tunnel on the whitelisted remote server
* Start your local Privoxy, telling it to pass its traffic to the tunnel
* Tell SVN to route its traffic through privoxy

On a side note, I no longer ever use a public wi-fi hotspot without setting up a
tunnel and letting all my traffic go through that. I’m starting to realise I’m
not the only person who ever found out how to install Wireshark.
