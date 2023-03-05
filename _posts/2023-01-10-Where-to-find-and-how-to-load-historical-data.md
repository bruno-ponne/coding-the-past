---
layout: post
author: Bruno Ponne
attributes:
  - e: Easy
  - e: Python
  - e: R
  - e: 10 min
tags: r python data read_csv
image: lesson_02.png
toc: true
abstract: Learn 5 great websites to find reliable historical data and how to load it in R and Python.
objectives:
  - o: Get to know good sources of historical data;
  - o: Be able to load data in R and Python;
keywords: social data science, python and r, historical data, pandas dataframe, read csv in R
description: Use R and Python to load csv historical data.
last_modified_at: 05-Mar-23
---

<br>

# Introduction

**'Information is not knowledge'**
<br>
Albert Einstein

<br>

With so much data available nowadays, I frequently feel overwhelmed when I have to find data to study a subject. Is this dataset reliable? How was the data treated? Where can I find the codebook with detailed information on the variables? These are only some of my concerns. When it comes to historical data, the task can be even harder. In this lesson, you will learn about 5 fascinating and reliable websites to find historical data and how to load datasets in Python and R.

<br>

<br>

***
 
<br>

# Data Sources

<br>

## 1. [Harvard Business School](https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/data-and-sources){:target="_blank"}

The Harvard Business School developed the project 'Historical Data Visualization' to foster the understanding of global capitalism throughout time. The page offers more than 40 datasets about a broad range of topics. For instance, you can find data on life expectancy, literacy rates or economic activity in several countries during the 19th and 20th century. Datasets are mostly in Excel format. Definitely worth a visit!

<br>

## 2. [Human Mortality Database](https://www.mortality.org/Home/Index){:target="_blank"}

Human Mortality Database (HMD) provides death rates and life expectancy for several countries over the last two centuries. Even though the platform requires a quick registration to give you access to the data, it is very complete and straightforward to understand. Datasets are in tab-delimited text (ASCII) files.

<br>

## 3. [National Centers for Environmental Information](https://www.ncei.noaa.gov/){:target="_blank"}

Would you like to study how climate has changed over the last centuries? Then this is an invaluable source for you! The National Centers for Environmental Information is the leading authority for environmental data in the USA and provides high quality data about climate, ecosystems and water resources. Data files can be downloaded in comma separated values format.

<br>

## 4. [Clarin Historical Corpora](https://www.clarin.eu/resource-families/historical-corpora){:target="_blank"}

If you wish to work with text data, this is a valuable source of material. It offers access to ancient and medieval greek texts, the manifests wrote during the American Revolution, court proceedings in England in the 18th century and many other instigating materials. Files are usually provided in .txt format. The requirements to access files varies according to each case, since data comes from different institutions.

<br>

## 5. [Slave Voyages](https://www.slavevoyages.org/){:target="_blank"}

This impressive platform, supported by the Hutchins Center of Harvard University, gathers data regarding the forced relocations of more than 12 million African people between the 16th and 19th century. Files are provided in SPSS or comma separated values format.

<br>

<br>

***
 
<br>

# Coding the past: how to load data in Python

