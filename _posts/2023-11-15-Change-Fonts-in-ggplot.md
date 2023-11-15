---
layout: post
author: Bruno Ponne
title: How to Change Fonts in ggplot2 with Google Fonts
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r historicaldata ggplot2
image: lesson_17.jpeg
abstract: Explore 18th century London inquests using Google Fonts to improve your plots
objectives:
  - o: Be able to enhance your visualizations in R by integrating Google Fonts into ggplot2 graphs;
  - o: Be comfortable with loading and manipulating historical data in R;
  - o: Raise historical hypotheses taking into consideration the plots developed.
keywords: R, fonts, Google Fonts, ggplot2
description: Master the art of data visualization in R with our comprehensive guide on using Google Fonts in ggplot2. Learn to load, process historical datasets, and enhance your ggplot2 charts with custom fonts for more impactful and visually appealing data presentations.
last_modified_at: 15-Nov-23
---

<br>

# Discovering 18th century London with new fonts

<br>

**Greetings, humanists, social and data scientists!**

<br>

In this lesson, we delve into the world of data visualization with a focus on the use of different fonts in ggplot2. We are going to learn how to take advantage of Google Fonts to enrich our plots. Our journey takes us back in time, exploring a dataset derived from the "London Lives 1690-1800: Crime, Poverty and Social Policy in the Metropolis" project. This dataset provides a window into the socio-economic and health conditions of 18th-century.



{% include note.html content = 'Google fonts are open source and without cost.' url = 'https://developers.google.com/fonts/faq?hl=en' url_description = 'Read more here.'  %}

<br>


***
 
<br>

# Data source

