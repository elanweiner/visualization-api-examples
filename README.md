# Looker Visualization API Examples [![Build Status](https://travis-ci.org/looker/visualization-api-examples.svg?branch=master)](https://travis-ci.org/looker/visualization-api-examples)

[Looker](https://looker.com/)'s Visualization API provides a simple JavaScript interface to creating powerful, customizable visualizations that seamlessly integrate into your data applications. :bar_chart: :chart_with_downwards_trend: :chart_with_upwards_trend:

### [Getting Started Guide &rarr;](docs/getting_started.md)

### [Visualization API Reference &rarr;](docs/api_reference.md)

### [View Examples Library &rarr;](examples)

----

## Sandboxed Custom Visualizations Troubleshooting

While the visualizations in this repository are deprecated and therefore not officially supported by Sandboxed Custom Visualizations (aka Custom Viz V2), it is possible to make them work. All it takes is understanding how to source the file and include the correct dependencies.

#### Sourcing the File

One of the main features of Custom Viz V2 is being able to include the URL of a visualization. This is diserable because both Looker and its customers can self-host thier visualizations and pushing an update to that file will automatically update all visualizations in the Looker instance. To make the visualizations in this repository work with that format, you have 2 options:

###### Option 1 (**Unsupported** but easiest): Use RawGit to create a production URL

Github stores files as text, so just copy-and-pasting the github URL into your visualization definition will not be enough. It needs the correct content headers to be able to execute as JavaScript. There is an third-party app called [RawGit](https://rawgit.com/) that will take GitHub files and host them with the correct headers.

To use it, grab the Github URL of the JS file you want to use, such as [the spiderweb vis](https://github.com/looker/visualization-api-examples/blob/master/examples/highcharts_example/highcharts_spiderweb.js). Copy and paste the URL into RawGit and then grab the Production URL that it gives you. Use this link in the `main` field of your visualization definition.

**Please Note** that we do not officially support this method as we do not own or partner with RawGit, so there is no guarantee of the uptime and security of the visualization files.

###### Option 2 (Safest): Copy the contents of the file into the instance's `looker/plugins/visualizations` folder

The official way to do this is to copy the contents of the visualization file into a JS file in the `looker/plugins/visualizations` folder on the instance.

For example, if you copy the spiderweb visualizations into a file called `spiderweb.js` in the correct folder, then you will be able to simply put `spiderweb.js` in the `main` field of the custom visualization definition.

#### Understanding Dependencies

The biggest difference between custom viz V1 and V2 is that the visualizations in V2 execute inside of a iframe. This means the visualizations do not have access to Looker global variables such as jQuery ($) and D3. A lot of the visualizations in this repository assume those globals will be there, so we have to include them as dependencies. You can add dependencies by opening up the advanced options when defining your visualization.

There are 6 possible dependencies you might have to include. You can cast a wide net by including them all, but it is more performant to try to narrow it down to only the ones you need.

**Dependencies to Include in ALL Visualizations in this Repository**

1. jQuery - `https://code.jquery.com/jquery-3.3.1.min.js`
2. Underscore - `https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js`
3. Looker Vis Utils -`'https://looker-custom-viz-a.lookercdn.com/master/v1_common.js`

**Dependencies you *might* neeed**

1. D3 - `https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.js`
2. D3v4 - `https://cdn.rawgit.com/looker/visualization-api-examples/master/examples/common/d3.v4.js`
3. Highcharts - `https://looker-custom-viz-a.lookercdn.com/master/highcharts.js`

Anything in the Highcharts folder of the examples needs Highcharts and NOT d3. For all other visualizations, some use D3 and some use D3v4. You can typically determine which one by leaving them both out and then opening up the JS console on the explore page and seeing what the error says.

----

## A Note on Support

Visualizations provided as examples here are a community supported effort.

Looker's support team does not troubleshoot issues relating to these example visualizations or your custom visualization code.

Please use issues for tracking and closing out bugs, and visit [Looker Discourse](https://discourse.looker.com) for how-to articles, conversations, and tips regarding custom visualizations.

Currently, custom visualizations and their dependencies (like utils.js and d3v4.js) need to be written in ES5 to work with PhantomJS for downloading and scheduling. Code can easily be converted with a tool like [Babel](https://babeljs.io/repl/). Looker will be migrating to a different rendering engine in the near future which should alleviate this requirement.
