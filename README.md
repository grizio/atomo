# atomo

Simple project to help developers build components for their final project (not a library).

## Start testing

```bash
npm install
npm start
```

Go to http://localhost:8080/ for the full documentation.

If you want to test the UI-kit, you can also go to http://localhost:8080/uikit.html

## Feedback: libraries

By working and several libraries with this project, here some feedback.

This feedback does not include performance studies (file sizes or todo-list samples).
Each library answers different needs and comparing them about this criteria has no meaning out of context.

This feedback concerns their use with web-components. It will not consider state management with Redux or similar libraries.

### Native web-components

Before studying other libraries, here a short description of web-components.

Web-components are a low-level specifications to create new components (see https://developer.mozilla.org/en-US/docs/Web/Web_Components).
When implementing native web-components, developers need to think of following cases:

* Create a shadowRoot (eg: `this.attachShadow({mode: "open"})`)
* Observe attributes (eg: `static get observedAttributes() { return […] }`)
* Manage the rendering (DOM manipulations, use of VDOM)
* Manage event handlers (`addEventListener`, `removeEventListener`, node replacement, …)
* Create scoped styles (in `<style></style>` node)
* Usage of slot with DOM children (instead of attributes in some libraries)

Also, web-component lack typing so all attributes are strings (got with `element.getAttribute("name")`).
In real-case scenario, it will bring some issues:

* Logic in conditions (ex: `this.getAttribute("count") === 0` will always be `false`)
* Typescript integration
* Serialization / Deserialization performances (when passing JSON objects like in react projects)

The feedback will consider above criteria with following table:

Criteria | Information, comment
--- | ---
ShadowRoot | yes / no
Attribute-observation | auto / manual
Rendering-lifecycle | auto / manual
Event handling | auto / manual
Scoped styles | auto / manual
Slots | compatible / adapted
Attribute typing | yes / no
Rendering typing | yes / no
IDE integration | complete / partial / none
Typescript support | complete / partial / none


### lit-html

Repository: https://github.com/polymer/lit-html

This library uses [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).ç
It can be used with [lit-element](https://github.com/Polymer/lit-element) for a web-component compatibility.

Criteria | Information, comment
--- | ---
ShadowRoot | no
Attribute-observation | manual
Rendering-lifecycle | manual
Event handling | auto
Scoped styles | manual (with `<style>` node directly in template)
Slots | compatible
Attribute typing | no
Rendering typing | no
IDE integration | partial (language-injection in Intellij, VSCode)
Typescript support | none

See [component `button`](src/button/text-button.ts) for example of use in this project.


### Riot

Repository: https://github.com/riot/riot

This library uses a transpiler to compile files in Javascript code.

Criteria | Information, comment
--- | ---
ShadowRoot | no
Attribute-observation | auto
Rendering-lifecycle | auto
Event handling | auto
Scoped styles | auto (homemade)
Slots | incompatible, homemade
Attribute typing | no
Rendering typing | no
IDE integration | none, partial (lots of false-positive in Intellij and VSCode)
Typescript support | none

Tested but not kept in this project because of IDE integration and lack of typing system.


### Preact

Repository: https://github.com/developit/preact

React-like library with VDOM.

Preact is not a Web-component library so it requires a wrapper to work as if.
See [preact-wrapper](src/helpers/preact-wrapper.ts) for a sample.

Criteria | Information, comment
--- | ---
ShadowRoot | no, need wrapper
Attribute-observation | auto
Rendering-lifecycle | auto
Event handling | auto
Scoped styles | no, need wrapper
Slots | adapted, some issues / workaround with typescript
Attribute typing | yes
Rendering typing | yes
IDE integration | complete
Typescript support | complete, except for wrapper

See [component `input-money`](src/input-money/input-money.tsx) for example of use in this project.


### React

Repository: https://github.com/developit/preact

VDOM library.

React is not a Web-component library so it requires a wrapper to work as if.
Lots of cases to consider, no wrapper could be made quickly in this library.
Also, custom events are not supported by the library.

Criteria | Information, comment
--- | ---
ShadowRoot | no, need wrapper
Attribute-observation | auto
Rendering-lifecycle | auto
Event handling | auto, incompatible with custom event
Scoped styles | no, need wrapper
Slots | adapted, some issues
Attribute typing | yes
Rendering typing | yes
IDE integration | complete
Typescript support | complete, except for wrapper

Tested but not kept in this project because of issues to create a web-component wrapper and custom events.


### Polymer

Repository: https://github.com/Polymer/polymer

Polymer redirect new developers to the `lit-element` component.
See `lit-html` section for more information.


### Other libraries

Other libraries were not tested so no feedback can be given here.
If you have some, please let us know.


### Final advice

After working with several libraries, preact seems to me to be the best candidate for real projects.
The main reasons of this choice are:

* Simple lifecycle
* Needs a wrapper and attribute normalizers but quite simple to create (see [preact-wrapper](src/helpers/preact-wrapper.ts) and [normalizers](src/helpers/normalizers.ts))
* Simple attribute observation with wrapper
* No issues when using custom events
* Typescript integration
* IDE integration
* Reduced size of library (~3K gzip)
* Usage with preact project directly, without the overload of web-components (⚠️ scoped styles in this case)

Web-components are useful for library project but not for final projects.
In this last cases, framework/libraries like (p)react/redux will be more adpated.