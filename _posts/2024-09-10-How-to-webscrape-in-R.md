---
layout: post
author: Bruno Ponne
title: How to webscrape in R?
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r digitalhumanities textanalysis
image: lesson_23.jpg
abstract: Learn how to perform basic webscraping in R.
objectives:
  - o: Understand the steps of webscraping.
  - o: Be able to carry out webscraping with the rvest R package.
keywords: R, webscraping, data visualisation, rvest
description: Learn how to webscrape in R and use it to gather real data on the Internet.
sd: false
last_modified_at: 10-September-24
---

<br>

In this lesson you will learn the basics of webscraping with the `rvest` R package. To demonstrate how it works, you will extract three speeches by Adolf Hitler from Wikipedia pages and analyze their word frequencies!

<br>

{% include note.html content = 'These speeches are analysed here strictly for research purposes. Read more about an academic project to make Hitler speeches available for research:'   url= 'https://aktuelles.uni-frankfurt.de/en/english/putting-hitler-research-on-a-new-footing/' url_description = 'Collection of Adolf Hitlers Speeches, 1933-1945' %}

<br>

## 1. What is webscraping?
Simply put, webscraping is the process of gathering data on webpages. In its basic form, it consists of downloading the HTML code of a webpage, locating in which element of the HTML structure the content of interest is and, finally, extracting and storing it locally for further data analysis.

![Visual explanation of web scraping steps](/assets/images/lesson_23_01.png)

<br>

{% include note.html content = 'Keep in mind that webscraping can be more complex if the target website uses JavaScript to render content. In this case, consider combining rvest with other libraries, as described'  url = 'https://www.datacamp.com/tutorial/scraping-javascript-generated-data-with-r' url_description = 'here.' %}

<br>


***

<br>

