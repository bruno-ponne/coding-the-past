---
layout: post
author: Bruno Ponne
title: Plotting Maps in R for Historical Data Analysis
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r statistics visualization maps
image: 
abstract: Explore France's past through geospatial techniques in R
objectives:
  - o: Develop the skills to visualize complex datasets using maps in R.
  - o: Dive into the gfrance dataset to uncover and interpret historical statistics.
  - o: Progress from basic map outlines to creating detailed geospatial data visualization.
keywords: R, historical data analysis, geospatial data visualization, ggplot2, maps
description: Use R to code gesopatial data visualization.
last_modified_at: 31-August-23
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

After I wrote the lesson [Use R to explore the link between literacy and suicide in 1830s France]({% post_url 2023-08-16-Study-of-Relationships %}), the author of the `HistData` package, Michael Friendly, kindly let me know that the `Guerry` dataset has its own package that includes not only the data provided in `HistData` but also additional historical maps of France. Please, check the documentation of the packege [here](https://cran.r-project.org/web/packages/Guerry/Guerry.pdf).

<br>

***
 
<br>

# Coding the past: historical data analysis with maps

<br>

## 1. Getting Started with Maps in R

Before immersing in our geospatial journey, ensure you've equipped your R environment with the Guerry package and that you load it.
<br>

{% include copy.html content = "code-14-1" %}
<div id = "code-14-1">
{% highlight r %}

install.packages("Guerry")
library(Guerry)

{% endhighlight %}
</div>


<br>


Once you have loaded the package, the `gfrance` object will be available in your environment. If you check the class of this object with `class(gfrance)`, you will get "SpatialPolygonsDataFrame". But what is a spatial polygons dataframe? For a detailed explanation, check [Michael T. Hallworth](https://mhallwor.github.io/_pages/basics_SpatialPolygons), otherwise, check a brief explanation below.

<br>

{% include note.html content = '"SpatialPolygonsDataFrames" join a simple dataframe with spatial data in a list' %}

<br>

Simply put, `gfrance` combines the Guerry dataframe that we explored in the [last lesson]({% post_url 2023-08-16-Study-of-Relationships %}) with spatial information of France and its departments in 1830.

<br>


***
 
<br>


## 2. Drawing the Lines of Geospatial Data Visualization

For a simple initiation into maps in R, trace the contours of France by plotting the `gfrance` data. This is as simple as using `plot(gfrance)`. You can see what emerges below. It is a clear delineation of the diverse departments in 1830 France, a perfect canvas for deeper geospatial data visualization.

<br>

![Map of France in 1830](/assets/images/lesson_14_01.png)


<br>

***

<br>

## 3. Geospatial Data Visualization: giving color and meaning to our map

Now, we'll examine the relationship between `Suicides_Pop` and `Literacy` using a scatter plot. As per the documentation, `Literacy` represents the “percentage of military conscripts who can read and write” in a department. Keep in mind that the relationships studied in this lesson apply only to this subgroup which is not representative of the whole population. The code below leverages `geom_point` to visualize this relationship.

<br>

{% include copy.html content = "code-13-3" %}
<div id = "code-13-3">
{% highlight r %}

ggplot(data = df, aes(x = Literacy, y = Suicides_Pop))+
  geom_point(color = "#FF6885", size = 2)+
  geom_vline(xintercept = 50, linetype = "dashed", color = "white")+
  labs(title = "Relationship between Suicides and Literacy",
       x = "Percentage of literate conscripts",
       y = "Suicides (per 100,000 population)")+
  theme_coding_the_past()

{% endhighlight %}
</div>

<br>

Please note, the code above incorporates the function `theme_coding_the_past` to style the plot. You can access this theme in the lesson ['Climate Data Visualization']({% post_url 2023-01-24-Historical-Weather-Data %})

<br>

![Percentage of literate conscripts vs Suicides per inhabitants](/assets/images/lesson_13_01.png)
{: .larger }

<br>

The plot suggests that as literacy percentages rise, suicide rates tend to increase. In the distribution of literacy rates below, we also see that the majority of the French departments recorded literacy rates lower than 50% (indicated by the dashed line). If you count the departments to the right of the dashed line, you will find 24 departments, which represents only 24/86 = 28% of the total departments. Notably, the highest suicide rates are in this subgroup.

<br>

{% include copy.html content = "code-13-4" %}
<div id = "code-13-4">
{% highlight r %}
ggplot(data = df, aes(x = Literacy))+
  geom_histogram(color = "#FF6885", fill = "#FF6885",  alpha = 0.2, bins = 25)+
  geom_vline(xintercept = 50, linetype = "dashed", color = "white")+
  labs(title = "Distribution of literacy percentages",
       x = "Literacy",
       y = "Count")+
  theme_coding_the_past()

{% endhighlight %}
</div>

<br>

<br>

![Distribution of literacy percentages](/assets/images/lesson_13_02.png)
{: .larger }


<br>

***

<br>



## 4. cort.test in R

Having observed a graphical association between `Literacy` and `Suicides`, let's use `cor.test` to find this association analytically. This function takes two arguments `x` and `y` and returns a Pearson correlation coefficient (by default) and its statistical significance. As explained in the lesson [R programming for climate data analysis and visualization]({% post_url 2023-02-07-Linear-Models-in-R %}) "correlation measures how much two variables change together. It ranges from 1 to -1, where 1 means perfect positive correlation, 0 means no correlation at all and -1 means perfect negative correlation".

<br>

Using `cor.test(x = df$Literacy, df$Suicides_Pop)` we obtain a correlation coefficient of 0.4 which means a moderate positive correlation. As literacy increases so does suicide proportion. The p-value is less than 0.01, meaning there is a statistically significant association between `Literacy` and `Suicides_Pop`. Framed differently, under the hypothesis that there is no correlation between the two variables, the probability of finding a coefficient of 0.4 or higher would be less than 1%. So we can reject the null hypothesis.

<br>

***

<br>

## 5. Linear models with R

To further study the relationship between these two variables let's model 3 linear regressions. To know more about linear regression, check out the lesson [R programming for climate data analysis and visualization]({% post_url 2023-02-07-Linear-Models-in-R %}).

<br>

The first model will only include `Suicides_Pop` as the dependent variable and `Literacy` as the independent variable. Use `summary(lm(Suicides_Pop ~ Literacy, data = df))` to see the results of this model. The literacy coefficient tells us that if we increase the literacy rate by 1%, then the suicide proportion grows by 0.11. Put differently, a 10% increase in literacy is associated with around 1 suicide more per 100,000 population. This estimate is statistically significant. 

<br>
In the code below, we use `geom_smooth` to plot the regression line describing the positive link between literacy and suicides. The `method` argument tells ggplot to use a linear model (lm) to depict the relationship.

<br>

{% include copy.html content = "code-13-5" %}

<div id = "code-13-5">

{% highlight r %}

ggplot(data = df, aes(x = Literacy, y = Suicides_Pop))+
  geom_point(color = "#FF6885", size = 2)+
  geom_smooth(method = "lm", color = "white", se = FALSE)+
  labs(title = "Relationship between Suicides and Literacy",
       x = "Percentage of literate conscripts",
       y = "Suicides (per 100,000 population)")+
  theme_coding_the_past()

{% endhighlight %}

</div>

<br>

![geom_smooth](/assets/images/lesson_13_03.png)
{: .larger }

<br>

Note that we cannot say that higher literacy rates directly cause more suicides, as factors beyond literacy rates might influence suicide rates. In the next section, we will check whether wealth and the distance to Paris influence suicides as well. Moreover, we will determine if the association between literacy and suicides holds even after controlling for these variables. To show the results, we will use [stargazer](https://cran.r-project.org/web/packages/stargazer/index.html), a very handy package designed for displaying linear model results.


<br>

***

<br>

## 6. How to use stargazer in R

The `stargazer` package offers a very neat and practical way of presenting the results of several linear models. Users can set it up to produce LaTeX or HTML outputs using the `type` argument. In the code that follows, we configure it to generate HTML, making it suitable for this blog post. First, we create three models adding variables indicating the wealth and distance to Paris of each department. Second, we pass these models to stargazer. 

<br>

{% include copy.html content = "code-13-6" %}

<div id = "code-13-6">

{% highlight r %}

linear_model_01 <- lm(Suicides_Pop ~ Literacy, data = df)

linear_model_02 <- lm(Suicides_Pop ~ Literacy + Wealth, data = df)

linear_model_03 <- lm(Suicides_Pop ~ Literacy + Wealth + Distance, data = df)

library(stargazer)

stargazer(linear_model_01, linear_model_02, linear_model_03, type = "html")

{% endhighlight %}

</div>

<br>

The `stargazer` table can be seen below. Note in model 2 that `Wealth` appears to influence `Suicides` negatively, meaning that richer areas are associated with fewer suicides. The coefficient regarding `Literacy` decreases a bit but remains statistically significant. Finally, model 3 includes the distance to Paris as an additional variable. The coefficient of `Literacy` decreases again but remains statistically significant. Moreover, being close to Paris is associated with more suicides.

<br>


<table style="text-align:center; width: 100%;"><tr><td colspan="4" style="border-bottom: 1px solid white"></td></tr><tr><td style="text-align:left"></td><td colspan="3"><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="3" style="border-bottom: 1px solid white"></td></tr>
<tr><td style="text-align:left"></td><td colspan="3">Suicides_Pop</td></tr>
<tr><td style="text-align:left"></td><td>(1)</td><td>(2)</td><td>(3)</td></tr>
<tr><td colspan="4" style="border-bottom: 1px solid white"></td></tr><tr><td style="text-align:left">Literacy</td><td>0.112<sup>***</sup></td><td>0.080<sup>***</sup></td><td>0.064<sup>**</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.027)</td><td>(0.026)</td><td>(0.025)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td><td></td></tr>
<tr><td style="text-align:left">Wealth</td><td></td><td>-0.080<sup>***</sup></td><td>-0.059<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td></td><td>(0.018)</td><td>(0.018)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td><td></td></tr>
<tr><td style="text-align:left">Distance</td><td></td><td></td><td>-0.014<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td><td>(0.004)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>0.645</td><td>5.347<sup>***</sup></td><td>7.901<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(1.168)</td><td>(1.489)</td><td>(1.604)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td><td></td></tr>
<tr><td colspan="4" style="border-bottom: 1px solid white"></td></tr><tr><td style="text-align:left">Observations</td><td>86</td><td>86</td><td>86</td></tr>
<tr><td style="text-align:left">R<sup>2</sup></td><td>0.167</td><td>0.329</td><td>0.408</td></tr>
<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.157</td><td>0.313</td><td>0.386</td></tr>
<tr><td style="text-align:left">Residual Std. Error</td><td>4.360 (df = 84)</td><td>3.938 (df = 83)</td><td>3.720 (df = 82)</td></tr>
<tr><td style="text-align:left">F Statistic</td><td>16.826<sup>***</sup> (df = 1; 84)</td><td>20.321<sup>***</sup> (df = 2; 83)</td><td>18.841<sup>***</sup> (df = 3; 82)</td></tr>
<tr><td colspan="4" style="border-bottom: 1px solid white"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td colspan="3" style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>


<br>

***

<br>

Like all social phenomena, the incidence of suicide is shaped by a multitude of factors.  While we cannot definitively claim that literacy directly caused suicides in 19th-century France, our analysis above does indicate an association between these variables. Delving deeper into the contextual nuances of France in the 1830s might shed light on whether literacy indeed influenced the decision to commit suicide. For instance, check this article by Lisa Lieberman ["Romanticism and the Culture of Suicide in Nineteenth-Century France"](https://www.cambridge.org/core/journals/comparative-studies-in-society-and-history/article/abs/romanticism-and-the-culture-of-suicide-in-nineteenthcentury-france/FA6EBEDC86A5F6812B37DCA03D609C67)

<br>

If you are interested in this topic, [The Sorrows of Young Werther](https://en.wikipedia.org/wiki/The_Sorrows_of_Young_Werther), by Johann Wolfgang Goethe, is a literary representation of a particular view on suicide that would influence the Romantic movement in 19th-century Europe.

<br>

![The Sorrows of Young Werther](/assets/images/lesson_13.jpeg)
Daniel Chodowiecki. Goethe's Werther in his bedroom, with him lying dead on his bed. Public Domain.
{: .fig-caption }

<br>

<br>

**If you have any questions or would like to share your thoughts on this topic, please feel free to ask in the comments below.** 


<br>

***

<br>

# Conclusions

<br>

- Association between two variables can be identified with a scatter plot;
- It can also be explored analytically with `cor.test`;
- Linear regression helps us further understand the relationship of two variables, given other relevant variables
{: .conclusion-list }

<br>

***