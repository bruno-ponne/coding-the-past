---
layout: post
author: Bruno Ponne
title: Checking normality in R
attributes:
  - e: Medium
  - e: R
  - e: 10 min
tags: r statistics histogram normal-distribution density-plot
image: lesson_10.jpeg
abstract: Learn what is and how to identify data that is normally distributed.
objectives:
  - o: Learn the concept of the normal distribution;
  - o: Be able to tell if your data follows the normal distribution in R;
  - o: Be confident in visualizing and interpreting the normal distribution in R;
  - o: Learn how to calculate probabilities of normally distributed data.
keywords: histogram, density-plot, R, statistics, normality, normal-distribution, probability
description: learn to identify normal distributions in R.
last_modified_at: 29-May-23
---

<br>

# Introduction

<br>

“The normal distribution describes the manner in which many phenomena vary around a central value that represents their most probable outcome” 

Leonard Mlodinow

<br>

In this lesson, we will dive into the concept of the normal distribution, which is a fundamental concept within statistics. Also known as the Gaussian distribution or bell curve, the normal distribution is a symmetric probability distribution that manifests in numerous natural and social phenomena. During this lesson, we will employ the Swiss dataset to examine and visualize the normal distribution. This dataset comprises the infant mortality rate of 47 French-speaking provinces in Switzerland around 1888.

<br>

{% include note.html content = 'Infant Mortality Rate is the number of children deaths under one year of age per 1,000 live births. Learn more '  url = 'https://data.oecd.org/healthstat/infant-mortality-rates.htm' url_description = 'on this OECD page.' %}

<br>

***
 
<br>

# Data source

The [Swiss Fertility and Socioeconomic Indicators (1888) Data](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/swiss.html) is available in the `datasets` R package and was originally used in *Data Analysis and Regression: A Second Course in Statistics* by Mosteller and Tukey (1977).

<br>

<br>

***
 
<br>

# Coding the past: testing normality in R

<br>

## 1. What is a normal distribution?

As we learned from the lesson ['Z score in R']({% post_url 2023-05-15-Z-score-in-R %}), a distribution of data illustrates the frequency of occurrence for different values of a variable. One common way to visualize a distribution is through a histogram. 

<br>

The normal distribution is a particular kind of data distribution characterized by the following aspects:

<br>

- approximately 95% of all observations of the data fall within 2 standard deviations from the mean. This means that the vast majority of data points cluster closely around the average value;
{: .conclusion-list }

<br>

- when visualized with a histogram, it forms a symmetrical bell-shaped curve. This symmetry indicates that the distribution's shape is identical on both sides of the mean.
{: .conclusion-list }

<br>

- three important measures of central tendency coincide - the mean, the mode, and the median. This implies that the average value, the most frequently occurring value, and the middle value of the dataset tend to be all equal.
{: .conclusion-list }


<br>

***
 
<br>


## 2. What is rnorm in R?

Suppose we want to generate a dataset of heights that follows a normal distribution in R. Specifically, we aim to generate the heights of 1,000 students with a mean of 175 cm and a standard deviation of 5 cm. R provides a function called `rnorm` that generates normally distributed data. It takes three arguments: the number of observations you would like to be generated, mean, and standard deviation. In the code below, we generate a normally distributed dataset and plot its histogram.

<br>

To ensure reproducibility, we use `set.seed(42)` to obtain the same set of numbers every time the code is run. Moreover, to customize our plot, we will use the ggplot theme developed in the lesson ['Climate data visualization']({% post_url 2023-01-24-Historical-Weather-Data %}).

<br>

{% include copy.html content = "code-10-1" %}

<div id = "code-10-1">
{% highlight r %}

library(ggplot2)
library(dplyr)

set.seed(42)

#Generating normally distributed data

heights <- data.frame(heights = rnorm(1000, 175, 5))

#Checking the summary statistics

summary(heights$heights)
sd(heights$heights)


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


