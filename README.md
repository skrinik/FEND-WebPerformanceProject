# Web Performance & Optimization Project
## Sean Krinik

### Overview of Optimizations:

#### index.html
The changes made to index.html are fairly significant. I was stuck with Google PageSpeed Insight (PSI) scores in the 80's for a while unfortunately.

Major changes (in order moving from open html tag to close tag) include:

* Prevented render blocking load of the print stylesheet by adding media query
* Minified CSS stylesheets
* Prevented multiple round trips to style.min.css by inlining the code (Google PSI recommendation)
* Added script to allow asynchronous load for Google Webfonts (from Google & Adobe Typekit)
* Asynchronous load of `perfmatters.js`
* Used optimized images through responsive-images grunt task, implemented with `srcset`
* Inline style sizing of the thumbnail images to further prevent CSS render blocking

A few notes on `index.html`:

* I don't have an Analytics account right now so I left the GA script commented out since it just threw load errors.
* I debated using loadCSS and/or other async CSS loaders but Google PSI said that all of the css in the stylesheet was necessary for above the fold page load so I inlined the minified CSS. I know this is bad practice in general but doing so pushed me over 90 for PSI scores on mobile & desktop.
* Please reference `Gruntfile.js` for implementation of cssmin & responsive-images, both tasks were used to create the final version of `index.html`.

#### pizza.html & main.js
Most of these optimizations were made prior to this project in the previous lessons on optimization and being able to load 60fps web pages. However, I'll list changes below:

`pizza.html`

* Optimized/responsive images using `<picture>`, `source` & `srcset` to deliver the right image.
* minified stylesheets for easier requests

`main.js`

* `changePizzaSizes` - eliminated forced reflow issues by limiting expensive calls to CSS methods
* `changePizzaSizes` - created an array of the pizzas and used a forEach/anon function to make changes to the pizzas
* `updatePositions` - replaced for loop with another forEach loop
* `updatePositions` - took the variable accessing the scroll position out of the loop to avoid performance bottlenecks
* `updatePositions` - used a CSS transform (`translateX`) to reduce CSS impact and eliminate forced reflow issues in loop as the pizzas are moved around

A few notes on `main.js`:

* There is still a forced reflow issue upon initial page load when the scroll variable is initialized, but once you scroll, it has no problem with frame rate. Not sure why, maybe browser caching?
* Pizza load seems to be well under 5ms

### Obstacles
While doing this project, I had many hurdles (still do, but I was able to achieve the PSI scores needed and get the scroll to be free of jank).

A few Obstacles I faced were:
* Stuck with PSI score in the 80's due to CSS render blocking. Had to inline a stylesheet to fix.
* Alternative solution would have been to use async CSS load (loadCSS) or Critical (Grunt task) to recreate html where critical CSS is all inlined. I strayed away for now just due to my experience level.
* Fixing updatePositions was really hard. I had to refer to the forums a few times to see how others were solving the task of eliminating the jank. One key fix was using `translateX` since transforms are less expensive changes. (Huge shoutout to chocobuckle on forums, lots of great hints and solutions!) 

---

# Udacity Rubric & Info:

## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
