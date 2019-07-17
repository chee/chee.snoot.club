let todo = content =>
`<ul class='todo-list'><li><span class='todo-checkbox '><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M.5 12.853c0 1.462 1.185 2.647 2.647 2.647h9.706c1.462 0 2.647-1.185 2.647-2.647V3.147C15.5 1.685 14.315.5 12.853.5H3.147C1.685.5.5 1.685.5 3.147v9.706z" fill="#FFF"/><path d="M.5 12.853c0 1.462 1.185 2.647 2.647 2.647h9.706c1.462 0 2.647-1.185 2.647-2.647V3.147C15.5 1.685 14.315.5 12.853.5H3.147C1.685.5.5 1.685.5 3.147v9.706z" stroke="#B4B4B4"/><path d="M12.526 4.615L6.636 9.58l-2.482-.836c-.19-.06-.408.003-.518.15-.116.15-.106.352.026.495l2.722 2.91c.086.09.21.144.34.144h.046c.12-.013.234-.07.307-.156l6.1-7.125c.143-.166.123-.407-.046-.548-.164-.138-.435-.14-.604 0z" id="check" fill="#555"/></g></svg>
</span><span class='todo-text'> ${content}</span>
</li></ul>`

let done = content =>
`<ul class='todo-list'><li><span class='todo-checkbox todo-checked'><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M.5 12.853c0 1.462 1.185 2.647 2.647 2.647h9.706c1.462 0 2.647-1.185 2.647-2.647V3.147C15.5 1.685 14.315.5 12.853.5H3.147C1.685.5.5 1.685.5 3.147v9.706z" fill="#FFF"/><path d="M.5 12.853c0 1.462 1.185 2.647 2.647 2.647h9.706c1.462 0 2.647-1.185 2.647-2.647V3.147C15.5 1.685 14.315.5 12.853.5H3.147C1.685.5.5 1.685.5 3.147v9.706z" stroke="#B4B4B4"/><path d="M12.526 4.615L6.636 9.58l-2.482-.836c-.19-.06-.408.003-.518.15-.116.15-.106.352.026.495l2.722 2.91c.086.09.21.144.34.144h.046c.12-.013.234-.07.307-.156l6.1-7.125c.143-.166.123-.407-.046-.548-.164-.138-.435-.14-.604 0z" id="check" fill="#555"/></g></svg>
</span><span class='todo-text'> ${content}</span>
</li></ul>
`

let bear = function bear (showdown) {
	showdown.extension("polar-bear", () => {
		return [
			// bold
			{
				type: "lang",
				regex: /([*])([^*\n]+[^\s])([*])/g,
				replace (match, prefix, content) {
					return `<b>${content}</b>`
				}
			},
			// italic
			{
				type: "lang",
				regex: /([\/])([^/\n]+[^\s])([\/])/g,
				replace (match, prefix, content) {
					return `<i>${content}</i>`
				}
			},
			// underline
			{
				type: "lang",
				regex: /([_])([^_\n]+[^\s])([_])/g,
				replace (match, prefix, content) {
					return `<u>${content}</u>`
				}
			},
			// mark
			{
				type: "lang",
				regex: /(::)([^:\n]+[^\s])(::)/g,
				replace (match, prefix, content) {
					return `<mark>${content}</mark>`
				}
			},
			// strikethrough
			{
				type: "lang",
				regex: /(-)([^-\n]+[^\s])(-)/g,
				replace (match, prefix, content) {
					return `<s>${content}</s>`
				}
			},
			// flanked hashtag
			{
				type: "lang",
				regex: /(#)([^#\n]+)(#)/g,
				replace (match, prefix, content) {
					return `<span class="hashtag">${content}</span>`
				}
			},
			// hashtag
			{
				type: "lang",
				regex: /(#){1}([^#\s]+)(?:\s|$)/g,
				replace (match, prefix, content) {
					return `<span class="hashtag">${content}</span>`
				}
			},
			// todo
			{
				type: "lang",
				regex: /(- )([^\n]+)/g,
				replace (match, prefix, content) {
					return todo(content)
				}
			},
			// done
			{
				type: "lang",
				regex: /([+] )([^\n]+)/g,
				replace (match, prefix, content) {
					return done(content)
				}
			},
			// hr
			{
				type: "lang",
				regex: /(^---$)/g,
				replace: () => "<hr>"
			},
		]
	})
}

module.exports = bear

// {
// 	let showdown = require("showdown")
// 	bear(showdown)

// 	let md = new showdown.Converter()

// 	md.useExtension("polar-bear")

// 	console.log(md.makeHtml(`
// # abebananachee 👦🍌👧
// /serves 1 abe 👦 and 1 chee 👧/

// ## ingredients
// ### the banana 🍌
// * a banana 🍌
// ### the ice cream 🍨
// * 3 scoops 🥄 Neapolitan ice cream 🍨 (1 scoop 🥄 each flavour)
// ### the toppings
// #### sweet nut 🥜
// * a handful of peanuts 🥜
// * a stick of Kerrygold™©® butter
// * 50ml honey 🍯 (preferably w/ a hint of cinnamon)
// #### chocolate 🍫 sauce
// * 20g chocolate 🍫
// * 15ml milk 🥛
// * 15ml cream

// ---

// ## directions
// 1. ::Slice:: the banana 🍌 a single /longways/ _cute_ with the blade of a handleless knife and put it in the bowl 🥣. You only own one bowl 🥣, so use that one.
// 2. Scoop a scoop 🥄 of choco 🍫, a scoop 🥄 of vanillum and a scoop 🥄 of strawberring 🍓 into the split of banana 🍌
// 3. To a -hot pot- add the butter, the honey 🍯 and the peanuts 🥜 and cook them til the honey 🍯 cronch
// 4. Sprinkle the nuts 🥜 atop the ice cream 🍨 and banana 🍌
// 5. Melt the chocolate 🍫 and milk 🥛 and cream together, then pour over the nuts 🥜
// 6. Yim yim yim, zip zip zip: *eat*.

// - todo
// - gotta run fast
// + gotta be done

// #special kind of hashtag#

// #recipe #recipe/banana
// 	`))
// }

