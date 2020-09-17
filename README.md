<div align="center">

<img src="https://github.com/gabrielbarker/Unconditional/blob/master/img/unconditional.logo.png"/>

<h1>Unconditional</h1>
  <a href="https://travis-ci.com/github/gabrielbarker/Unconditional">
    <img src="https://travis-ci.com/gabrielbarker/Unconditional.svg?branch=master"/>
  </a>
  <a href="https://codecov.io/gh/gabrielbarker/Unconditional">
    <img src="https://codecov.io/gh/gabrielbarker/Unconditional/branch/master/graph/badge.svg" />
  </a>
  <a href="https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn">
    <img src="https://img.shields.io/badge/Hackathon-GitHub%20Actions-blueviolet" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>

<b>A GitHub action to determine the concentration and distribution of conditional logic in your code</b>

<a href="#overview">Overview</a> •
<a href="#how-to-use">How To Use</a> •
<a href="#for-reference">For Reference</a> •
<a href="#background">Background</a> •
<a href="#license">License</a>

</div>
<br>

> Insist on simplicity. Resist special cases. Listen to conditionals. Identify underlying concepts. And search for the abstractions that let you treat everything the same.

> -- _Sandi Metz, [Make Everything The Same](https://sandimetz.com/blog/2016/6/9/make-everything-the-same)_

## Overview

Unconditional is a workflow that locates `if` statements in your code. You can set limits on how many conditionals to allow in a given file, and restrict where Unconditional should look for them. This helps to reduce complexity and promote polymorphism.

## How To Use

Unconditional accepts 4 input variables:

- The paths that should be included in the search, given as glob patterns seperated by commas
- The paths that should be excluded from the search, given as glob patterns seperated by commas
- The paths that should be considered an acceptable layer to contain conditional logic, given as glob patterns seperated by commas
- The maximum number of `if` statements that can occur in any given included file outside of the conditional layer, given as an integer

An example of a workflow step that makes use of Unconditional is given below:

```yaml
- name: Find Conditionals
        uses: gabrielbarker/Unconditional@v1.0.0
        with:
          include: "/src/**/*.ts"
          exclude: "/src/**/*.test.ts"
          conditionalLayer: "/src/ui/**/*.ts"
          max: "3"
```

This step would search the repo for `if` statements, only checking files in the `src` directory with the `.ts` extension, that don't have the `.test.ts` extention. It will then print a report of all the conditionals that it found. If conditionals are found in the `ui` directory under `src` then they are ignored from the final count. Then, if any file matching the given paths, outside of the conditional layer, contains _more than 3_ conditionals, the step will result in failure.

## For Reference

This repo makes use of unconditional, so for a reference of how unconditional is used in context, check the `.github/workflows` directory, for the workflow titled `main.yml`. This workflow checks out the repo and performs an unconditional check.

## Background

There is a school of thought that conditionals in your code, especially excessive conditionals, indicate a deeper issue. In object oriented programming, we should strive to keep our classes as simple as possible. When we add conditionals, we split the path through our code. This adds complexity! Adding conditionals also often forces us to add _more_ conditionals to account for this complexity. This is another underlying problem with conditionals; they _breed_.

In large code bases, we can easily lose track of the paths that we're creating, meaning code gets harder and harder to test. To combat this, we should strive to reduce conditionals wherever possible. We should think about _why_ we need to split our logic into paths, and see if there is a tool in the OO toolbox to alleviate this problem.

This GitHub Action is designed to help developers and teams keep track of their conditionals as they are added. The relevant files in the codebase are parsed to determine where there are `if` statements.

One problem people often mention about efforts to reduce conditional logic is that sometimes we _need_ conditionals to handle unknowns. A good example is handling user input. The answer to this is thought to be _pushing_ all of our conditional logic into a specific layer of the code. That way, we can internalise the unknowns, set up our object models to be maximally polymorphic, and proceed with as few paths through the program as possible.

Unconditional allows for this fact by letting users specify these files that will be conditional-dense.

## License

[MIT](https://github.com/gabrielbarker/Unconditional/blob/master/LICENSE)
