---
layout: post
author: Bruno Ponne
title: How to use R in Google Colab?
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r historicaldata
image: lesson_15.jpeg
abstract: Explore the popularity of baby names over the last century in Google Colab;
objectives:
  - o: Get a foundational understanding of Google Colab's concept and capabilities;
  - o: Learn a step-by-step on setting up R within Google Colab;
  - o: Follow a hands-on example of online coding using the 'babynames' R package,
keywords: google colab, R, babynames
description: Discover how to use R in Google Colab and dive into the world of online coding with R. Set up your Colab environment seamlessly and start programming right away!
last_modified_at: 03-Out-23
---

<br>

# Introduction

<br>

**Greetings, humanists, social and data scientists!**

<br>

Ever imagined a world where any computer with an internet browser could be your playground for programming in R? Believe it, because this is your reality! Google Colab enables you to execute R code with remarkable ease, eliminating the need for installations and providing a seamless setup process. The cherry on top? It's free and allows easy sharing and collaboration on your projects.

<br>

In this lesson, I will show you how to use R in Google Colab and suggest a code example to explore the popularity of baby names over the last century. Don’t forget to check out the step-by-step tutorial in the video below! Additionally, feel free to copy the example code from the sections that follow.

<br>
<center><iframe width="560" height="315" src="https://www.youtube.com/embed/WKtcrvd_2-0?si=BGqZJ7ekj47PCTYP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></center>



<br>

***
 
<br>

# Data source


The data used in this tutorial comes from the `babynames` package. It contains a dataset with baby names registered between 1880 and 2017 in the United States. For further details, please explore the documentation of the package [here](https://cran.r-project.org/web/packages/babynames/index.html).

<br>

***
 
<br>

# Coding the past: How to use R in Google Colab?

<br>

## 1. Set the right runtime

It is actually quite straightforward to configure Google Colab to accept R code. All you have to do is change the runtime type from `Python 3` to `R`. Check the figure below.

<br>

![Figure explaining how to use R in Google Colab](/assets/images/lesson_15_01.png)


{% include note.html content = 'You can also set which type of hardware accelerator you would like to use to process your code. Usually graphics processing units (GPU) are better for machine learning applications.'  %}

<br>

***

<br>


## 2. Example: using R in Google Colab

Below you find the code used in the video tutorial. Feel free to copy, test and change it!

<br>

{% include copy.html content = "code-15-1" %}
<div id = "code-15-1">
{% highlight r %}

install.packages("babynames")

library(babynames)

str(babynames)

bruno_df <- babynames[babynames$name == "Bruno", ]

plot(x = bruno_df$year, 
    y = bruno_df$n,
    type = "l",
    main = "Popularity of the name Bruno")


{% endhighlight %}

</div>

<br>

<br>

{% include note.html content = 'Note that each time you reopen a Colab notebook, you will need to reinstall the libraries required to run your code. While this might seem like a disadvantage, it also encourages you to code without relying heavily on numerous libraries, potentially leading to more robust code.'  %}


<br>


**Leave any questions or concerns you might have in the comments below.** 


<br>

***

<br>

# Conclusions

<br>

- Google Colab provides a hassle-free journey into the world of R programming and data exploration;
- with a small change in Google Colab runtime type, it can proccess R code
- mastering the use of R within Google Colab not only enriches our data analysis skills but also paves the way for enhanced collaborative computing in the cloud.
{: .conclusion-list }

<br>

***

