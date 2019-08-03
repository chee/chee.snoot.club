---
date: 2019-08-03T09:33:13.700Z
---
# Telecam

so now my stance is:

* fuck React
* /fuck/ GraphQL
* fuck `yarn`
* fuck Facebook, Instagram, WhatsApp and anything else that makes that company
seem like a cool place to work so they can continue hiring good developers to do
terrible things

After deleting Instagram a few mornings ago, I thought I'd use my GDPR data
request to build a page that contained all the photos that used to be there. I
wanted to be able to post to it later, and I wanted an RSS feed. I recently
learned ([you can include a CSS stylesheet from an XML
file](https://www.w3.org/TR/xml-stylesheet/), and was excited that this was the
time to use that.

I built an RSS feed that's also the website for the feed 😊.

Before I send you the link, *Disclaimer*:
* big page (30mb)
* does not work on iOS
* does not work on macOS Safari

Here's a link that you can add to your newsreader or visit in your browser:
[https:\/\/chee.snoot.club\/telecam\/index.xml](https://chee.snoot.club/telecam/index.xml).
Isn't that cool? i think it's cool

In case you're on one of the unsupported platforms, here's what it looks like:

![a screenshot of telecam](https://share.snoot.club/pevez/qumoh.png)

There's also a form for uploading new photos living at
[https:\/\/chee.snoot.club\/telecam\/form](https://chee.snoot.club/telecam/form)
which has filters (and the filters are written in Rust! it has Toast!)

![a screenshot of the form](https://share.snoot.club/lesej/rutiz.png)

## So why does it not work in Safari?

Apple really did some real shitty 90s Microsoft-level Embrace, Extend,
Extinguish move on their platforms with RSS. when News.app came out it was a
generic newsreader, and they made it the handler for all RSS feeds (even if you
had another RSS reader installed).

They stopped displaying RSS feeds in Safari or iOS Safari, and opened the News app
automatically they came out with the Apple News Format and the Apple Publishing
platform https://developer.apple.com/news-publisher/

and then in (i think??) iOS 9.3 they stopped supporting RSS feeds from anything
not in the publishing platform. but it’s still the default handler, and the
Safaris still can’t display the feed, and News still hijacks it even if you have
another newsreader installed

`News.app` hijacks your legit rss feed and then
errors out with “Cannot display content from this site” instead of letting you
view the file or send it to your actual reader

## anyway

please subscribe to my feed. the code, as always, is available in
[the chee.snoot.club repo](https://github.com/chee/chee.snoot.club/)
