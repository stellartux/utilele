# utilele - a utility toolkit 🛠🪕

A bunch of utility functions that I tend to use between projects, or are copied from Julia/GLSL to make programming in JavaScript feel more like Julia.

## utilele

### full

 version with descriptive names and parameter annotations for Intellisense etc

```js
import * as Utilele from 'https://raw.githubusercontent.com/stellartux/utilele/master/utilele.js'
```

### minified

```js
import * as Utilele from 'https://raw.githubusercontent.com/stellartux/utilele/master/utilele.min.js'
```

## other tools

### bump

Bumps the version in `package.json`.

#### install

```bash
deno install --allow-read --allow-write https://raw.githubusercontent.com/stellartux/utilele/master/bump.js
```

#### use

- `bump major`, `bump minor` or `bump patch` to  bump that number.
- `bump` alone defaults to `bump patch`.
- Dashes are allowed, i.e. `bump --major` works.
