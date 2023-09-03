---
layout: post
author: Bruno Ponne
title: When Numbers Meet Stories - an introduction to the synthetic control method in R
attributes:
  - e: Advanced
  - e: R
  - e: 7 min
tags: r statistics historicaldata
image: lesson_12.jpeg
abstract: Learn about the synthetic control method and apply it to determine the impact of German reunification on West German GDP using the synth R package.
objectives:
  - o: Understand the idea behind the synthetic control method;
  - o: Be confident in using the Synth package;
  - o: Explore applications of the synthetic control method;
keywords: R, statistics, historicaldata, synth,  data analysis
description: Use the synth package to estimate synthetic control models, a powerful causal inference tool. Explore its strengths, limitations and main applications.
last_modified_at: 21-July-23
---

<br>

# Introduction

<br>

"Qualitative flesh on quantitative bones."

Sidney Tarrow



<br>

Greetings, humanists, social and data scientists!

<br>

As our world grows increasingly data-driven, novel methods emerge that allow us to explore present and past social phenomena using sophisticated algorithms and statistical models. One such method is the synthetic control.

<br>

Alberto Abadie, Alexis Diamond, and Jens Hainmueller, in their groundbreaking work, "Comparative Politics and the Synthetic Control Method," have used the synthetic control method to bridge the often disparate domains of qualitative and quantitative research. Their article presents a systematic framework for selecting comparison units in comparative case studies. As an illustrative example, the authors examine the economic impact of the 1990 German reunification on West Germany.

<br>

In this lesson we present the synthetic control method and show how to replicate Abadie et al. (2015)’s study of the impact of German reunification on West German GDP using `Synth`, an R package. I also present other applications of the synthetic control method.

<br>

![Berlin Wall](/assets/images/lesson_12_01.jpeg)
{: .larger }
The Berlin Wall. Rieste, CC0, via Wikimedia Commons. Public Domain.
{: .fig-caption }

<br>

***
 
<br>

# Data source

The data required to replicate Abadie's study is available in the [Harvard Database](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/24714), which includes both the R script needed for replication and the relevant dataset. This dataset contains information about West Germany and 16 other developed countries. The included variables encompass aspects such as education, income, trade openness, industry share, inflation rate, and investment rate. Note that you do not need to go over the R script provided by the authors since I will simplify and explain it for you in this lesson.

<br>

***
 
<br>

# Coding the past: the synthetic control method

<br>

## 1. The Synthetic Control Method

