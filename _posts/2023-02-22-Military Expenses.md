---
layout: post
author: Bruno Ponne
title:  Changing ggplot colors with scale_color_brewer
attributes:
  - e: Medium
  - e: R
  - e: 10 min
tags: r ggplot2
image: lesson_05.jpeg
abstract: Use RColorBrewer to choose professional color palettes.
objectives:
  - o: Learn to transform data from wide to long format with tidyr;
  - o: Be able to choose a different color palette with RColorBrewer;
keywords: r color palette, rcolorbrewer, scale_color_brewer, ggplot, how to use pivot_longer
description: Use scale_color_brewer to choose different color palettes
last_modified_at: 05-Mar-23
---

<br>

# Introduction

<br>

**'War is over, if you want it, war is over, now'**

John Lennon

<br>

Have you ever seen a webpage where text and visualizations do not have the right contrast or where colors do not match? I have had this experience and I have to admit that I myself have difficulty choosing adequate colors for my plots. There are so many technical details to pay attention to! Fortunately R offers you several libraries made by professional designers that offer excellent color palettes for you. In this lesson, you will learn about one of these libraries, the RColorBrewer. We will use data on military expenses of the main capitalist countries during the Cold War.

<br>

***
 
<br>

# Data source

 Data used in this lesson is available on the [World Bank](https://databank.worldbank.org/home){:target="_blank"} website.

<br>

<br>

***
 
<br>

# Coding the past: improve your plot’s colors with scale_color_brewer


## 1. Importing data into R

<br>
Download the [data file here][1] and load the libraries we will need, according to the code below. To read the data, use the R function `read_csv()`. Additionally, we are only interested in the five first rows and in columns 3 and 5 to 36. They are selected with `[1:5, c(3, 5:36)]`. 

[1]:{{ site.url }}/assets/data/military.csv

<br>

{% include copy.html content = "code-5-1" %}

<div id = "code-5-1">
{% highlight r %}
library(readr)
library(tidyr)
library(dplyr)
library(ggplot2)
library(RColorBrewer)

military <- read_csv('military.csv')[1:5, c(3, 5:36)]

{% endhighlight %}
</div>

<br>

***
 
<br>

## 2. How to use pivot_longer?

<br>

If you take a look at the dataframe you just loaded, you will see that it has one column for each year. To use ggplot your data has to be tidy. According to Hadley Wickham, in a tidy dataframe:

<br>

1. Each variable must have its own column;
2. Each observation must have its own row;
3. Each value must have its own cell;
{: .conclusion-list } 

{% include note.html content = 'Learn more about tidy data and how to transform a dataframe from wide to long format '  url = 'https://r4ds.had.co.nz/tidy-data.html' url_description = 'here.' %}

<br>

To make our data tidy, we will transform all the year columns in one variable called "year" and we will also transfer the values contained in these columns to a single new variable called "expense". Note the syntax of the `pivot_longer` function. The first argument is the dataframe we want to transform, the second are the columns we would like to treat. Finally, `names_to` indicates the name of the new column that will receive the years and `values_to` indicates the name of the new column that will receive the values of the year columns.

<br>

![Conversion of dataframe from wide to long format](/assets/images/lesson_05_01.png "Image")
<p class = "fig-caption">Illustration created by the Author</p>

<br>

The `mutate` function makes two adjustments in the new long dataset. First, it eliminates the second part of the year names, e.g., `[YR1960]`. Second, it rounds the expenses values to two decimal places.

<br>

Finally, we change the names of the columns (variables) in our dataset.

<br>

{% include copy.html content = "code-5-2" %}

<div id = "code-5-2">
{% highlight r %}

military_long <- pivot_longer(military, 
                              '1960 [YR1960]':'1991 [YR1991]', 
                              names_to = 'year', 
                              values_to = 'expense') %>%
  mutate(year = substr(year, 1, 4), expense = round(expense, 2))

names(military_long) <- c('country', 'year', 'expense')

{% endhighlight %}

</div>

<br>

***
 
<br>

## 3. Using scale_color_brewer to improve your plots’ colors

<br>

To see all the colors palettes the RColorBrewer offers, use the following code:

<br>

{% include copy.html content = "code-5-3" %}

<div id = "code-5-3">
{% highlight r %}

par(mar=c(3,4,2,2))
display.brewer.all()

{% endhighlight %}

</div>

<br>

![RColorBrewer available palettes](/assets/images/lesson_05_02.png)

<br>

<br>

We will be using palette `Set1` in our line plot. To set it, add the layer `scale_color_brewer(palette = 'Set1')`. **Note** that we also set the x-axis to have labels every 4 years with `scale_x_discrete(breaks = seq(1960, 1990, by=4))`. Color  and group aesthetics were mapped to countries so that each country has a different color.

<br>

{% include copy.html content = "code-5-4" %}

<div id = "code-5-4">
{% highlight r %}
ggplot(data = military_long, aes(x = year, y = expense, group = country, color = country))+
  geom_line(size = 1)+
  scale_x_discrete(breaks = seq(1960, 1990, by=4))+
  scale_color_brewer(palette = 'Set1')+
  xlab('Year')+
  ylab('Military expenditure (% of GDP)')+
  ggtitle('Military Expenses of the Main Capitalist Economies',
          subtitle = '1960 - 1991')
{% endhighlight %}

</div>

<br>

![plot using RColorBrewer palette](/assets/images/lesson_05_03.png)

<br>

<br>

***
 
<br>

## 4. Adding a theme to the plot

<br>
To customize our plot, we will use the ggplot theme developed in the lesson ['Climate data visualization']({% post_url 2023-01-24-Historical-Weather-Data %}). Small adjustments were made to adapt the theme to this plot. For instance, the legend position was set to be at the bottom of the plot and its title was deleted.

<br>

{% include copy.html content = "code-5-5" %}

<div id = "code-5-5">
{% highlight r %}

ggplot(data = military_long, aes(x = year, y = expense, group = country,color = country))+
geom_line(size = 1)+
scale_x_discrete(breaks = seq(1960, 1990, by=4))+
scale_color_brewer(palette = 'Set1')+
  xlab('Year')+
  ylab('Military expenditure (% of GDP)')+
  ggtitle('Military Expenses of the Main Capitalist Economies',
          subtitle = '1960 - 1991')+
  theme_bw()+
  guides(color = guide_legend(title=''))+
  theme(text=element_text(color = 'white'),
            # Changes panel, plot and legend background to dark gray:
            panel.background = element_rect(fill = '#2E3031'),
            plot.background = element_rect(fill = '#2E3031'),
            legend.background = element_rect(fill='#2E3031'),
            legend.key = element_rect(fill = '#2E3031'),
            # Changes legend texts color to white:
            legend.text =  element_text(color = 'white'),
            legend.title = element_text(color = 'white'),
            # Changes color of plot border to white:
            panel.border = element_rect(color = 'white'),
            # Eliminates grids:
            panel.grid.minor = element_blank(),
            panel.grid.major = element_blank(),
            # Changes color of axis texts to white
            axis.text.x = element_text(color = 'white'),
            axis.text.y = element_text(color = 'white'),
            axis.title.x = element_text(color= 'white'),
            axis.title.y = element_text(color= 'white'),
            # Changes axis ticks color to white
            axis.ticks.y = element_line(color = 'white'),
            axis.ticks.x = element_line(color = 'white'),
            legend.position = "bottom")

{% endhighlight %}

</div>

<br>

![Plot with new theme](/assets/images/lesson_05_04.png)

<br>

Feel free to test other color palettes and check the one you like the most!

<br>

***
 
<br>

# Conclusions

- You can transform your dataframe from wide to long format using `pivot_longer`;
- RColorBrewer offers color palettes to make your plots more effective and beautiful.
{: .conclusion-list } 
<br>

***