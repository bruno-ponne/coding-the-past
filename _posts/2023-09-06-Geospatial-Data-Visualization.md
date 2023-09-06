---
layout: post
author: Bruno Ponne
title: Mapping the Past - Geospatial Visualization in R
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r maps ggplot2 historicaldata
image: lesson_14.jpeg
abstract: Explore France's past through geospatial techniques in R
objectives:
  - o: Develop the skills to visualize complex datasets using maps in R.
  - o: Dive into the gfrance dataset and learn to use geom_sf to plot it.
  - o: Transform geo data from one format to another with st_as_sf.
keywords: geom_sf, st_as_sf, historical data analysis, geospatial data visualization, ggplot2, maps
description: Turn data into storytelling with geospatial data visualization in R. Utilize st_as_sf and geom_sf for impactful map creation.
last_modified_at: 05-Sep-23
---

<br>

# Introduction

<br>

**'Space is to place as eternity is to time.'**

Joseph Joubert



<br>

Greetings, humanists, social and data scientists!

<br>

In the realm of data science, the ability to visualize geospatial data is paramount. This is particularly true when working with historical data analysis. Maps provide a visual representation of spatial data that allows viewers to discern patterns and relationships that might not be immediately apparent in tabular data. R, with its rich ecosystem of packages and libraries, offers versatile tools for geospatial data visualization. 

<br>

In this lesson, we will continue our journey exploring 19th century France. Using the `Guerry` package we'll be exploring how to plot maps in R. Please, check out the lesson [Use R to explore the link between literacy and suicide in 1830s France]({% post_url 2023-08-16-Study-of-Relationships %}) to learn how to use regression analysis to study the relationship between literacy and suicides in 19th century France.


<br>

***
 
<br>

# Data source

