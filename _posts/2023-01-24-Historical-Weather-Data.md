---
layout: post
author: Bruno Ponne
title:  Climate Data Visualization
attributes:
  - e: Medium
  - e: R
  - e: 20 min
tags: r visualization ggplot2
image: lesson_03.jpeg
social_media_img: /assets/images/lesson_03_06.png
toc: true
abstract: Would you like to contribute to raise awareness about global warming? In this lesson you will learn how to create your own ggplot2 themes to code compelling plots showing historical weather data.
objectives:
  - o: Get comfortable with using ggplot2;
  - o: Be able create your own ggplot2 theme;
  - o: Learn how to code ggplot dot and line plots
keywords: effective data visualization, graphical data analysis with r, using ggplot in r, ggplot2 dotplot
description: Code effective visualizations using ggplot2 dotplot.
last_modified_at: 05-Mar-23
---

<br>

# Introduction

**'Global warming isn't a prediction. It is happening.'**

James Hansen

<br>

There is indisputable evidence that our planet is warming at an abnormal rate. The effects of global warming already started to affect the Earth. Melting glaciers, sea level rise, and intense heat waves already affect several countries. In this lesson, you will use historical weather data to plot graphs that help to raise awareness about climate change.

<br>

<br>

***
 
<br>

# Data Source
Data for this lesson comes from the [National Centers for Environmental Information](https://www.ncei.noaa.gov/data/global-summary-of-the-year/access/UK000056225.csv){:target="_blank"}. This institution provides historical weather data by city and country over the last centuries.

<br>

<br>

 ***
 
 <br>

# Coding the past: graphical data analysis with r

## 1. Loading historical weather data with *fread*

First, we will load the [temperature database][1] with the R function `fread()`. Note that there are many variables available ([read more about them](https://www.ncei.noaa.gov/pub/data/metadata/documents/GSOYReadme.txt){:target="_blank"}). However, we are only interested in *DATE* and *TAVG* (average annual temperature in Oxford). The `select` parameter is used to select which variables to load.

[1]:{{ site.url }}/assets/data/oxford_temp.csv

<br>

{% include copy.html content = "code-3-1" %}

<div id = "code-3-1">
{% highlight r %}
library(data.table)
library(ggplot2)
library(imputeTS)
library(dplyr)

temperatures <- fread("oxford_temp.csv",
                      select = c("DATE", "TAVG"))
{% endhighlight %}
</div>

<br>

<br>

 ***
 
 <br>


## 2. Imputing missing values in R


 *TAVG* has missing values and was loaded as character. Let us convert it to numeric and impute missing values with linear interpolation using ` na_interpolation`, available in the *imputeTS* library. 

 <br>

{% include copy.html content = "code-3-2" %}

<div id = "code-3-2">
{% highlight r %}
library(imputeTS)

temperatures$TAVG <- na_interpolation(as.numeric(temperatures$TAVG), option ="linear")

{% endhighlight %}

</div>

<br>



 If you prefer to skip steps 1 and 2, [download here][2] the prepared dataset in *.RData* format. It will be used for the next steps.

[2]:{{ site.url }}/assets/data/temperatures.RData

<br>

 ***
 
<br>

## 3. What is ggplot2 and the grammar of graphics?

[Ggplot2](https://ggplot2.tidyverse.org/){:target="_blank"} is an R library to create statistical graphics. It is based in the [grammar of graphics](https://vita.had.co.nz/papers/layered-grammar.html){:target="_blank"}, a tool to understand graphics as a set of components which together give you flexibility to create original visualizations.

<br>

In the figure bellow, you see the 3 main elements of ggplot2. First, you need a dataset with variables. Each of these variables can be mapped to one particular aesthetic - a visual property of a geom object. Geom objects are the elements you see in your graph (line and dots, for instance). Their characteristics (position on y axis, position on x axis, color, size, etc.) are defined by aesthetics mapping. One graph can contain several layers, each one with a geom object. 

<br>

![ggplot geom objects and layers](/assets/images/lesson_03_01.png)

<br>

<br>

 ***
 
 <br>

## 4. ggplot2 dotplot

In this section, we will use ggplot2 to depict the historical temperatures in the city of Oxford from 1815 to 2022. We will use points do identify the temperature over the years. Although we usually use line plots to represent time series, some researchers claim that the lines do not represent observed data. Actually lines only connect the dots. Therefore, in this lesson, you will learn to plot time series both with dots and with lines. 

<br>

{% include note.html content = 'The author of "Fundamentals of Data Visualization", Claus O. Wilke, clarifies the use of dots and lines to plot time series. To read more about it, see'  url = 'https://clauswilke.com/dataviz/time-series.html' url_description = 'the book here.' %}

<br>

The `ggplot()` function will contain two arguments. The first is the data and the second is *aes()* (aesthetics), which maps the position on the x axis to the variable *DATE*, the position on the y axis to *TAVG* and color to *TAVG*, meaning the color of the geom objects will depend on average annual temperature. After the mapping, we add the first layer of our plot with `geom_point()`. The points represent the observations in the dataset with x and y position as well as color defined by the mapping we set. Two additional layers set x and y axis names.


<br>

{% include copy.html content = "code-3-3" %}

<div id = "code-3-3">
{% highlight r %}
ggplot(data = temperatures, aes(x= DATE, y = TAVG, color = TAVG))+
  geom_point()+
  xlab("Year")+
  ylab("Annual Mean Temperature in Oxford [ºC]")
{% endhighlight %}

</div>

<br>

<br>

![ggplot dot plot with default theme](/assets/images/lesson_03_02.png)

<br>

 ***

 <br>

## 5. Setting colors with scale_color_gradient

One improvement could be representing lower temperatures with blue colors and higher temperatures with red. Moreover this default behavior is not intuitive, since darker colors are usually associated with larger quantities and not otherwise. Note that *TAVG* is a numeric variable and when we map it to color, ggplot uses a gradient to color the geom object. Adding the `scale_color_gradient()` layer allows us to define the color associated with low and high values. Moreover, it allows us to choose the name of the scale:

<br>

{% include copy.html content = "code-3-4" %}

<div id = "code-3-4">
{% highlight r %}
ggplot(data = temperatures, aes(x= DATE, y = TAVG, color = TAVG))+
  geom_point()+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Year")+
  ylab("Annual Mean Temperature in Oxford [ºC]")
{% endhighlight %}

</div>

<br>

![ggplot dot plot with customized colors](/assets/images/lesson_03_03.png)

<br>

***

<br>

## 6. Create your own ggplot2 theme

The plot above got a little better, but how to customize it further? There are several R packages providing ggplot2 themes, but if we would like a theme that matches the theme of this page, for example, what could we do? An option is to create our own theme with the `theme()` layer. `theme()` offers several arguments to create your style. In the figure bellow you can see the arguments necessary to change the background and text color of the elements in our plot. Moreover, there are arguments to eliminate grids.

<br>

![ggplot theme arguments](/assets/images/lesson_03_04.png)

<br>

{% include note.html content = 'To know more <i>theme()</i> arguments available, check'  url = 'https://ggplot2.tidyverse.org/reference/theme.html' url_description = 'the ggplot2 reference page.' %}

<br>

A theme can be created by a customized function which executes the ggplot `theme()`. In the code bellow you can see that the theme is built starting from the black and white ggplot2 theme.

<br>

{% include copy.html content = "code-3-5" %}

<div id = "code-3-5">
{% highlight r %}
theme_coding_the_past <- function() {
  theme_bw()+
  theme(# Changes panel, plot and legend background to dark gray:
        panel.background = element_rect(fill = '#2E3031'),
        plot.background = element_rect(fill = '#2E3031'),
        legend.background = element_rect(fill="#2E3031"),
        # Changes legend texts color to white:
        legend.text =  element_text(colour = "white"),
        legend.title = element_text(colour = "white"),
        # Changes color of plot border to white:
        panel.border = element_rect(color = "white"),
        # Eliminates grids:
        panel.grid.minor = element_blank(),
        panel.grid.major = element_blank(),
        # Changes color of axis texts to white
        axis.text.x = element_text(colour = "white"),
        axis.text.y = element_text(colour = "white"),
        axis.title.x = element_text(colour="white"),
        axis.title.y = element_text(colour="white"),
        # Changes axis ticks color to white
        axis.ticks.y = element_line(color = "white"),
        axis.ticks.x = element_line(color = "white")
  )
}
{% endhighlight %}

</div>

<br>

Let us now try our theme:

<br>

{% include copy.html content = "code-3-6" %}

<div id = "code-3-6">
{% highlight r %}
ggplot(data = temperatures, aes(x= DATE, y = TAVG, color = TAVG))+
  geom_point()+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Year")+
  ylab("Annual Mean Temperature in Oxford [ºC]")+
  theme_coding_the_past()
{% endhighlight %}

</div>

<br>

![ggplot customized theme ](/assets/images/lesson_03_05.png)

<br>

The plot fits the page and highlight the data a lot better now. You could still increase the size of your point geom objects to highlight them. When you do not want to map a certain aesthetic to a variable, you can declare it outside of the `aes()` argument. Bellow, two changes are made in the point geom objects. First, `alpha` adds transparency. Second, `size` increases the size of all the points (without mapping).

<br>

{% include copy.html content = "code-3-7" %}

<div id = "code-3-7">
{% highlight r %}
ggplot(data = temperatures, aes(x= DATE, y = TAVG, color = TAVG))+
  geom_point(alpha = .5, size = 5)+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Year")+
  ylab("Annual Mean Temperature in Oxford [ºC]")+
  theme_coding_the_past()
{% endhighlight %}

</div>

<br>

![ggplot customized theme with changes in size and alpha ](/assets/images/lesson_03_06.png)


<br>

***

<br>

## 7. Adding a second layer containing ggplot line

Now we will make use of the flexibility of the grammar of graphics to add an additional layer to our plot. This time we will add a geom line object:


<br>

{% include copy.html content = "code-3-8" %}

<div id = "code-3-8">
{% highlight r %}
ggplot(data = temperatures, aes(x= DATE, y = TAVG, color = TAVG))+
  geom_point(alpha = .5, size = 3)+
  geom_line()+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Year")+
  ylab("Annual Mean Temperature in Oxford [ºC]")+
  theme_coding_the_past()
{% endhighlight %}

</div>

<br>

![ggplot customized theme with and a second geom layer ](/assets/images/lesson_03_07.png)

<br>

It is clear that average temperatures are increasing year by year!

***
 
<br>

# Conclusions

- Ggplot2 creates effective statistical graphics making use of layers to produce flexible and original visualizations;
- Follow two basic steps to plot in ggplot2:
  - map your variables to the desired aesthetics (visual aspect of a geom object);
  - create the layers containing the geom objects;
- Use `theme()` to create your own customized theme;
{: .conclusion-list } 

<br>

***