The data used in this tutorial consists of a catalogue of historical documents organized by [Sharon Howard](https://sharonhoward.org/index.html). These documents detail an extensive range of Westminster inquests conducted between 1760 and 1799. They document investigations into deaths under circumstances that were sudden, unexplained, or suspicious. 

<br>

The data is derived from a larger project, [London Lives 1690-1800: Crime, Poverty and Social Policy in the Metropolis](https://www.londonlives.org/), a rich resource shedding light on the lives of ordinary Londoners during this era. [The dataset](https://github.com/sharonhoward/ll-coroners) we explore comprises 2,894 inquest records, each containing detailed information such as the dates of the inquests, names of the deceased, the verdicts rendered, and the causes of death. Sharon Howard's contribution in organizing these records offers an invaluable opportunity to study the social and legal intricacies of historic London.


<br>

***
 

<br>

## 1. How to load a tsv file in R?

TSV stands for 'Tab-Separated Values,' a textual format used to store tabular data. In this lesson, [our data](https://github.com/sharonhoward/ll-coroners/blob/master/coroners_inquests/wa_coroners_inquests_v1-1.tsv) is stored in TSV format. To load it, we use the `read_tsv` function from the `readr` package. After loading the data, we need to eliminate observations where the verdict is undefined.

<br>

Furthermore, the original data categorizes three types of suicide: 'suicide (delirious)', 'suicide (felo de se)', and 'suicide (insane)'. However, for our purposes, we will classify all these as simply 'suicide'. The code below execute these steps. Note that we use `filter`, `mutate` and `recode` from the `dplyr` package. The `recode` function takes as argument the column to be recoded and each value associated with its new content. The packages needed for this lesson are called at the beginning of the code. Please install them with `install.packages()` in case you don't have them.

<br>


{% include copy.html content = "code-17-1" %}

<div id = "code-17-1">

{% highlight r %}

library(readr)
library(dplyr)
library(ggplot2)
library(showtext)

df <- read_tsv("wa_coroners_inquests_v1-1.tsv")

df_prep <- df %>% 
  filter(verdict != "-") %>% 
  mutate(verdict = recode(verdict, "suicide (delirious)" = "suicide",
                          "suicide (felo de se)" = "suicide",
                          "suicide (insane)" = "suicide"))


{% endhighlight %}

</div>


<br>

***

<br>

## 2. Using the table function to summarize a categorical variable

An efficient method for counting the number of each type of verdict in the `verdict` variable is to use the `table` function. While this function is typically used to construct a contingency table for two variables, in this instance, it is utilized to tally the frequency of each category within the `verdict` variable. We then transform this table into a data frame to facilitate its use in `ggplot2`.

<br>

{% include note.html content = 'A contingency table, or crosstab, presents the counts for the combination of two categorical variables.' url = 'https://statisticsbyjim.com/basics/contingency-table/' url_description = 'Read more here.'  %}



<br>

{% include copy.html content = "code-17-2" %}

<div id = "code-17-2">

{% highlight r %}

table_ver <- data.frame(table(df_prep$verdict))


{% endhighlight %}

</div>

<br>

***

<br>


## 3. Change fonts in ggplot2 with showtext

The [showtext package](https://cran.rstudio.com/web/packages/showtext/vignettes/introduction.html), developed by Yixuan Qiu, greatly simplifies the use of various font types in R plots. In this lesson, we'll focus on using `showtext` to access Google Fonts, though the package offers more than just that capability.

<br>

After loading the library, you can select your desired Google Font using the `font_add_google` function. The `showtext_auto` command then instructs R to employ `showtext` for text rendering. That's it — next, simply specify your chosen font in the ggplot2 theme, as demonstrated in the code below. Since our `table_ver` data is already aggregated, we need to set stat = "identity" in the geom_bar layer. It's important to note the use of `reorder` to arrange the bars from largest to smallest frequency. The figures illustrate the resulting plots, first with the 'Montserrat' font followed by the 'Dancing Script' font.

<br>


{% include copy.html content = "code-17-3" %}
<div id = "code-17-3">
{% highlight r %}

font_add_google("Montserrat")

showtext_auto()

ggplot(table_ver) +
  geom_bar(aes(x = reorder(Var1, -Freq, sum), y = Freq), stat = "identity", color = "black", fill = "black") +
  labs(title = "Jury's Veredicts", 
       y = "Frequency", 
       x = "Verdict",
       subtitle = "Westminster Coroners' Inquests 1760-1799")+
  theme_bw()+
  theme(text=element_text(size=14, family="Montserrat"))


{% endhighlight %}

</div>

<br>

![Bar plot showing verdicts using the Montserrat font](/assets/images/lesson_17_01.png)

<br>

{% include note.html content = 'Even though I use "Dancing Script" (handwriting) in the plot below, it is generally recommended to use sans-serif fonts to plot your data. It makes your text more readable. In this tutorial I used "Dancing Script" to show you the options offered by Google Fonts. Lisa Charlotte Muth gives relevant advice on the use of fonts in plots in' url = 'https://blog.datawrapper.de/fonts-for-data-visualization/' url_description = 'this article.'  %}

<br>

![Bar plot showing verdicts using the Dancing Script font](/assets/images/lesson_17_02.png)


<br>

The plot above suggests a relatively low number of homicides in these inquests. One could investigate, if indeed the number is so low or if maybe the inquest's documentation suggest the possibility of homicides being wrongly classified as accidental.

<br>

***

<br>



## 4. A shiny app to choose your Google Font

To streamline the process of selecting the perfect font for your visualizations, I have created a user-friendly Shiny App. This tool allows you to experiment with a variety of Google Fonts on the plots discussed in this lesson, enabling you to discover the font that best enhances your data visualizations. You are welcome to explore this app and find the font that best suits your needs.

<br>

<iframe height="700px" width="100%" frameborder="no" scrolling="no" src="https://ggfontpicker-a2d2cb056f0a.herokuapp.com/"> </iframe>

<br>

In a future lesson I will explain how to code a Shiny App applied to digital humanities. Meanwhile, feel free to consult my [code here](https://github.com/bruno-ponne/ggFontPicker).

<br>

***

<br>

## 5. Checking the causes of death

In the plots above, we explored the verdict that resulted from the inquests, but the dataset is richer in details. Let us explore a little more?

<br>

The variable `cause_of_death` tells us more details of the circumstances in which the person in each inquest died. To visualize the most frequent causes of death, we will start by elimintating `NA` observations in this variable. We can do that with `filter(!is.na())`, which filters only values that are not `NA`. Following that command, we group observations by `cause_of_death` and count the frequency of each cause with `tally`.

<br>

{% include note.html content = 'tally() is equivalent to dplyr summarise(n = n()).' url = 'https://dplyr.tidyverse.org/reference/count.html' url_description = 'Read more here.'  %}

<br>

The last step is to filter only causes of death that occurred more than 15 times in our dataset. Please, decrease this number if you would like to see more causes. Finally, we can use the same ggplot2 code to plot the causes of death. Since the texts representing the causes of death are longer than the verdicts, we will plot the them in the y axis and the frequency in the x axis. The remaining code remains very similar.

<br>


{% include copy.html content = "code-17-4" %}
<div id = "code-17-4">
{% highlight r %}

cause <- df_prep %>%
  filter(!is.na(cause_of_death)) %>% 
  group_by(cause_of_death) %>%
  tally() %>% 
  filter(n>15)


font_add_google("Montserrat")

showtext_auto()

ggplot(cause) +
  geom_bar(aes(y = reorder(cause_of_death, n, sum), x = n), 
           width = .5, stat = "identity",color = "black", fill = "black") +
  labs(title = "Causes of death",
       y = "", 
       x = "Frequency")+
  theme_bw() +
  theme(text=element_text(size=10, 
                          family = "Montserrat"))


{% endhighlight %}

</div>

<br>

![Bar plot showing causes of death](/assets/images/lesson_17_03.png)

<br>

It's noteworthy that a significant number of the inquests pertained to cases of drowning or suicide. An intriguing avenue for further research would be to delve into the complete reports of these inquests. Such an investigation could shed light on the reasons behind the high incidence of drownings.

<br>

**Please, feel free to leave any questions or concerns you might have in the comments below.** 


<br>

***

<br>

# Conclusions

<br>

- Using Google Fonts within ggplot2 not only transforms but significantly elevates the aesthetic appeal of our data visualizations;
- Leveraging the showtext package simplifies incorporating diverse Google Fonts into R, enhancing our data representation capabilities;
- Employing simple plots with historical data effectively generates insightful hypotheses, offering a deeper understanding of our past.;
{: .conclusion-list }

<br>

***

