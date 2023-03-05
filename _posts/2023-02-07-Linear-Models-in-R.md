---
layout: post
author: Bruno Ponne
title:  R programming for climate data analysis and visualization
attributes:
  - e: Advanced
  - e: R
  - e: 30 min
tags: r regression analysis
image: lesson_04.jpeg
toc: true
abstract: Learn the basics of linear regression models and how to use them to study the relationship between two variables.
objectives:
  - o: Learn what is linear regression and the intuition behind it;
  - o: Be able to fit a model with the R lm() function using real world data;
  - o: Learn how to interpret linear regression results.
keywords: historical weather data, using lm in r, inner_join in R, Plotting correlation in r
description: lesson about Linear Regression in R
last_modified_at: 05-Mar-23
---

<br>

# Introduction

**'Intuition is a very powerful thing, more powerful than intellect'**

Steve Jobs

<br>

Linear regression is one of the most popular tools in social data science. It has been used over the last decades to study how variables relate to each other. In this lesson, you will learn the intuition behind linear regression and how to use it in R.

<br>

<br>

***
 
<br>

# Data Source

Data for this lesson comes from two different sources: data of historical temperature in the city of Oxford comes from the [National Centers for Environmental Information](https://www.ncei.noaa.gov/data/global-summary-of-the-year/access/UK000056225.csv){:target="_blank"} and historical data regarding total carbon emissions comes from the US [Carbon Dioxide Information Analysis Center](https://cdiac.ess-dive.lbl.gov/ftp/ndp030/CSV-FILES/global.1751_2014.csv){:target="_blank"}. Temperatures are given in degree Celsius and carbon emissions in million metric tons of C.

<br>

***
 
<br>

# Coding the Past: Linear Regression in R

## 1. Preparing the data and performing an inner_join in R

First, we will use the data prepared for the lesson ['How to show historical weather data with ggplot2 customized plots']({% post_url 2023-01-24-Historical-Weather-Data %}). Please, download it [here][1]

[1]:{{ site.url }}/assets/data/temperatures.RData

<br>

Second, the carbon emissions data will be loaded. We will only load the year and the value regarding the total carbon emissions from fossil fuel consumption and cement production (in million metric tons of C). 

<br>

Data will be loaded with `read.csv`. The selection of rows and columns is made by index using the following syntax: *df[rows to include, columns to include]*. In the code bellow we chose to keep all rows except for the first, because it contains the source of the data. Additionally, only columns 1 and 2 are kept. Column names are changed to be the same as in the temperatures dataframe. Since both variables were loaded as factors, we convert them first to characters and then to integers. Note that converting a factor directly to integer would distort the values.

<br>

{% include copy.html content = "code-4-1" %}

<div id = "code-4-1">
{% highlight r %}

temperatures <- load("temperatures.RData")

carbon <- read.csv("carbon.csv")[2:265, 1:2]

names(carbon) <- c("DATE", "TOT_EMISSIONS")

carbon$DATE <- as.integer(as.character(carbon$DATE))

carbon$TOT_EMISSIONS <- as.integer(as.character(carbon$TOT_EMISSIONS ))

{% endhighlight %}
</div>

<br>

The last step of data preparation is to join the two dataframes. Since they cover different periods, R dplyr `inner_join()` will be used to keep only observations contained in both dataframes. See how `inner_join()` works in the figure below:

<br>

![dplyr inner_join](/assets/images/lesson_04_01.png)

<br>

<br>

{% include copy.html content = "code-4-2" %}

<div id = "code-4-2">
{% highlight r %}

df <- inner_join(temperatures, carbon, by = "DATE")

{% endhighlight %}
</div>

<br>

If you prefer to skip this step, download the prepared data [here][2] (*.RData* format)

[2]:{{ site.url }}/assets/data/gw.RData

<br>

 ***
 
<br>

## 2. Correlation between carbon emissions and temperatures with R *cortest*

[Correlation](https://www.bbc.co.uk/bitesize/guides/zc7sb82/revision/5){:target="_blank"} measures how much two variables change together. In our case, we would like to know if increases in carbon emissions are associated with increases in temperature. One method to assess linear correlation is the Pearson correlation. It ranges from 1 to -1, where 1 means perfect positive correlation, 0 means no correlation at all and -1 means perfect negative correlation.

<br>

In R, we can use the function `cor.test()` to estimate correlation with the argument `method` set to "pearson". This function returns the correlation and a p-value. The p-value tells us if we can reject the hypothesis that the correlation between carbon emissions and temperature is zero. 

<br>

{% include copy.html content = "code-4-3" %}

<div id = "code-4-3">
{% highlight r %}

cor.test(df$TAVG, df$TOT_EMISSIONS, method = "pearson")

{% endhighlight %}
</div>

<br>

If you run the code above, you will see that there is a moderate linear correlation of **0.57** between temperature and carbon emissions in our sample. This means that when emissions increase, so does temperature. Moreover, this value is statistically different from zero, since the p-value is a lot lower than 0.05 (with a 95% confidence interval). So, there is a correlation between the two variables!

<br>

{% include note.html content = 'The <b>p-value</b>, in the context of this example, is the probability that we would find a correlation estimate of at least 0.57 under the hypothesis that there is no correlation between temperatures and carbon emissions (null hypothesis). If this probability is very low, then the null hypothesis is not likely to be true, because it is not compatible with data we observed in reality. In this case we reject the null and accept the hypothesis that the correlation is not zero. Confusing? Try reading a little more about it ' url = 'https://online.stat.psu.edu/statprogram/reviews/statistical-concepts/hypothesis-testing/p-value-approach' url_description = 'here.'%}

<br>

<br>

 ***
 
<br>

## 3. Plotting correlation in r

One way to check correlation is with a scatterplot. Because carbon emissions were relatively low before 1900, we will use data from this year on (see how [dplyr filter()](https://dplyr.tidyverse.org/reference/filter.html) works). Notice that dots are not randomly distributed in the plot. In general, the larger the emissions, the larger the temperatures. To customize our plot, we will use the ggplot theme developed in the lesson ['How to show historical weather data with ggplot2 customized plots']({% post_url 2023-01-24-Historical-Weather-Data %})

<br>

{% include copy.html content = "code-4-4" %}

<div id = "code-4-4">
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
  )}
  
ggplot(data = filter(df, DATE > 1900), aes(x= TOT_EMISSIONS, y = TAVG, color = TAVG))+
  geom_point(alpha = 0.6, size = 5)+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Emissions [million metric tons of C]")+
  ylab("Annual Mean Temperature in Oxford [ºC]")+
  theme_coding_the_past()
{% endhighlight %}

</div>

<br>

![scatterplot of temperatures versus carbon emissions](/assets/images/lesson_04_02.png)

<br>

<br>

 ***
 
<br>

## 4. Implementing linear models with R

Linear Regression studies the relationship between a dependent and an explanatory variable. It predicts the mean value of the dependent variable given certain values of the explanatory variable. In our case, we would like to describe how temperatures vary according to total carbon emissions, that is, the dependent variable is temperatures and the explanatory (independent) variable is carbon emissions. Clearly more variables other than carbon emission are capable of explaining temperature variation, but for this example we will use a simplified model with only one explanatory variable.

<br>

One quick question before we proceed: What is the simplest "model" for describing the temperature in Oxford throughout the last centuries if we did not have any other variable than the temperature itself? 

<br>

It could be the average of the temperature over the period, right? At any point in time, this simple "model" would predict a 9.9 ºC temperature:

<br>

![scatterplot of temperatures versus carbon emissions with temperatures average line](/assets/images/lesson_04_03.png)

<br>

Now imagine that we have access to a second variable, the total carbon emissions, and we know it has a correlation with temperatures. Wouldn't this variable add information to better predict temperature? Yes! 

<br>

Linear regression is a method to relate these two variables through a straight line (a linear function) that might fit the data a lot better than the mean (if they are sufficiently associated). In the figure above, imagine that you could rotate this line to better fit the data: this is what the regression line does! (see plot in step 5)

<br>

A regression line is described by the equation **Y = a + bX**  where a and b are found by an [algorithm](https://en.wikipedia.org/wiki/Least_squares) so that the line best fits the data.

<br>

Thankfully, you do not need to worry how to compute a and b. R does it for you with the `lm()` function, where you specify your dataframe, and the formula of the relationship you want to study. A formula has the following syntax: *independent variable ~ dependent variable*. To model temperature as a function of carbon emissions, use the following code:

<br>

{% include copy.html content = "code-4-5" %}

<div id = "code-4-5">
{% highlight r %}

linear_model <- lm(TAVG~TOT_EMISSIONS, data = df)

summary(linear_model)

{% endhighlight %}

</div>

<br>

<table class="dataframe">
 <thead>
  <tr>
   <th> Term </th>
   <th> estimate </th>
   <th> std.error </th>
   <th> statistic </th>
   <th> p.value </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td> Intercept </td>
   <td> 9.5627927 </td>
   <td> 0.0546872 </td>
   <td> 174.863537 </td>
   <td> 0 </td>
  </tr>
  <tr>
   <td> Emissions </td>
   <td> 0.0001628 </td>
   <td> 0.0000166 </td>
   <td> 9.835066 </td>
   <td> 0 </td>
  </tr>
</tbody>
</table>

<br>

In this table you see the coefficients a (intercept) and b (coefficient of TOT_EMISSIONS) calculated by R. They form the regression line TAVG = 9.57 + 0.00016*TOT_EMISSIONS. The interpretation of them is as follows:

<br>

- a or the intercept is the value of y when x is zero. In our case a is the value of the temperature when the emissions are zero. You have to evaluate if x = 0 makes sense for your analysis.
- b is how much, on average, y increases when x increases by 1 unit. In our example, when total emissions increase by 1 million metric tons of carbon, then the temperature increases by 0.00016 ºC. It does not seem a lot at a first glance, but if you consider that from 1950 to 2022 emissions increased by 8,225 million metric tons of carbon, this would translate, in our model, to an increase of 1.3ºC!
{: .conclusion-list } 

<br>

Note that p-values are zero (very close to zero), providing evidence that a and b are statistically significant.

<br>

 ***
 
<br>

## 5. Plotting the regression line with geom_smooth

To draw the regression line, use geom_smooth() with the argument `method` set to 'lm' (linear model). The argument `se` specifies if you would like to plot the error associated with the regression estimate across the line.

<br>

{% include copy.html content = "code-4-6" %}

<div id = "code-4-6">
{% highlight r %}
ggplot(data = filter(df, DATE > 1900), aes(x= TOT_EMISSIONS, y = TAVG, color = TAVG))+
  geom_point(alpha = 0.6, size = 5)+
  geom_smooth(method = "lm", color = "white", size = 1, se = FALSE)+
  scale_color_gradient(name = "ºC", low = "#1AA3FF", high = "#FF6885")+
  xlab("Emissions [million metric tons of C]")+
  ylab("Annual Mean Temperature in Oxford [ºC]")+
  theme_coding_the_past()

{% endhighlight %}

</div>

<br>

![regression line plot](/assets/images/lesson_04_04.png)

<br>
{% include note.html content = 'In the example studied we know that carbon emissions are <b>causing</b> global warming, because scientists have extensively studied this topic with multiple models and approaches. However, only correlation or linear relation identified with a regression model does not imply causation! Read more'  url = 'https://sitn.hms.harvard.edu/flash/2021/when-correlation-does-not-imply-causation-why-your-gut-microbes-may-not-yet-be-a-silver-bullet-to-all-your-problems/' url_description = 'about this topic.' %}

<br>

<br>

 ***
 
<br>

# Conclusions

- An inner join can be used to join two dataframes when you only want to keep observations contained in both dataframes;
- Correlation measures how much two variables change together, it can be calculated in R with cor.test();
- A linear regression model relates one dependent variable to an independent or explanatory variable. It provides you with an estimate of how much the dependent variable vary when the independent variable changes by one unit. Regression can be computed in R with lm();
{: .conclusion-list } 

<br>

 ***
