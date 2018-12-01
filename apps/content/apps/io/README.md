# content io

this handles http requests (such as asking for latest content BOIs, asking for
content BOIs matching certain attributes, and adding new content BOIs) and
handles doing the git repo business required to make them work.

## api

### `GET /bois` get content BOIs
### `get /bois/$id` get a specific content BOI

both of these endpoints take a comma separated `fields` query parameter, as well
as a boolean `everything` query parameter.

#### BOI format:

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
	modification_date: number[],
	// the content as a string (base64 if binary)
	content: string,
	// the original content as a string (base64 if binary)
	original_content: string,
	// changes (diffs if text format, empty if binary)
	changes: string[],
	// all ids this item has held
	id: string[],
	// methods of insertion (web, text message, &c)
	via: string[],
	// direct content uri
	content_uri: string
}
```

### `GET /bits/$id` get raw content for to stream

#### get format:

(arrays are comma separated)

```
	headers: [
		x-snoot-type,
		x-snoot-mime,
		x-snoot-filename,
		x-snoot-title,
		x-snoot-creation-date,
		x-snoot-modification-date,
		x-snoot-id,
		x-snoot-via
	],
	body: stream
```

### `POST /bits` insert a new bit

#### post format:

```
	headers: [
		// optional, gets it from filename or first line
		x-snoot-title,
		// optional, defaults to writing for text, picture for images, etc
		x-snoot-type,
		// optional
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

### `PUT /bits/$id` insert a new version of a bit

only body is required.