After I wrote the lesson [Use R to explore the link between literacy and suicide in 1830s France]({% post_url 2023-08-16-Study-of-Relationships %}), the author of the `HistData` package, Michael Friendly, kindly let me know that the `Guerry` dataset has its own package that includes not only the data provided in `HistData` but also additional historical maps of France. Please, check the documentation of the package [here](https://cran.r-project.org/web/packages/Guerry/Guerry.pdf).

<br>

***
 
<br>

# Coding the past: historical data analysis with maps

<br>

## 1. Getting Started with Maps in R

Before immersing in our geospatial journey, ensure you've equipped your R environment with the `Guerry` package and that you load it.

<br>

{% include copy.html content = "code-14-1" %}
<div id = "code-14-1">
{% highlight r %}

install.packages("Guerry")
library(Guerry)

{% endhighlight %}
</div>


<br>


Once you have loaded the package, the `gfrance` object will be available in your environment. If you check the class of this object with `class(gfrance)`, you will get `SpatialPolygonsDataFrame`. 

<br>

But what is a `SpatialPolygonsDataFrame`? For a detailed explanation, check [Michael T. Hallworth](https://mhallwor.github.io/_pages/basics_SpatialPolygons). Alternatively, a succinct explanation is provided below.


<br>

{% include note.html content = 'A SpatialPolygonsDataFrame integrates a simple dataframe with spatial data, utilizing a list structure.' %}

<br>

Simply put, `gfrance` combines the Guerry dataframe that we explored in the [last lesson]({% post_url 2023-08-16-Study-of-Relationships %}) with spatial information of France and its departments in 1830.


<br>

For a simple initiation into maps in R, trace the contours of France by plotting the `gfrance` data. This is as simple as using `plot(gfrance)`. The result, as you'll see below, is a distinct outline of the various departments of France as they existed in 1830. It is a perfect canvas for deeper geospatial data visualization.

<br>

![Map of France in 1830](/assets/images/lesson_14_01.png)

<br>


## 2. st_as_sf

We could work directly with the `gfrance` object, but in order to use `ggplot2`, we will first convert it to `sf`, which stands for *simple feature*. Simple feature is a standard for representing real world objects in computers. To learn more about it, check this article about the [sf package](https://r-spatial.github.io/sf/articles/sf1.html), written by its author, Edzer Prebesma. To make the conversion, we will use the `st_as_sf` function from the `sf` package.

<br>

{% include copy.html content = "code-14-2" %}
<div id = "code-14-2">
{% highlight r %}

library(sf)
gfrance_sf <- st_as_sf(gfrance)

{% endhighlight %}

</div>

<br>

Note that the conversion to sf added a variable in the data frame called `geometry`. This variable contains the spatial information of each department.


<br>

***

<br>

## 3. geom_sf - give color and meaning to your maps

In the lesson ['Use R to explore the link between literacy and suicide in 1830s France']({% post_url 2023-08-16-Study-of-Relationships %}) we used regression to study the relationship between literacy and the incidence of suicides. Furthermore, we also included in our model variables regarding the wealth of the department and its distance to Paris. We found that the distance to Paris is negatively associated with the incidence of suicides, that is, the farther from Paris, the lower the incidence of suicides.

<br>

**Do you think this relationship can be seen in a map?**

<br>

To find out, we will plot a map of France and color the departments according to their suicide rate. The first step is to create a new variable expressing suicides per 100,000 inhabitants. Remember that, in the Guerry dataset, suicide is expressed as the population divided by the number of suicides. We can calculate the inverse of Suicides and multiply it by 100,000 to obtain suicides per 100,000 inhabitants. 

<br>

In the code below, we load `ggplot2` and create the variable `Suicides_Pop`, as described above. To plot the map of France colored according to the suicides per inhabitants, we use a layer called `geom_sf`. This function takes the data and maps the filling color of the map to the variable `Suicides_Pop`. It also sets two constant attributes: the color and size of the department border lines. With scale_fill_gradient we tell ggplot that we would like the fill to be a gradient in which high numbers are associated with a darker red and low numbers with a lighter red. Finally, we set some theme configurations.

<br>


{% include copy.html content = "code-14-3" %}
<div id = "code-14-3">
{% highlight r %}

library(ggplot2)

gfrance_sf$Suicides_Pop <- (1/gfrance_sf$Suicides)*100000

ggplot()+ 
  geom_sf(data = gfrance_sf, aes(fill = Suicides_Pop), color = "black", size = 0.3)+
  scale_fill_gradient(name = "", low = '#FF6885', high ='#67001f')+
  theme_bw()+
  theme(
    axis.text = element_blank(),
    axis.ticks = element_blank(),
  )

{% endhighlight %}

</div>


<br>

![map plot with geom_sf and colored with scale_fil_gradient](/assets/images/lesson_14_02.png)

<br>

Indeed, as the regression analysis indicated, the departments closer to Paris have a higher incidence of suicides.

<br>

***

<br>



## 4. Adding a second geom_sf to highlight Paris

In the previous map, we can see that the departments closer to Paris have a higher incidence of suicides. However, it is not clear where Paris is located. To highlight Paris, we will add a second layer of `geom_sf` to the map. This time, we will use the `filter` function to select only the department of Paris (Seine, code 75). We will also set the fill color to white. Finally we will add the following items to make the plot more informative:

- `ggtitle` is used to add a title and a subtitle to the plot;
- `theme` and `theme_bw` are used to customize the appearance of the plot:
  - `text = element_text(color = 'white')` sets the color of the text to white;
  - `axis.text`and `axis.tick` remove axis ticks and text;
  - `panel.grid.major` and `panel.grid.minor` remove grid lines;
  - `panel.background` and `plot.background` and `legend.background` set the background color to match the color of this blog;
  - `legend.text` sets the color of the legend text to white.
{: .conclusion-list }

<br>

{% include copy.html content = "code-14-4" %}

<div id = "code-14-4">

{% highlight r %}

library(dplyr)

seine <- filter(gfrance_sf, dept == 75)

ggplot()+ 
  geom_sf(data = gfrance_sf, aes(fill = Suicides_Pop), color = "black", size = 0.3)+
  geom_sf(data = seine,  fill = "white", color = "black")+
  scale_fill_gradient(name = "", low = '#FF6885', high ='#67001f')+
  ggtitle("Suicide incidence per 100,000 people", subtitle = "Seine (Paris) highlighted in white")+
  theme_bw()+
  theme(text = element_text(color = 'white'),
        axis.text = element_blank(),
        axis.ticks = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        panel.background = element_rect(fill = '#2E3031'),
        plot.background = element_rect(fill = '#2E3031'),
        legend.background = element_rect(fill="#2E3031"),
        legend.text =  element_text(colour = "white"))


{% endhighlight %}

</div>

<br>

![map with a second geom_sf layer](/assets/images/lesson_14_03.png)

<br>

Apart from some outliers, the surroundings of Paris present indeed higher rates of suicides compared to the rest of the country.

<br>


**Do you think that indeed the geographical location has an impact on suicides? Or maybe a third variable is confounding this relationship? In the [last lesson]({% post_url 2023-08-16-Study-of-Relationships %}), we saw that even when we controlled for wealth and literacy rates, the associates persisted. There are other variables that might play a role in this relationship. Feel free to further investigate and share your thoughts in the comments below.** 

<br>

For more information on maps, please check these materials:

<br>

- Eric Weinberg, "[Using Geospatial Data to Inform Historical Research in R](https://programminghistorian.org/en/lessons/geospatial-data-analysis)" Programming Historian 7 (2018), https://doi.org/10.46430/phen0075.
- Moraga, Paula. (2023). [Spatial Statistics for Data Science: Theory and Practice with R](https://www.paulamoraga.com/book-spatial/index.html). Chapman & Hall/CRC.
{: .conclusion-list }


<br>

***

<br>

# Conclusions

<br>

- st_as_sf is used to convert a SpatialPolygonsDataFrame to sf;
- geom_sf is used to plot sf objects in ggplot2;
- maps can be a powerful tool to visualize relationships that involve space;
{: .conclusion-list }

<br>

***