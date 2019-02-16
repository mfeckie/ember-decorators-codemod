# ember-decorators-codemod [WIP]


A collection of codemod's for converting class properties to decorated properties.

This codemod is currently a work in progress, so treat it as experimental!  If you find a problem, please report it (or better still, fix and pull request :) )

# Known Issues

There is currently an issue in larger files where some of the whitespace is being lost.  You may need to run your preferred code formatter again after applying this codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx mfeckie/ember-decorators-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-decorators-codemod
ember-decorators-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [decorate](transforms/decorate/README.md)
<!--TRANSFORMS_END-->

## Contributing

Pull requests are welcome!

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
