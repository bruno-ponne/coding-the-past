---
layout: post
author: Bruno Ponne
title:  Use Matplotlib line plot to create clear and compelling visualizations
attributes:
  - e: Medium
  - e: Python
  - e: 20 min
tags: python visualization matplotlib
image: lesson_01.png
toc: true
abstract: Use Matplotlib to plot and highlight elements in historical trends in 8 steps.
objectives:
  - o: Get comfortable with using Matplotlib objects;
  - o: Be able to select only relevant elements for your plot;
  - o: Learn how to identify and highlight important components in your graph.
keywords: beautiful visualizations, matplotlib line plot, matplotlib legend, matplotlib axes
description: Use Matplotlib to code beautiful visualizations
last_modified_at: 05-Mar-23
---

<br>

# Introduction

<br>

**'All that is solid melts into the air'**

Karl Marx and Friedrich Engels

<br>

As a historian and social scientist I often find it challenging to customize my Python plots and make them clear and compelling. What is a Python class, object or method? &#x1F632; In this lesson, you will learn what those concepts are and how to use them to create effective graphs with Matplotlib. We will plot and highlight elements in the trend of Gross Domestic Product (GDP) per capita of Germany and the USA during the 1929 crisis. If you would like to know more about this event, [check this out](https://www.britannica.com/event/Great-Depression){:target="_blank"}. 


<br>

***
 
<br>

# Data source

 Data used in this lesson is available at [Harvard Business School](https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details?data_id=27){:target="_blank"}  

{% include note.html content = 'GDP is given in 1990 International Geary-Khamis dollars. To learn more about this unit, see this'  url = 'https://en.wikipedia.org/wiki/International_dollar' url_description = 'link.' %}

<br>

<br>

***
 
<br>

# Coding the past: beautiful visualizations with Matplotlib

## 1. What is Matplotlib?

<br>

Matplotlib is a Python library aimed at creating visualizations. It has a good interface with pandas dataframes, which makes it very practical to use. Matplotlib is the base library for other visualization libraries, like Seaborn.

<br>

Before we dive into Matplotlib, we have to understand the concept of class and object. A Python object could be a plot, a string of text or a dataframe, for example. '<b>Classes</b> are a sort of blueprint for objects, specifying their properties (attributes) and behaviors (methods). For example, an object of the Matplotlib class <i>Axes</i> will store a plot and will always have an x axis label attribute. The class <i>Axes</i> might give origin to several different objects (plots), all with an x axis label property, but the content of this property is particular to each plot. We say we instantiate an object of a certain class when we create it.

<br>

{% include note.html content = 'Learn more about classes in this'  url = 'https://realpython.com/lessons/classes-python/' url_description = 'video.' %}

<br>

