# Work at Olist Frontend

[Olist](https://olist.com/) is a company that offers an integration platform
for sellers and marketplaces allowing them to sell their products across
multiple channels.

The Olist [development team](https://engineering.olist.com/) consists of
developers who love what they do. Our agile development processes and our
search for the best development practices provide a great environment for
professionals who like to create quality software in good company.

We are always looking for good programmers who love to improve their work. We
give preference to small teams with qualified professionals over large teams
with average professionals.

This repository contains a problem used to evaluate the candidate skills.
It's important to notice that solving the problem is just a
part of what will be evaluated. We also consider other programming disciplines
like documentation, testing, commit timeline, design and coding best
practices.

Hints:

* Carefully read the specification to understand all the problem and
  artifact requirements before starting.
* Check the recommendations and reference material at the end of this
  specification.


## How to participate

* Make a fork of this repository on Github. If you aren't comfortable with
   creating a public fork of this project, make a private repository
   (gitlab offers free private repos) and add developer permission for the
   user [@tech-hiring](https://gitlab.com/tech-hiring) on project;
* Follow the instructions on README.md (this file);
* Deploy your project on a host service (we recommend
   [Heroku](https://heroku.com) or [Netlify](http://netlify.com/));
* Apply for the position at our [career page](https://www.99jobs.com/olist)
   with:
   * Link to the fork on Github (or gitlab.com);
   * Link to the project in the deployed host service.


## Specification

Today, security is everything, but users still have the bad habit of creating
accounts with weak passwords, and it is essential that we can offer the user
ways to keep them safe. So, we must do our best to ensure the safety of our
users.

For this, you should implement a **new account** page, composed of Name, Email
and Password with a strength measure indicator and Password confirmation. All
these fields are required.


## Style Guide

The design of the page can be found in the link below:

[Front-End Test Style Guide](https://www.figma.com/file/rsSlx8jDHls6nWXziElWTk/olist----front-end-test)

* It's very important that you build this page exactly as proposed, pixel by
pixel.


## Instructions

* The submit button must be disabled until the form is valid.
* The Name is required and Email must be a valid email.
* The invalid input fields should have a border color like the style guide.
* The valid input fields should have a border color like the style guide.
* The Password input must make use of the sequence of validation presented in
  the Style Guide
* If the form is valid, the submit button should be clickable
* When the form is submitted, it should present a loading status.


## Project Requirements:

* Application must be written in HTML, JavaScript and CSS. You can only make
  use of a CSS preprocessor.
* You cannot use any Javascript library or framework with the exception of
  polyfills.
* Your page must support all modern browsers and IE 11+.
* Write the project documentation containing: [Sample](https://github.com/elsewhencode/project-guidelines/blob/master/README.sample.md)
  * Installing and testing instructions;
  * Brief description of the work environment used to run this
    project (Computer/operating system, text editor/IDE, libraries, etc).
* Every text or code must be in English.


## Recommendations

* Write tests!
* Use [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), [KISS](https://en.wikipedia.org/wiki/KISS_principle), [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* Use programming good practices;
* Use [git best practices](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices),
  with clear messages (written in English);
* If you build this with Web Components it will be a plus.
* Feel free to use any language to serve the page if you need. Using Python,
  Go or Elixir is a plus.

**Have fun!**