ggplot(data = heights, aes(x = heights))+
  geom_histogram(fill = "#FF6885", color = "#FF6885", alpha = 0.6)+
  ylab("Count")+
  xlab("Height [cm]")+
  theme_coding_the_past()

{% endhighlight %}

</div>

<br>

![Histogram of simulated normal distribution ](/assets/images/lesson_10_01.png)
{: .larger } 

<br>

As you can see, the distribution has a bell shape and is approximately symmetric, with data centered mostly around the mean (175 cm). According to the summary statistics, the shortest person in our sample measures 158.1 cm, while the tallest stands at 192.5 cm. Besides that, the standard deviation is very close to 5 cm. 

<br>

Based on our definition, approximately 95% of the observations should fall within a range of minus 2 standard deviations from the mean to plus 2 standard deviations from the mean. Now, let us verify if this holds true for our specific example.

<br>

{% include copy.html content = "code-10-2" %}

<div id = "code-10-2">
{% highlight r %}

std_dev <- sd(heights$heights)

heights %>% 
  filter(heights>175 + 2*std_dev | heights< 175 - 2*std_dev) %>% 
  nrow()

{% endhighlight %}

</div>

<br>

As expected, only 47 out of 1000 observations, or 4.7%, are more than 2 standard deviations away from the mean.

<br>

***
 
<br>

## 3. R swiss dataset

Now, let's examine whether infant mortality rates in 47 provinces of Switzerland in about 1888 follow a normal distribution. Before plotting the histogram, we should first verify if the mean and median of our data points are approximately equal, as is typically the case in a normal distribution, as mentioned earlier. The swiss dataset can be directly loaded to a variable as shown in the code below.

<br>

{% include copy.html content = "code-10-3" %}

<div id = "code-10-3">

{% highlight r %}

df <- swiss

sd(df$Infant.Mortality)
mean(df$Infant.Mortality)
median(df$Infant.Mortality)

{% endhighlight %}

</div>

<br>

The standard deviation of infant mortality is 2.91 and its mean is 19.94255. Note that indeed the mean and the median (20) are very similar. Below we plot the histogram to check the shape of our distribution. We also check how many observations are more than 2 standard deviations away from the mean.

<br>

{% include copy.html content = "code-10-4" %}

<div id = "code-10-4">

{% highlight r %}

ggplot(data = df, aes(x = Infant.Mortality))+
  geom_histogram(fill = "#FF6885", color = "#FF6885", alpha = 0.6)+
  ylab("Count")+
  xlab("Infant Mortality")+
  theme_coding_the_past()

df %>% 
  filter(Infant.Mortality>19.94255 + 2*2.91 | Infant.Mortality< 19.94255 - 2*2.91) %>% 
  nrow()

{% endhighlight %}

</div>

<br>

![Histogram of infant mortality from the swiss dataset ](/assets/images/lesson_10_02.png)
{: .larger } 

<br>

The shape appears to be of a normal distribution, slightly skewed to the left. Furthermore, only 2 out of 47 observations, or 4.2%, in our distribution are more than 2 standard deviations away from the mean. This also suggests that our data is indeed normally distributed.

<br>

***
 
<br>

## 4. Probability Density Function in R

A density curve follows the shape of the histogram of the data, but instead of providing the frequency of each value, the area under this curve provides the probability that a certain range of values will occur. For the normal distribution, the density curve is defined as a function $$ f(x) $$ dependent on $$ \mu $$ (mean) and $$ \sigma $$ (standard deviation).

$$

f(x) = \frac{1}{\sigma \sqrt{2\pi}}e^{-\frac{(x-\mu)^{2}}{2\sigma^2}}

$$

With the formula above, we can implement this function in R to calculate the density for each value of our data.

<br>

{% include copy.html content = "code-10-5" %}

<div id = "code-10-5">

{% highlight r %}