## 2. How to webscrape in R?
There are several libraries developed to webscrape in R. In this lesson, we will stick to one of the most popular, [rvest](https://rvest.tidyverse.org/). This library is part of the tidyverse set of libraries and allows you to use the pipe operator (%>%). It is inspired by Python's [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) and [RoboBrowser](https://robobrowser.readthedocs.io/en/latest/readme.html). The basic steps for webscraping with rvest would involve using the following functions:

- **read_html**: Extracts the HTML source code associated with an URL;
- **html_elements**: Extracts the relevant HTML elements from the HTML code;
- **html_text**: Extracts the text (content) from the HTML elements;
{: .conclusion-list }

<b>
{% include note.html content = 'There is a lot of debate on whether webscraping is ethical/legal or not. It depends a lot on where you are and the kind of content and purpose of your webscraping. Usually the robots.txt file of a website gives you hints about what is allowed and disallowed in a website. For more details on this debate, please check'  url = 'https://r4ds.hadley.nz/webscraping#scraping-ethics-and-legalities' url_description = 'this link.' %}

<br>


To illustrate how this works, we will extract the text of three speeches made by Adolt Hitler during the Second World War. The first step is to save the url of these speeches in a variable. We also load the necessary libraries. Please install them if you haven't already done that.


<br>

{% include copy.html content = "code-23-1" %}
<div id = "code-23-1">
{% highlight r %}

library(rvest) # for webscraping
library(tidytext) # for cleaning text data
library(dplyr) # for data preparation
library(ggplot2) # for data viz

speech_01 <- "https://en.wikisource.org/wiki/Adolf_Hitler%27s_Address_at_the_Opening_of_the_Winter_Relief_Campaign_(4_September_1940)"
speech_02 <- "https://en.wikisource.org/wiki/Adolf_Hitler%27s_Address_to_the_Reichstag_(4_May_1941)"
speech_03 <-"https://en.wikisource.org/wiki/Adolf_Hitler%27s_Declaration_of_War_against_the_United_States"

{% endhighlight %}

</div>

<br>

Since we are going to extract the content of three speeches, it is a good idea to create a function to perform this task, since the same steps will repeat three times. If you inspect the URLs above, you will realize that the text content is located inside `<p>` (paragraph) tags. Therefore, our target is to extract these elements. Note that in Firefox and Chrome, you can inspect a webpage by right clicking any area of the page and clicking "inspect". For other browsers the procedure should be similar. If you have difficulty finding this option, please check the browser documentation.

<br>

Our `read_speech` function is pretty straightforward. The `read_html` reads the URL of the webpage and delivers the HTML of it. The pipe operator `%>%` passes the output of one function to the input of the next one. `html_elements` extracts only paragraph tags from the code and, finally, `html_text` extracts the text from the paragraph tags.

<br>

{% include copy.html content = "code-23-2" %}
<div id = "code-23-2">
{% highlight r %}

read_speech <- function(url){
  speech <- read_html(url) %>% 
    html_elements("p") %>% 
    html_text()
}

speech_04_Sep_40 <- read_speech(speech_01)
speech_04_May_41 <- read_speech(speech_02)
speech_11_Dec_41 <- read_speech(speech_03)



{% endhighlight %} 

</div>

<br>
At this point, if you check the results, you will note that the function delivers a text vector in which each element of the vector is one paragraph. We still need to make some adjustments because the first paragraph is only a small presentation of the speech, rather than part of it. Therefore we should eliminate the first element of the vector. For the speech of 4th of September and the one of 11th December, that is all we need to do. If you print the speech of 4th of May, you will see that the last 5 elements are also metadata and need to be excluded. The code below uses indexing to filter the data accordingly. Moreover, we transform all the dataframes into [tibble](https://r4ds.had.co.nz/tibbles.html) - a more modern kind of dataframe - to make it easier to prepare the data in the next steps.

<br>

{% include copy.html content = "code-23-3" %}
<div id = "code-23-3">
{% highlight r %}
speech_04_Sep_40 <- speech_04_Sep_40[2:60]
speech_04_May_41 <- speech_04_May_41[2:60]
speech_11_Dec_41 <- speech_11_Dec_41[2:155]

# tibble creates a modern kind of dataframe with two columns: paragraph and text
speech_04_Sep_40 <- tibble(paragraph = 1:59, text = speech_04_Sep_40) 
speech_04_May_41 <- tibble(paragraph = 1:59, text = speech_04_May_41)
speech_11_Dec_41 <- tibble(paragraph = 1:154, text = speech_11_Dec_41)


{% endhighlight %} 

</div>


<br>

***

<br>

## 3. Visualizing the most frequent words in Hitler's speeches

Our next objective is to visualize the top 10 words in each Hitler's speech. In order to do that, we will first prepare the data, transforming the dataframes from the previous step to contain one word per row with its respective count. Note that we will eliminate stopwords - words with little meaning for the analysis, like articles.

<br>

A function called `count_words` will be created to carry out data preparation. This function will expand the dataframe from the paragraph level to the word level. This is done by `unnest_tokens`, which transforms the table to one-token-per-row. It takes the "text" column as input and outputs a "word" column. `anti_join` eliminates rows containing stopwords. If you print stopwords you can see exactly which words are being eliminated. Finally, `count` counts how many times each word occurs.


<br>

{% include copy.html content = "code-23-4" %}
<div id = "code-23-4">
{% highlight r %}

count_words <- function(speech){
    speech_count <- speech %>% 
    unnest_tokens(output = word, input = text) %>% 
    anti_join(stop_words) %>% 
    count(word, sort = TRUE) 
}

speech_04_Sep_40_count <- count_words(speech_04_Sep_40)
speech_04_May_41_count <- count_words(speech_04_May_41)
speech_11_Dec_41_count <- count_words(speech_11_Dec_41)


{% endhighlight %} 

</div>

<br>

Great, now we can use `ggplot2` to visualize the top 10 words in each speech. Note that we specify the dataframe of interest with index filtering to keep only the top 10 words. Note, as well, that we reorder the bar plot so that bar start from most to least frequent word. We choose a color and eliminate the y-axis label. The same can be done for the two other speeches. 

<br>

{% include copy.html content = "code-23-5" %}
<div id = "code-23-5">
{% highlight r %}

ggplot(data = speech_04_Sep_40_count[1:10,], aes(n, reorder(word, n))) +
  geom_col(color = "#FF6885", fill ="#FF6885") +
  labs(y = NULL)


{% endhighlight %} 

</div>

<br>
- Top 10 words used in Hitler's speech of 4th September 1940

![Top 10 words used in Hitler's speech of 4th September 1940](/assets/images/lesson_23_02.png)

<br>
- Top 10 words used in Hitler's speech of 4th May 1941

![Top 10 words used in Hitler's speech of 4th May 1941](/assets/images/lesson_23_03.png)

<br>
- Top 10 words used in Hitler's speech of 11th December 1941

![Top 10 words used in Hitler's speech of 11th December 1941](/assets/images/lesson_23_04.png)


<br>

To add the same ggplot2 theme as used in these plots, please check `theme_coding_the_past()`, our theme that is available here: ['Climate data visualization with ggplot2']({% post_url 2023-01-24-Historical-Weather-Data %}).

<br>

Not surprisingly, "war" is a word that reaches the top 3 in all Hitler's speeches. It is also interesting that other words refering to Britain, Balkans and Americans reflect the stage in which the war was. For example, in the speech of 11th of December, 1941, Hitler declares war on the US and therefore we observe a high frequency of words semantically related to the US. Please, leave your comment, questions or thoughts below and happy coding!

<br>

***

<br>

## 4. Conclusions

<br>

- R can be an effective tool to perform webscraping, notably with the `rvest` package;
- To smoothly clean webscraped content, you may use the `tidytext` package.
{: .conclusion-list }

<br>

***

