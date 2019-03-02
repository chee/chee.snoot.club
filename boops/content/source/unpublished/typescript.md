# why i don't want to use typescript

Imagine adding a compile step for no other reason than so you can have compile
failures. Compiling a massive application takes 0 time in JavaScript, we can
catch these problems in runtime (like Smalltalk).

Tests exist, and can make sure we visit every part of the code. Type checking
can only test that types are correct.

Types are not automatic tests, I still have to write an incomprehensible,
mathematically pornographical test in each function signature. It's not
automatic, I have to do it at every variable declaration.

Instead of a readable, semantic test with comments. Everything types can do, a
test can do.

Type checking can only test that types are correct.

Wrong types are so *very* rarely the problem when code is broken.

Tern can figure out that `undefined.undefined` is not a function. Flow also
infers types, until you export a function when it demands you declare
signatures. That is enough to notice when types are changing, or when you are
trying to access a property on something that might be undefined.

A test can describe how something works, why it works. In words and in
expression. Not something impenetrable. Like this:

```typescript
type Chainable<L extends LibTemplate, V extends L[keyof L]['arg' | 'ret']> = {
  value: V
} & {
    <K in keyof L>: (this: Chainable<L, L[K]['arg']>) => Chainable<L, L[K]['ret']>
}
```

That's from here: [a question my colleague asked about dynamically declaring
method types](https://stackoverflow.com/questions/48586171/re-using-interfaces-for-dynamic-methods/48587544#48587544)

**Static types kill innovation.** Any time somebody asks on stackoverflow "How
do i describe x library's api in typescript?" and it takes a long time to find a
satisfying answer: there's a library that would have never existed without
dynamic types.

When they add something new to typescript so that you can use it with a library
that didn't used to work with typescript, there's a library that never would
have been written if we were using typescript.