calculate_density <- function(x, mean, st_dev){
  d = (1/(st_dev*sqrt(2*pi)))*exp(1)^(-((x-mean)^2/(2*st_dev^2)))
  return(d)
}

{% endhighlight %}

</div>

<br>

Now we can calculate the density for each data point of the infant mortality variable and plot the density as a function of the data points.

<br>

{% include copy.html content = "code-10-6" %}

<div id = "code-10-6">

{% highlight r %}

df$density <- calculate_density(df$Infant.Mortality, 19.94255, 2.91)

ggplot(data=df, aes(x = Infant.Mortality, y = density))+
  geom_line(color = "#FF6885")+
  ylab("Density")+
  xlab("Infant Mortality")+
  theme_coding_the_past()

{% endhighlight %}

</div>

<br>

![Density plot of infant mortality from the swiss dataset drawn with geom_line ](/assets/images/lesson_10_03.png)
{: .larger } 

<br>

Note that the curve does not form a perfect bell shape due to the limited number of observations.

<br>

Fortunately, you do not need to create these functions manually in order to plot a density plot. Firstly, R offers a built-in function called `dnorm` that performs the same calculations as the `calculate_density` function we created earlier. It accepts identical arguments. Additionally, the `ggplot2` package includes a layer called `geom_density` which calculates the density and plots it simultaneously. Let's explore this functionality in the example below.

<br>

{% include copy.html content = "code-10-7" %}

<div id = "code-10-7">

{% highlight r %}

ggplot(data = df, aes(x = Infant.Mortality))+
  geom_density(color = "#FF6885", alpha = 0.6, bw = 1.5)+
  ylab("Density")+
  xlab("Infant Mortality")+
  theme_coding_the_past()

{% endhighlight %}

</div>

<br>

![Density plot of infant mortality from the swiss dataset drawn with geom_density ](/assets/images/lesson_10_04.png)
{: .larger } 

<br>

Note that the `geom_density` computes kernel density estimates and allows you to control how smooth the curve is through the `bw` argument. The higher the value of `bw`, the smoother the curve.

<br>

But, after all, why are density curves so important? 

<br>

That is because the area under these curves gives us the probability that a certain range of values occurs. Calculating the area under a curve typically requires integration. However, as an approximation, we can approximate the probability of finding Swiss provinces with infant mortality rates ranging from 19 to 21 without resorting to integrals. To do this, we draw a rectangle that approximates the area under the curve within this interval. The plot below illustrates this approach.

<br>

{% include copy.html content = "code-10-8" %}
<div id = "code-10-8">

{% highlight r %}

ggplot(data = df, aes(x = Infant.Mortality))+
  geom_density(color = "#FF6885", alpha = 0.6, bw = 1.5)+
  ylab("Density")+
  xlab("Infant Mortality")+
  annotate("rect", xmin = 19, xmax = 21, ymin = 0, ymax = 0.13,
           alpha = .5, fill = "#FF6885")+
  theme_coding_the_past()

{% endhighlight %}
</div>

<br>

![Approach to calculate the area under the density curve ](/assets/images/lesson_10_05.png)
{: .larger } 

<br>

The area of the rectangle can be calculated by multiplying 2 (width) by 0.13 (height) which results in 0.26. This means that the probability of finding a province with infant mortality between 19 and 21 is 26%.

<br>

***

<br>

## 5. How to use pnorm in R

There is a function in R called `pnorm` that calculates the probability of an interval of values occurring in a normal distribution. The first argument, `x`, specifies the interval for which the probability is to be calculated. By default, the calculated probability corresponds to the interval of values to the left of `x`. You can change this behavior by setting `lower.tail` to `FALSE`.

<br>

For instance, if we would like to calculate the probability of finding a province with infant mortality lower than or equal to 21, then our first argument is 21. The second argument is the mean, and the third is the standard deviation. Below we also plot the density curve that highlights the area under the curve within the interval of interest.