## 1. Pandas *read_csv()*
In this section, you will learn to load data into Python. You will be using [data](https://www.slavevoyages.org/voyage/downloads#the-trans-atlantic-slave-trade-database/1/en/){:target="_blank"} provided by the [Slave Voyages](https://www.slavevoyages.org/){:target="_blank"} website. The dataset contains data regarding 36,108 transatlantic slave trade voyages. [Learn more about the variables here](https://www.slavevoyages.org/voyage/about#variable-list/2/en/){:target="_blank"}.

<br>

To load our data in Python, we will use [Pandas](https://pandas.pydata.org/docs/index.html){:target="_blank"}, a Python library that provides data structures and analysis tools. The Pandas method `read_csv()` is the ideal option to load comma separated values into a dataframe. A dataframe is one of the data structures provided by Pandas and it consists of a table with columns (variables) and rows (observations). Bellow, we use the default configuration of `read_csv()` to load our data. Note that the only parameter passed to the method is the file path where you saved the dataset.

<br>

{% include copy.html content = "code-2-1" %}

<div id = "code-2-1">
{% highlight python %}
import pandas as pd
df = pd.read_csv("/content/drive/MyDrive/historical_data/tastdb-exp-2019.csv")
{% endhighlight %}

</div>

<br>

<br>

***
 
<br>

## 2. Getting pandas dataframe info

A dataframe object is now created. It has several attributes or characteristics. For example, we can check its dimensions with `shape` and its column names with `columns`. Note that column names are the names of our variables. Moreover, you can also call methods, which, in general, carry out an operation to analyze the data contained in the dataframe. For example, the method `describe()` calculates summary statistics of each variable and `head()` filters and displays only the first n observations of your data. Check all [Pandas *DataFrame* attributes and methods here](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame){:target="_blank"}.

<br>

![Pandas DataFrame Object ](/assets/images/lesson_02_01.png)

<br>

Use the following code to check the dimensions and variable names of the dataset:

<br>

{% include copy.html content = "code-2-2" %}

<div id = "code-2-2">
{% highlight python %}

print("Dimensions: ", df.shape, 
      "Variable names: ", df.columns)

{% endhighlight %}

</div>

<br>

The attributes show that there are 276 variables and 36,108 observations in this dataset. Let us suppose you are only interested in the number of slaves disembarked (*slamimp*) in America per year (*yearam*). You could load only these two variables using the `read_csv()` parameter `usecols`. This parameter receives a list with variable names you wish to load. In larger datasets this parameter is very handy because you do not want to load variables not relevant to your study.

<br>

{% include copy.html content = "code-2-3" %}

<div id = "code-2-3">
{% highlight python %}
df = pd.read_csv("/content/drive/MyDrive/historical_data/tastdb-exp-2019.csv",
                 usecols=['YEARAM', 'SLAMIMP'])

df.head()
{% endhighlight %}

</div>

<br>

<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>SLAMIMP</th>
      <th>YEARAM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>290.0</td>
      <td>1817</td>
    </tr>
    <tr>
      <th>1</th>
      <td>223.0</td>
      <td>1817</td>
    </tr>
    <tr>
      <th>2</th>
      <td>350.0</td>
      <td>1817</td>
    </tr>
    <tr>
      <th>3</th>
      <td>342.0</td>
      <td>1817</td>
    </tr>
    <tr>
      <th>4</th>
      <td>516.0</td>
      <td>1817</td>
    </tr>
  </tbody>
</table>

<br>

Now the dataframe is loaded only with the two specified variables. As said, Pandas dataframes offer tools to analyze the data, using *DataFrame* methods. Above, we use the method `head()` to display the five first observation in our dataframe. You can set how many observations `head()` should return through the `n` parameter (default is 5).

<br>

Moreover, we can use `describe()` to obtain summary statistics of our variables. From the summary statistics we can see that the earliest record is from the year 1514 and the latest one of 1886. Also, the maximum number of slaves traded in one voyage was 1,700.

<br>

<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>SLAMIMP</th>
      <th>YEARAM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>34182.00</td>
      <td>36108.00</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>269.24</td>
      <td>1764.33</td>
    </tr>
    <tr>
      <th>std</th>
      <td>137.32</td>
      <td>59.47</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.00</td>
      <td>1514.00</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>177.00</td>
      <td>1732.00</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>261.00</td>
      <td>1773.00</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>350.00</td>
      <td>1806.00</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1700.00</td>
      <td>1866.00</td>
    </tr>
  </tbody>
</table>

<br>

<br>

***
 
<br>

# Coding the past: how to import a dataset in R

In R there are several functions that load comma separated files. I chose `fread` from the `data.table` library, because it offers a straightforward parameter to select the variables you wish to load (`select`). `fread` creates a data frame, similar to a pandas dataframe.

<br>

{% include copy.html content = "code-2-4" %}

<div id = "code-2-4">
{% highlight r %}
library(data.table)

df <- fread("tastdb-exp-2019.csv", 
            select = c("YEARAM","SLAMIMP"))
{% endhighlight %}

</div>

<br>

To get summary statistics about your variables you can use the function `summary(df)`. To view the n first observations of your dataframe, use `head(df,n)` as shown bellow. `Summary` and `head` produce very similar results to `describe` and `head` in Python.

<br>

{% include copy.html content = "code-2-5" %}

<div id = "code-2-5">
{% highlight r %}
summary(df)

head(df,10)
{% endhighlight %}

</div>

<br>
More posts on how to find reliable data will be published soon!
<br>

***
 
<br>

# Conclusions

- These websites offer high quality historical data:
  - [Harvard Business School](https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/data-and-sources){:target="_blank"}
  - [Human Mortality Database](https://www.mortality.org/Home/Index){:target="_blank"}
  - [National Centers for Environmental Information](https://www.ncei.noaa.gov/){:target="_blank"}
  - [Clarin Historical Corpora](https://www.clarin.eu/resource-families/historical-corpora){:target="_blank"}
  - [Slave Voyages](https://www.slavevoyages.org/){:target="_blank"}
- You can load comma separated values in Python with the pandas method `.read_csv()`;
- You can load comma separated values in R with the function `fread()` from the library `data.table`;
{: .conclusion-list } 
<br>

***