In the article, [Better Incentives, Better Marks: A Synthetic Control Evaluation of Educational Policies in Ceará, Brazil](https://doi.org/10.1590/1981-3821202300010005), I explain that the fundamental issue in evaluating the impact of an event, treatment, or intervention is that, once it occurs in a specific place and time, one can no longer assess how the outcome of interest would have developed in the absence of that event or intervention. 

<br>

Consider our example of Germany's reunification; after it happened, it became impossible to determine how its Gross Domestic Product (GDP) would have progressed had reunification not taken place. The synthetic control method is a tool designed to overcome this limitation.

<br>

How does the synthetic control method estimate what would have happened to West Germany's GDP in the absence of reunification? 

<br>

A straightforward approach would be to select a country similar to West Germany, one that did not experience any significant political events, and examine how its GDP evolved over the same period. Would Denmark, France, New Zealand, or Norway serve as suitable comparison units? Rather than choosing a single country as a comparison reference, the synthetic control method estimates a weighted average of several similar countries. The primary skill of synthetic control lies in its use of optimization to find the best weights for calculating this weighted average, ensuring that this artificial unit — the composite of all the similar countries — most closely resembles West Germany in the period prior to the event. The set of similar countries is called the donor pool.

<br>

To calculate these weights, we require data on the characteristics of West Germany and the similar countries over time. Ultimately, the synthetic control method generates a synthetic West Germany that did not undergo reunification, which can be used as a reference to assess the impact of the actual reunification. This concept will become clearer as we proceed with the replication outlined below.

<br>


{% include note.html content = 'For more information on the optimization process, please refer to'  url = 'https://www.aeaweb.org/articles?id=10.1257/jel.20191450' url_description = 'Abadie (2021)' %}


<br>

***
 
<br>


## 2. The synth package

`Synth` is an R implementation of the synthetic control method. Its most relevant functions are as follows:

<br>

- `dataprep()`: this function prepares the data for the optimization process;
- `synth()`:  it calculates the optimal weights for each candidate comparison unit and each characteristic;
- `path.plot()` and `gaps.plot()`: These functions provide plots of the trend of the affected unit and its synthetic version, along with the gap between them (the effect).
{: .conclusion-list }

<br>

The primary task for computing the synthetic control involves configuring the `dataprep()` function. This function provides necessary information to `synth()` about which unit was affected by the event, which units will act as comparisons (donor pool), and the characteristics used to estimate the synthetic control. Below are the main arguments `dataprep()`:

<br>

- foo: a data frame containing the necessary data;
- predictors: a vector containing the names of the variables with characteristics (predictors);
- special.predictors: a list object identifying additional numeric predictors, their associated pretreatment years and the measure of central tendency to use (e.g., mean, median);
- dependent: the name of the variable of interest (e.g., GDP);
- unit.variable: the name of the variable containing the code of the units. It must be numerical (e.g., codes for each country)
- time.variable: the name of the variable indicating time (year). It must be numerical.
- treatment.identifier: the code of the unit that suffered the event or intervention;
- controls.identifier: the codes of the units that did not undergo the event or intervention (donor pool);
- time.predictors.prior: time period to calculate the average of characteristics (predictors of the dependent variable);
- time.optimize.ssr: the period of optimization, during which the mean squared prediction error (MSPE) between treated and synthetic control units is minimized.
- time.plot: the periods for the plots made by path.plot and gaps.plot ;
- unit.names.variable: the name of the variable with unit (country) names.  It must be of character type.
{: .conclusion-list }



<br>

Some of these arguments might not be clear for you right now, but they will make sense once we explain them with the example below. After estimating the synthetic control, we can use the `path.plot()` and `gaps.plot()` functions to visualize the effects.

<br>

![synthetic control estimation flow ](/assets/images/lesson_12_02.png)



<br>

***

<br>

## 3. Synthetic control in R

The first step to replicate the study is to load the `Synth` package and the dataset. We use the `foreign` package to load the file `repgermany.dta`. The dataset contains information about West Germany and 16 other developed countries: Australia, Austria, Belgium, Denmark, France, Greece, Italy, Japan, the Netherlands, New Zealand, Norway, Portugal, Spain, Switzerland, the United Kingdom, and the United States. Information on education, income, trade openness, industry share, inflation rate, and investment rate is included. The data spans the period from 1960 to 2001.
<br>

{% include copy.html content = "code-12-1" %}
<div id = "code-12-1">
{% highlight r %}

library(foreign)
library(Synth)

d <- read.dta("repgermany.dta")

{% endhighlight %}
</div>

<br>

The next step is to prepare the data for the synth function. We use the `dataprep()` function to do that. The code below specifies the following:

<br>

- `foo = d`: the full dataframe containing the data;
- `predictors = c("gdp","trade","infrate")`: the predictors of the dependent variable (GDP).
- `special.predictors = list(list("industry" ,1981:1990, c("mean")), list("schooling",c(1980,1985), c("mean")), list("invest80" ,1980, c("mean")))`: additional predictors and their associated pretreatment years. This argument allows us to choose the time periods and which measure of central tendency (eg. "mean", "median") to use. Note that the `synth` function requires a summary statistic of the predictors rather than the complete time series. In this case, we use the mean of the industry share, schooling, and investment rate in the 1980s. The predictors specified in the `predictors` argument also use the mean by default;
- `dependent = "gdp"`: the dependent variable, which is GDP;
- `unit.variable = "index"`: the variable containing country codes;
- `time.variable = "year"`: the variable indicating time (year);
- `treatment.identifier = 7`: the code of the unit that suffered the event (West Germany);
- `controls.identifier = unique(d$index)[-7]`: all country codes, except for West Germany;
- `time.predictors.prior = 1981:1990`: the mean of the predictors specified in the `predictors` argument will be calculated in the period from 1981 to 1990;
- `time.optimize.ssr = 1960:1989`: the optimization will be performed in the period from 1960 to 1989;
- `time.plot = 1960:2003`: the plots will be made from 1960 to 2003;
{: .conclusion-list }


<br>

{% include copy.html content = "code-12-2" %}
<div id = "code-12-2">
{% highlight r %}
dataprep_out <-
  dataprep(
    foo = d,
    predictors    = c("gdp","trade","infrate"),
    dependent     = "gdp",
    unit.variable = "index",
    time.variable = "year",
    special.predictors = list(
      list("industry" ,1981:1990, c("mean")),
      list("schooling",c(1980,1985), c("mean")),
      list("invest80" ,1980, c("mean"))
    ),
    treatment.identifier = 7,
    controls.identifier = unique(d$index)[-7],
    time.predictors.prior = 1981:1990,
    time.optimize.ssr = 1960:1989,
    unit.names.variable = "country",
    time.plot = 1960:2003
  )

synth_out <- synth(dataprep_out)


{% endhighlight %}
</div>

<br>

The final step is to pass the output of `dataprep()` to the `synth()`function. This provides the weights for each candidate comparison unit (solution.w) and each characteristic (solution.v) used in the optimization. Note that the optimization algorithm assigned the largest weights to Austria and the United States, which makes sense given the economic and historical similarities of these countries with West Germany.

<br>

***

<br>

## 4. Visualizing synthetic control models

Now we can use `Synth` functions path.plot() and gaps.plot() to visualize the effects. The `path.plot()` function plots the trend of the affected unit and its synthetic version. The `gaps.plot()` function plots the gap between them (the effect). You can set the labels of the axes and the title of the plot using the arguments `Ylab`, `Xlab`, and `Main`. You can also set the legend text using the argument `Legend` and a dashed line to indicate the year of the event using the argument `tr.intake`.

<br>

{% include copy.html content = "code-12-3" %}
<div id = "code-12-3">
{% highlight r %}

path.plot(synth.res = synth_out,
          dataprep.res = dataprep_out,
          tr.intake = 1990,
          Ylab = "Per capita GDP",
          Xlab = "Year",
          Legend = c("West Germany", "Synthetic West Germany"),
          Main = "West Germany vs Synthetic West Germany")

gaps.plot(synth.res = synth_out,
          dataprep.res = dataprep_out,
          tr.intake = 1990,
          Ylab = "Effect",
          Xlab = "Year",
          Main = " Gap between per capita GDP in West Germany and its synthetic version")

{% endhighlight %}
</div>



<br>

![West Germany GDP vs Synthetic West Germany](/assets/images/lesson_12_03.png)
{: .larger }

<br>

In this first plot, we can observe that the per capita GDP of synthetic West Germany closely resembles that of actual West Germany during the period prior to reunification. Upon the implementation of reunification, the model suggests that the synthetic West Germany, unaffected by reunification, would have continued following the same trend in its GDP per capita, while the actual West Germany experienced a decrease. The difference between their trajectories represents the effect of reunification on GDP per capita.

<br>

It is important to note that during the first two years of German reunification, West Germany actually experienced an increase in GDP per capita. According to Abadie et al. (2015), this increase can be attributed to a demand boom in goods and services. However, starting from 1992 onwards, the effect of reunification on GDP turned negative.

<br>

![Effect of Reunification on GDP per capita](/assets/images/lesson_12_04.png)
{: .larger }

<br>


The plot above clearly illustrates the effect by highlighting the difference between the synthetic West Germany and the actual West Germany. Following the initial demand boom, the gap between the two units widens significantly after 1992, indicating a negative impact of reunification on West Germany's GDP. For instance, in 2003, the gap amounts to approximately 3,000 dollars. Considering that West Germany's GDP per capita in 2003 was around 29,000 dollars, the effect of reunification resulted in a decrease of approximately 10% in GDP per capita that year. Over the entire period, the authors estimate that reunification led to an average reduction of about 1,600 USD in GDP per year (Abadie et al., 2015).

<br>

***

<br>



## 5. Synthetic Control for policy evaluation

Besides its application to evaluate historical events, like the German reunification, synthetic control is also used to evaluate the impact of policies. 

<br>

Abadie et al. (2010) evaluate the effect of a tobacco control program in California. The authors use the synthetic control method to estimate the effect of the program on cigarette consumption.

<br>

In the article [Better Incentives, Better Marks: A Synthetic Control Evaluation of Educational Policies in Ceará, Brazil](https://doi.org/10.1590/1981-3821202300010005), I employed the synthetic control method to evaluate the impact of the educational policies implemented in Ceará, Brazil. The study revealed that a combination of technical assistance (TA) and tax incentives (TI) resulted in up to a 12 percent increase in student test scores. The figure below illustrates the estimated models, where the green line represents the treated Ceará, and the yellow line represents the synthetic Ceará. The gap between these lines represents the effect of the policies.

<br>

![Synthetic control used for policy evaluation](/assets/images/lesson_12_05.jpeg)
{: .larger }

<br>

**If you have any questions about the synthetic control method, please feel free to ask in the comments below.** 

<br>

Moreover, I recommend checking out [Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects](https://www.aeaweb.org/articles?id=10.1257/jel.20191450), a clarifying article by Abadie (2021) that provides a comprehensive overview of the synthetic control method.

<br>

***

<br>

**Articles cited**

<br>


- Abadie, Alberto. 2021. "Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects." Journal of Economic Literature, 59 (2): 391-425 DOI: 10.1257/jel.20191450
- Abadie, Alberto, Alexis Diamond, and Jens Hainmueller. 2015. “Comparative Politics and the Synthetic Control Method.” American Journal of Political Science 59 (2): 495-510. doi: 10.1111/ajps.12116
- Abadie, Alberto, Alexis Diamond & Jens Hainmueller. 2010. "Synthetic Control Methods for Comparative Case Studies: Estimating the Effect of California’s Tobacco Control Program" Journal of the American Statistical Association, 105:490, 493-505, DOI: 10.1198/jasa.2009.ap08746
- Ponne, Bruno Gasparotto. 2023. "Better Incentives, Better Marks: A Synthetic Control Evaluation of the Educational Policies in Ceará, Brazil". Braz. political sci. rev., 17(1), e0005. https://doi.org/10.1590/1981-3821202300010005
{: .conclusion-list }



<br>

***

<br>

# Conclusions

<br>

- Synthetic control is a method that allows us to estimate the effect of an event, treatment, or intervention by creating an artificial comparison unit;
- The `Synth` package is an R implementation that allows us to estimate synthetic control models;
- Besides being used to evaluate historical events, synthetic control is also used to evaluate the impact of policies.
{: .conclusion-list }

<br>

***