<br>

{% include copy.html content = "code-10-9" %}
<div id = "code-10-9">

{% highlight r %}

ggplot(data = df, aes(x = Infant.Mortality))+
  geom_density(fill = "#FF6885", color = "#FF6885", alpha = 0.6, bw = 1.5)+
  ylab("Density")+
  xlab("Infant Mortality")+
  annotate("rect", xmin = 21, xmax = 27, ymin = 0, ymax = 0.13, fill = '#2E3031', alpha =0.7)+
  theme_coding_the_past()

pnorm(21, 19.94, 2.91)

{% endhighlight %}

</div>

<br>

![Density Curve with a portion of its area highlighted](/assets/images/lesson_10_06.png)
{: .larger } 

<br>

The probability of finding a province with infant mortality lower than or equal to 21 is represented by the unshaded red area and is 64.2%.

<br>

To find the probability of a value between 19 and 21, we have to subtract the probability of infant mortality lower than or equal to 19 from the 64.2%, as depicted in the plot below.

<br>

{% include copy.html content = "code-10-10" %}

<div id = "code-10-10">

{% highlight r %}

ggplot(data = df, aes(x = Infant.Mortality))+
  geom_density(fill = "#FF6885", color = "#FF6885", alpha = 0.6, bw = 1.5)+
  ylab("Density")+
  xlab("Infant Mortality")+
  annotate("rect", xmin = 21, xmax = 27, ymin = 0, ymax = 0.13, fill = '#2E3031', alpha =0.7)+
  annotate("rect", xmin = 10, xmax = 19, ymin = 0, ymax = 0.13, fill = '#2E3031', alpha =0.7)+
  theme_coding_the_past()

pnorm(21, 19.94, 2.91) - pnorm(19, 19.94, 2.91)

{% endhighlight %}

</div>

<br>

![Density Curve with interval of interest highlighted](/assets/images/lesson_10_07.png)
{: .larger } 

<br>

According to `pnorm`, the probability of finding a province with infant mortality between 19 and 21 is 26.9%, very close to our rectangle area approximation (26%).

<br>

***

<br>

## 6. Z-score probability in R

You can also use `pnorm` to calculate probabilities with Z-scores. In this case, you only pass the z-score to the function. For example, let us calculate the probability that a province has infant mortality lower than or equal to 21. First, 21 corresponds to a z-score of (21-19.94)/2.91, or 0.36. Now we can pass this z-score to the function `pnorm(0.36)` to obtain the probability of 64.2%, as we had already calculated above!

<br>

***

<br>

## 7. Testing normality with a Shapiro-Wilk test

The Shapiro-Wilk test is a statistical test that can be used to test the normality of a sample. The test gives us a p-value. If the p-value is less than 0.05, then the distribution in question is significantly different from a normal distribution. Otherwise, we can consider that the distribution is normal. Below we test the normality of our variable.

<br>

{% include copy.html content = "code-10-11" %}
<div id = "code-10-11">

{% highlight r %}

shapiro.test(df$Infant.Mortality)

{% endhighlight %}

</div>

<br>

The Shapiro-Wilk test results in a p-value of 0.4978 which is greater than 0.05. Therefore, we can consider that the distribution of infant mortality in the Swiss provinces is normal.

<br>

***

<br>

# Conclusions

<br>

- The normal distribution manifests in numerous natural and social phenomena and is characterized by the following aspects:
  - approximately 95% of all observations of the data fall within 2 standard deviations from the mean; 
  - when visualized with a histogram, it forms a symmetrical bell-shaped curve; 
  - three important measures of central tendency coincide: the mean, the mode, and the median;
- The `rnorm` function generates normally distributed data in R;
- The area under the density curve gives us the probability that a certain range of values occurs;
- The `pnorm` function calculates the probability of an interval of values occurring in a normal distribution;
{: .conclusion-list }

<br>

***