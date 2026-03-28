---
layout: post_minimal
author: Bruno Ponne
title: How to Use R in Google Colab (2026 Update)
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r historicaldata cloud-computing
image: lesson_15.jpeg
abstract: Explore the popularity of baby names over the last century using R natively in Google Colab.
objectives:
  - o: Get a foundational understanding of Google Colab's capabilities for R programming;
  - o: Learn the step-by-step process of setting up the R runtime within Google Colab;
  - o: Follow a hands-on data visualization example using the 'babynames' R package.
keywords: Google Colab R, use R online, R programming browser, R runtime Colab 2026, babynames dataset R
description: Discover how to use R in Google Colab in 2026. Set up your cloud environment seamlessly, avoid local installations, and dive into online coding with this step-by-step R tutorial!
last_modified_at: 28-Mar-26
---

<br>

**Greetings, humanists, social and data scientists!**

<br>

Ever imagined a world where any computer with an internet browser could be your playground for programming in R? As cloud computing dominates data science in 2026, this is your reality! Google Colab enables you to execute R code with remarkable ease, completely eliminating the need for complex local installations. The cherry on top? It's free and allows seamless sharing and collaboration on your projects.

<br>

### ⚡Quick Answer: How to Run R in Google Colab?

<br>

If you are in a hurry, here is the short version of how to get R running in your Colab notebook:

1. Open a new Google Colab notebook.
2. Go to the top menu and click on **Runtime**.
3. Select **Change runtime type**.
4. Under the *Runtime type* dropdown, change it from Python 3 to **R**.
5. Click **Save**. You are ready to code!
{: .conclusion-list }

<br>

In this lesson, I will walk you through the details of using R in Google Colab and provide a hands-on code example exploring the popularity of baby names over the last century. Don’t forget to check out the step-by-step tutorial in the video below! 

<br>

<div class="videoWrapper">

<iframe src="https://www.youtube.com/embed/WKtcrvd_2-0?si=BGqZJ7ekj47PCTYP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

</div>

<br>

***
 
<br>

## 1. Step-by-Step: Setting the R Runtime in Colab

It is incredibly straightforward to configure Google Colab to accept R code. By default, Colab notebooks spin up Python environments. All you have to do is change the runtime type. 

In the top navigation menu, click on *Runtime*, then choose the option *Change Runtime Type*. Select **R** from the dropdown menu, as shown in the figure below. That's all it takes!

<br>

![Screenshot showing the Google Colab menu path: Runtime > Change runtime type > R](/assets/images/lesson_15_01.png)


<br>

{% include note-minimal.html content = 'You can also set which type of hardware accelerator you would like to use to process your code. Graphics processing units (GPUs) and TPUs are available and are excellent for heavy machine learning applications or large dataset operations.'  %}

<br>

***

<br>

## 2. The Data Source: Historical Baby Names


The data used in our hands-on tutorial comes from the `babynames` package. It contains a comprehensive dataset with baby names registered between 1880 and 2017 in the United States. For further details on the structure of the data, please explore the official documentation of the package [here](https://cran.r-project.org/web/packages/babynames/index.html).

<br>

***

<br>

## 3. Hands-On Example: Coding with R in Google Colab

Below you will find the R code used in the video tutorial. Paste this into a Colab code block. Feel free to copy, test, and change the parameters—for example, try searching for your own name!

<br>

{% include copy.html content = "code-15-1" %}
<div id = "code-15-1">
{% highlight r %}

# Install the necessary package directly in the Colab cell
install.packages("babynames")

# Load the library
library(babynames)

# Inspect the structure of the dataset
str(babynames)

# Filter the dataset for a specific name
bruno_df <- babynames[babynames$name == "Bruno", ]

# Plot the historical popularity of the name
plot(x = bruno_df$year, 
    y = bruno_df$n,
    type = "l",
    main = "Historical Popularity of the Name Bruno in the US",
    xlab = "Year",
    ylab = "Number of Babies")

{% endhighlight %}
</div>

<br>

The R code in above accomplishes the following:
- Setup: It installs and loads the babynames package, which contains the historical dataset.
- Inspection: It uses the str() function to let you inspect the internal structure of the dataset.
- Filtering: It filters the massive dataset to isolate the records specifically for your name, saving them into a new data frame (bruno_df).
- Visualization: It generates a line plot (type = "l") with the years on the x-axis and the number of babies on the y-axis, effectively showing how the popularity of the name has fluctuated over time.
{: .conclusion-list }


<br>

<img src="/assets/images/lesson_15_02.png" alt="Plot Showing the Historical Popularity of the Name Bruno in the US" width="60%" />

{% include note-minimal.html content = 'Important Colab Behavior: Note that each time you close and reopen a Colab notebook, the virtual machine resets. You will need to rerun the `install.packages()` commands required to run your code. While this might seem like a disadvantage, it encourages you to write highly reproducible code.'  %}

<br>

***

<br>

## 4. Frequently Asked Questions (FAQ)

<br>

**Is R completely free to use on Google Colab?** Yes, the standard tier of Google Colab is entirely free and supports R programming.

<br>

**Can I install any CRAN package in Colab?** Yes! You can use the standard `install.packages("package_name")` command just like you would in RStudio. 

<br>

**Can I read local CSV files into Colab using R?** Yes, you can upload files directly to the temporary session storage using the folder icon on the left sidebar, or you can mount your Google Drive to read datasets directly from your cloud storage.

<br>

***

<br>

## 5. Conclusions

<br>

- Google Colab provides a hassle-free, browser-based journey into the world of R programming and data exploration.
- With a quick toggle in the runtime menu, a Python environment instantly transforms to process R code.
- Mastering the use of R within Google Colab not only enriches your data analysis workflows but paves the way for enhanced, hardware-accelerated collaborative computing in the cloud.
{: .conclusion-list }

<br>

**Leave any questions or concerns you might have in the comments below!** 