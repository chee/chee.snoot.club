# content io

this handles http requests (such as asking for latest content BOIs, asking for
content BOIs matching certain attributes, and adding new content BOIs) and
handles doing the git repo business required to make them work.

## api

`GET /bois` get content BOIs
`get /bois/$id` get a specific content BOI

both of these endpoints take a comma separated `fields` query parameter, as well
as a boolean `everything` query parameter.

BOI format:

```
{
	// the content type
	type: "writing" | "selfie" | "photo" | "chat" | "screenshot" | "song",
	// the content's mime-type
	mime: /[0-9a-zA-Z+-.]+\/[0-9a-zA-Z+-.]+/,
	// the filename
	filename: string,
	title: string,
	creation_date: number,
	modification_dates: number[],
	// the content as a string (base64 if binary)
	content: string,
	// the original content as a string (base64 if binary)
	original_content: string,
	// changes (diffs if text format, empty if binary)
	changes: string[],
	// current unique id of item
	id: string,
	// all ids this item has held
	ids: string[],
	// method of insertion (web, text message, &c)
	via: string,
	// direct content uri
	content_uri: string
}
```

`GET /bits/$id` get raw content for to stream
`POST /bits` insert a new bit

post format:

```
	headers: [
		// optional, gets it from filename or first line
		x-snoot-content-title,
		// optional, defaults to writing for text, picture for images, etc
		x-snoot-content-type,
		x-snoot-filename
		// optional, defaults to `content-type`
		x-snoot-mime,
		// optional, defaults to `file --mime-type`
		content-type,
		// this becomes `via` in BOI
		user-agent
	],
	body: string | stream
```

`PUT /bits/$id` insert a new version of a bit
`PATCH /bits/$id` update

