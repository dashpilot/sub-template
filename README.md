# sub-template
Simple template engine that compiles to ES Modules for fast rendering on server, client or prerendered
Based on Patrick Pissurno's wonderful https://github.com/patrickpissurno/li-template.
I converted it to an ES Module and changed the code so it outputs ES Modules instead of CommonJS

# About
I was looking for a simple and fast template engine that would work with Vercel's Edge functions 
(which does not support filesystem operations or string-based template engines) and the most 
obvious choice was to use ES Module template literals. Creating a whole site as strings in ES Modules
quickly becomes a drag, and that's when I stumbled across Patrick Pissurno's li-template which allows
you to write html files with simplified template literal syntax and compiles to CommonJS. I adapted it
to compile to ES Modules so that you can easily use it with Edge Functions (SSR), in the browser (CSR)
or prerendered (SSG).

# Syntax
The syntax is exactly the same as li-template (although I might add to it in the future):

### Exists (if something is not null)
**Short-hand**

```$(this.something?){<b>${this.something}</b>}```

**Transpiles into**

```${this.something ? `<b>${this.something}</b>` : ''}```


### Non-exists or empty (if something is null or something.length === 0)
**Short-hand**

```$(!this.something?){<b>Empty</b>}```

**Transpiles into**

```${this.something == null || this.something.length === 0 ? `<b>Empty</b>` : ''}```


### Loops
**Short-hand**

```$(this.names:name){<b>I'm ${name}</b>}```

**Transpiles into**

```${this.names.map(x => `<b>I'm ${x.name}</b>`).join('')}```


## Basic syntax
Inside ```${}``` you can use whatever from Javascript you would like to. Functions, methods, properties, process.env... Whatever. Just keep in mind that whatever you do write in there, would have to work with plain ````${}```` template literals in Node.js module context.

### String template (replace)
This one is just like plain ES6 template literals.

```${this.something}```

It will be replaced at render time with _this.something_'s value.

### Escaping content
li-template by default **doesn't escape anything**. So you are 100% vulnerable to XSS attacks or something. This is intended by design, as we want to achieve **maximum performance**. But this doesn't mean that we're going to leave you on your own. We offer a method that is accessible from within **ALL** .lit template files **that will escape anything**. Just call ```${safe(this.somethingDangerous)}``` and you'll be fine. It's easy!

### Escaping li-template
Sometimes li-template may conflict with third-party libraries like inline jQuery. No problem! Just use the backslash before the dollar sign and li-template is going to ignore that tag.

Like this: ```\$('.my-jquery-selector')```