There are many ways you can use Matplotlib, but in order to be able to customize your plot, it is recommended to use the Matplotlib `subplots()` method. It creates two objects: one object of the class *Figure*, usually called *fig* and one object of the class *Axes*, usually called *ax*. The former is a sort of container where your plot will be created. The latter is the plot itself. Note that the *Axes* object is contained in the *Figure* object. Refer to the [Matplotlib documentation](https://matplotlib.org/stable/tutorials/introductory/quick_start.html){:target="_blank"} for further details.

<br>

![Matplotlib objects](/assets/images/lesson_01_01.png)

<br>


<br>

***
 
<br>

## 2. Loading the data with read_csv

<br>
Download the [data file here][1]. To read the data, use the pandas method `pd.read_csv()`, which takes 3 parameters. The first is the file path. The second is `index_col` and it tells pandas which column should be the index of the data frame. Finally, `parse_dates` set to True converts the index into date format. In the code below, data is loaded and one dataframe is created for each country with the pandas method `loc`.

[1]:{{ site.url }}/assets/data/gdp_prepared.csv

<br>

{% include copy.html content = "code-1-1" %}

<div id = "code-1-1">
{% highlight python %}

import pandas as pd

data_path = "/content/drive/MyDrive/historical_data/gdp_prepared.csv"

df = pd.read_csv(data_path,   
                 index_col = 0,  
                 parse_dates = True)  

ger = df.loc[df["country"] == "Germany"]
usa = df.loc[df["country"] == "United States of America"]
{% endhighlight %}
</div>

<br>

***
 
<br>

## 2. Matplotlib basic plot

<br>
Although in this lesson our fig object will have only one plot, it might have more. Most of the customization will be made through *ax* methods. To start we will call the ax method `plot()` twice to create our plots. Note that `plot()`'s first argument contains the dates and is plotted on the x axis while the second, containing the GDP, is plotted on the y axis. Finally, we show the plot.


{% include copy.html content = "code-1-2" %}

<div id = "code-1-2">
{% highlight python %}
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot(ger.index, ger["gdp_pc"])
ax.plot(usa.index, usa["gdp_pc"])
plt.show()
{% endhighlight %}

</div>

<br>

![First version of the plot](/assets/images/lesson_01_02.png)

<br>

<br>

***
 
<br>

## 3. Restricting time span

<br>

One important aspect to consider when you tell a story with a plot is what you would like to highlight. In this plot, we want to highlight the effect of the 1929 crisis on GDP per capita rather than the effect of the Second or First World War. Thus, let us restrict our time span to the period 1920/1938. Note that when your index is a date you can use pandas `loc` to specify a certain period of the data:

<br>

{% include copy.html content = "code-1-3" %}

<div id = "code-1-3">
{% highlight python %}
ger = ger.loc["1920-01-01":"1938-01-01"]
usa = usa.loc["1920-01-01":"1938-01-01"]
fig, ax = plt.subplots()
ax.plot(ger.index, ger["gdp_pc"])
ax.plot(usa.index, usa["gdp_pc"])
plt.show()
{% endhighlight %}

</div>

<br>

![Second version of the plot](/assets/images/lesson_01_03.png)

<br>

<br>

***
 
<br>

## 4. Adding a Matplotlib legend

<br>

To add a legend, first you have to label each of the line plots and then call the `legend()` method of *ax*. Quite intuitive, right?

<br>

{% include copy.html content = "code-1-4" %}

<div id = "code-1-4">
{% highlight python %}
fig, ax = plt.subplots()
ax.plot(ger.index, ger["gdp_pc"], 
label = "Germany")
ax.plot(usa.index, usa["gdp_pc"], label = "USA")
ax.legend()
plt.show()
{% endhighlight %}

</div>

<br>

![Third version of the plot](/assets/images/lesson_01_04.png)

<br>

<br>

***
 
<br>

## 5. Adding a title and and labels to matplotlib axes

<br>

There are three methods of *ax* to set title and labels. They start with *set* followed by the title or label they set: `set_xlabel`, `set_ylabel`, `set_title`.

<br>

{% include copy.html content = "code-1-5" %}

<div id = "code-1-5">
{% highlight python %}
fig, ax = plt.subplots()
ax.plot(ger.index, 
        ger["gdp_pc"], 
        label = "Germany")
ax.plot(usa.index, 
        usa["gdp_pc"], 
        label = "USA")
ax.legend()
ax.set_xlabel("Year")
ax.set_ylabel("GDP per capita")
ax.set_title("GDP per capita during the Wall Street Crash of 1929")
plt.show()
{% endhighlight %}

</div>

<br>

![Fourth version of the plot](/assets/images/lesson_01_05.png)

<br>

<br>

***
 
<br>

## 6. Changing line colors

<br>
One way of creating your own color palette is with a Python list containing the colors you would like to use. [This page](https://colorbrewer2.org/){:target="_blank"} has smart recommendations on the use of colors. In this case, a diverging color was chosen to distinguish between the two countries. Color is an argument of `plot()` and colors are selected by the list index.

<br>

{% include copy.html content = "code-1-6" %}

<div id = "code-1-6">
{% highlight python %}
my_palette = ["#C84848", "#2E3031", "#FEE090", "#d3d3d3"]

fig, ax = plt.subplots()
ax.plot(ger.index, 
        ger["gdp_pc"], 
        label = "Germany", 
        color = my_palette[0])
ax.plot(usa.index, 
        usa["gdp_pc"], 
        label = "USA", 
        color = my_palette[1])
ax.legend()
ax.set_xlabel("Year")
ax.set_ylabel("GDP per capita")
ax.set_title("GDP per capita during the Wall Street Crash of 1929")
plt.show()
{% endhighlight %}

</div>

<br>

![Fifth version of the plot](/assets/images/lesson_01_06.png)

<br>

<br>

***
 
<br>

## 7. Highligthing areas and elements with axvspan

<br>

In this step, we start by increasing the line width of both trends to 3. After that, we would like to highlight the period of crisis. For that we use the method `axvspan(xmin, xmax, ymin=0, ymax=1, ...)` in which we specify the start and end date of the desired period. The y axis is not specified because, by default, the highlighted area goes from zero to the maximum value of y. `alpha` adds a degree of transparency to the region highlighted.

<br>

{% include copy.html content = "code-1-7" %}

<div id = "code-1-7">
{% highlight python %}
my_palette = ["#C84848", "#2E3031", "#FEE090", "#d3d3d3"]

fig, ax = plt.subplots()
ax.plot(ger.index, 
        ger["gdp_pc"], 
        label = "Germany", 
        color = my_palette[0], 
        linewidth = 3)
ax.plot(usa.index,
        usa["gdp_pc"],
        label = "USA", 
        color = my_palette[1], 
        linewidth = 3)
ax.legend()
ax.set_xlabel("Year")
ax.set_ylabel("GDP per capita")
ax.set_title("GDP per capita during the Wall Street Crash of 1929")
ax.axvspan(pd.Timestamp("1929-01-01"), 
           pd.Timestamp("1932-10-01"), 
           color = my_palette[2], 
           alpha=.4)
plt.show()
{% endhighlight %}

</div>

<br>

![Sixth version of the plot](/assets/images/lesson_01_07.png)

<br>

<br>

***
 
<br>

## 8. Eliminating the frame of matplotlib legend

<br>

Edward Tufte, an expert in the field of data visualization, introduced the concept of data-ink ratio in the book *The Visual Display of Quantitative Information*. Data-ink ratio is the proportion of ink in a plot used to display non-redundant data. The author recommends maximizing this ratio as much as possible to make your plot clearer and to avoid distracting your reader.

<br>

$$ data \: ink \: ratio = {data \: ink  \over total \:ink} $$

<br>

In order to improve our data-ink ratio, we will eliminate the legend frame. This can be done by setting `framon` parameter to false inside the `legend()` method.

<br>

The frame around the plot is made by objects of the class *Spine*. Print `ax.spines` and note that you have 4 spines (left, right, bottom, top). It would be nice to have this frame in a lighter color so that it does not call so much attention. This can be done by the `set_edgecolor()` method . To set all of them to the same color, we can iterate them in `ax.spines.values()` and set one by one to light gray:

<br>

{% include copy.html content = "code-1-8" %}

<div id = "code-1-8">
{% highlight python %}
my_palette = ["#C84848", "#2E3031", "#FEE090", "#d3d3d3"]

fig, ax = plt.subplots()
ax.plot(ger.index, 
        ger["gdp_pc"], 
        label = "Germany", 
        color = my_palette[0], 
        linewidth = 3)
ax.plot(usa.index,
        usa["gdp_pc"],
        label = "USA", 
        color = my_palette[1], 
        linewidth = 3)
ax.legend(frameon = False)
ax.set_xlabel("Year")
ax.set_ylabel("GDP per capita")
ax.set_title("GDP per capita during the Wall Street Crash of 1929")
ax.axvspan(pd.Timestamp("1929-01-01"), 
           pd.Timestamp("1932-10-01"), 
           color = my_palette[2], 
           alpha=.4)

for spine in ax.spines.values():
    spine.set_edgecolor(my_palette[3])

plt.show()
{% endhighlight %}
</div>

<br>

![Seventh version of the plot](/assets/images/lesson_01_09.png)

<br>

In the next lessons you will learn how to further improve graphs like this. Thanks for reading! &#x1F60A;

<br>

***
 
<br>

# Conclusions

- To customize your plot, use Matplotlib method `subplots()`;
- `Subplots()` creates two objects: one of the class *Figure*, usually called fig and one of the class *Axes*, usually called ax;
- Use *Axes* methods to shape your plot according to your needs.
{: .conclusion-list } 
<br>

***