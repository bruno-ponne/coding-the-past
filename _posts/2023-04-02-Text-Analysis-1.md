---
layout: post
author: Bruno Ponne
title: Visualizing Text Data
attributes:
  - e: Medium
  - e: Python
  - e: 15 min
tags: python visualization matplotlib text-analysis
image: lesson_07.png
abstract: Learn to analyze and visualize text data 
objectives:
  - o: Learn to load and tokenize text data into Python;
  - o: Be able to clean your data to retain only the relevant information;
  - o: Learn to count words in a list;
  - o: Be comfortable with visualizing text data;
keywords: nltk, tokenizer, text data, matplotlib, word frequency
description: learn to tokenize texts with nltk
last_modified_at: 02-Apr-23
---

<br>

# Introduction

<br>

“Words have no power to impress the mind without the exquisite horror of their reality.”

Edgar Allan Poe

<br>

One common way of distinguishing between history and prehistory is by the emergence of writing. In particular, in our modern era, text data has become ubiquitous. The study of either the past or the present often involves the analysis of text. From social media to scientific journals, words are everywhere. In this lesson, we will learn how to analyze and visualize textual data. We will use the [Natural Language Toolkit (NLTK)](https://www.nltk.org/){:target="_blank"} to tokenize the text data, and the [Matplotlib](https://matplotlib.org/){:target="_blank"}  library to visualize our results.

<br>

***
 
<br>

# Data source

 Data used in this lesson is available on the [Oxford Text Archive](https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/2021){:target="_blank"} website. To know more about textual data sources, check this post: ['Where to find and how to load historical data']({% post_url 2023-01-10-Where-to-find-and-how-to-load-historical-data %})

<br>

<br>

***
 
<br>

# Coding the past: visualizing text data


## 1. Importing text data with Python

<br>
To load the text files mentioned above, we will build a function. Before we start to write the function, all libraries necessary for this lesson will be loaded. 

<br>

Using the `with` statement will ensure that the file is closed when the block inside it is finished. Note that we use "latin-1" encoding. The function `islice()` creates an iterable object and a for loop is used to slice the file into chunks (lines). Each line is appended to the list `my_text`.  

<br>

`word_tokenize` is a function from the NLTK library that splits a sentence into words. All the sentences are then split into words and stored in a list. Note that the list needs to be flattened into a single list, since the tokenizer returns a list of lists. This is done with a list comprehension.

<br>

{% include copy.html content = "code-7-1" %}

<div id = "code-7-1">
{% highlight python %}

from itertools import islice
from nltk.tokenize import word_tokenize
nltk.download('stopwords')
from nltk.corpus import stopwords
import pandas as pd
import matplotlib.pyplot as plt

def load_text(filename):
    my_text = list()
    with open(filename, encoding= "latin-1") as f:
        for line in islice(f, 0, None):
            my_text.append(line)
    my_text = [word_tokenize(sentence) for sentence in my_text]
    flat_list = [item for sublist in my_text for item in sublist]
    return flat_list

{% endhighlight %}

</div>

<br>

Now we load the manifests of three authors: Oxenbridge Thacher, James Otis, and James Mayhew. The results are stored in three lists called `thacher`, `otis`, and `mayhew`.

<br>

{% include copy.html content = "code-7-2" %}
<div id = "code-7-2">
{% highlight python %}
thacher = load_text('thacher-2021.txt')
otis = load_text('otis-2021.txt')
mayhew = load_text('mayhew2-2021.txt')
{% endhighlight %}

</div>

<br>

If you check the length of the lists, you will see that Oxenbridge Thacher's manifest has approximately 4,156 words; James Mayhew, 18,969 words; and James Otis, 34,031 words.

<br>

***
 
<br>

## 2. Removing stop words in Python

<br>

In this function, we will use NLTK stopwords to remove all words that do not add any meaning to our analysis. Moreover, we transform all characters to lowercase and remove all words containing two or fewer characters.

<br>

{% include copy.html content = "code-7-3" %}
<div id = "code-7-3">
{% highlight python %}
def prepare_text(list_of_words):
  #load stopwords:
  stops = stopwords.words('english')
  #transform all word characters to lower case:
  list_of_words = [word.lower() for word in list_of_words]
  #remove all words containing up to two characters:
  list_of_words = [word for word in list_of_words if len(word)>2]
  #remove stopwords:
  list_of_words = [word for word in list_of_words if word not in stops]
  return list_of_words

{% endhighlight %}

</div>

<br>

We apply the function to the three lists of words. After the cleaning process, the number of words is reduced to less than 50% of the original size.

<br>

{% include copy.html content = "code-7-4" %}
<div id = "code-7-4">
{% highlight pyhton %}
thacher_prepared = prepare_text(thacher)
otis_prepared = prepare_text(otis)
mayhew_prepared = prepare_text(mayhew)
{% endhighlight %}

</div>

<br>

***
 
<br>

## 3. How to count words in a list using python

<br>

The function below counts the frequency of each word and returns a dataframe with the words and their frequencies, sorted by the frequency.

<br>

{% include copy.html content = "code-7-5" %}

<div id = "code-7-5">
{% highlight python %}

def count_freq(my_list):
    unique_words = []
    counts = []
    # create a list of unique words:
    for item in my_list:
      if item not in unique_words: 
        unique_words.append(item)
    # count the frequency of each word:
    for word in unique_words:
      count = 0
      for i in my_list:
        if word == i:
          count += 1
      counts.append(count)
    # create a dataframe with the words and their frequencies:
    df = pd.DataFrame({"word": unique_words, "count": counts})
    df.sort_values(by="count", inplace = True, ascending = False)
    df.reset_index(drop=True, inplace = True)
    return df

thacher_df = count_freq(thacher_prepared)
otis_df = count_freq(otis_prepared)
mayhew_df = count_freq(mayhew_prepared)

{% endhighlight %}

</div>

<br>

<br>

***
 
<br>

## 4. Word count visualization

<br>

We will use the `matplotlib` library to create a bar plot with the 10 most frequent words in each manifest. We use `iloc` to select the first 10 rows of each dataframe. `barh` creates a horizontal bar plot where the words are on the y-axis and the frequency on the x-axis. After that, we set the title of each plot and perform a series of adjustments to the plot, including the elimination of the grid, the removal of part of the frame, and the change in font and background colors. Finally we also use the tight layout function to adjust the spacing between the plots.

<br>

{% include copy.html content = "code-7-6" %}

<div id = "code-7-6">
{% highlight python %}

thacher_10 =thacher_df.iloc[:10]
otis_10 = otis_df.iloc[:10]
mayhew_10 = mayhew_df.iloc[:10]

fig, (ax1, ax2, ax3) = plt.subplots(1,3, figsize=(12, 4))

# horizontal barplot:

ax1.barh(thacher_10["word"], thacher_10["count"], 
        color = "#f0027f", 
        edgecolor = "#f0027f")

ax2.barh(otis_10["word"], otis_10["count"], 
        color = "#386cb0", 
        edgecolor = "#386cb0")

ax3.barh(mayhew_10["word"], mayhew_10["count"], 
        color = "#fdb462", 
        edgecolor = "#fdb462")

# title:
ax1.set_title("Thacher")
ax2.set_title("Otis")
ax3.set_title("Mayhew")

# iterate over ax1, ax2, ax3 to: 
# invert the y axis;
# eliminate grid;
# set fonts and background colors;
# eliminate spines;
for ax in fig.axes:                             
    ax.invert_yaxis()                           
    ax.grid(False)                              
    ax.title.set_color('white')                 
    ax.tick_params(axis='x', colors='white')    
    ax.tick_params(axis='y', colors='white')    
    ax.set_facecolor('#2E3031')                 
    ax.spines["top"].set_visible(False)         
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)

# fig background color:
fig.patch.set_facecolor('#2E3031')
# layout:
fig.tight_layout()

plt.show()
{% endhighlight %}

</div>

<br>

![plot of the most frequent words in each manifest](/assets/images/lesson_07_01.png)
{: .larger } 


<br>

***
 
<br>

## 5. Calculate the proportion of each word and comparing the manifests

<br>
Finally, we calculate the proportion of each word in each manifest relative to the total number of words in that document and store them in a new column called "proportion". We also create two new data frames, one for each pair of manifests: one to compare Thacher and Otis, and the other to compare Thacher and Mayhew. This is done by an outer join, using the `word` column as the key. This operation keeps all the words, even the ones that are not included in both datasets, and fills the missing values with 0.


<br>

{% include copy.html content = "code-7-7" %}  
<div id = "code-7-7">
{% highlight python %}

thacher_df["proportion"] = thacher_df["count"]/sum(thacher_df["count"])
otis_df["proportion"] = otis_df["count"]/sum(otis_df["count"])
mayhew_df["proportion"] = mayhew_df["count"]/sum(mayhew_df["count"])

thacher_otis = thacher_df[["word", "proportion"]].merge(
    otis_df[["word", "proportion"]], 
    on = "word", 
    how = "outer", 
    suffixes = ("_thacher", "_otis")).fillna(0)

thacher_mayhew = thacher_df[["word", "proportion"]].merge(
    mayhew_df[["word", "proportion"]],
    on = "word",
    how = "outer",
    suffixes = ("_thacher", "_mayhew")).fillna(0)


{% endhighlight %}

</div>

<br>

Now we will compare the three manifests by plotting the proportion of each word in Thacher on the x-axis and the proportion of the same word in Otis on the y-axis. We will use the `scatter` function to create a scatter plot in which the coordinates are the frequencies of a given word in Thacher and Otis. We will also use the `annotate` function to label each point with the word. The same procedure will be used to compare Thacher and Mayhew. Note that the more similar the manifests, the more points will be concentrated in the diagonal line (same frequency in both manifests).

<br>

{% include copy.html content = "code-7-8" %}
<div id = "code-7-8">
{% highlight python %}


fig, ax = plt.subplots()

# scatterplot:
ax.scatter(thacher_otis["proportion_thacher"], thacher_otis["proportion_otis"], color = "#f0027f", alpha = 0.5)

# annotate words:
for i, txt in enumerate(thacher_otis["word"]):
    ax.annotate(txt, 
                (thacher_otis["proportion_thacher"][i], 
                 thacher_otis["proportion_otis"][i]), 
                 color = "white", 
                 alpha = 0.7)
    
# eliminate grid:
ax.grid(False)

# x axis label:
ax.set_xlabel("Thacher")

# y axis label:
ax.set_ylabel("Otis")

# diagonal dashed line:
ax.plot([0, 0.02], [0, 0.012], color = "gray", linestyle = "--")

# fig background color:
fig.patch.set_facecolor('#2E3031')

# ax background color:
ax.set_facecolor('#2E3031')

# x and y axes labels font color to white:
ax.xaxis.label.set_color('white')
ax.yaxis.label.set_color('white')


# ax font colors set to white:
ax.tick_params(axis='x', colors='white')
ax.tick_params(axis='y', colors='white')

# set spines to false:
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

{% endhighlight %}

</div>

<br>

![Word frequency scatterplot: Thacher vs Otis](/assets/images/lesson_07_02.png)

<br>

{% include copy.html content = "code-7-9" %}

<div id = "code-7-9">
{% highlight python %}
# plot scatterplot with words:
fig, ax = plt.subplots()

ax.scatter(thacher_mayhew["proportion_thacher"], 
           thacher_mayhew["proportion_mayhew"], 
           color = "#f0027f", 
           alpha = 0.5)

for i, txt in enumerate(thacher_mayhew["word"]):
    ax.annotate(txt, (thacher_mayhew["proportion_thacher"][i], 
                      thacher_mayhew["proportion_mayhew"][i]), 
                      color = "white", 
                      alpha = 0.7)
# eliminate grid:
ax.grid(False)
# x axis label:
ax.set_xlabel("Thacher")
# y axis label:
ax.set_ylabel("Mayhew")
# diagonal dashed line:
ax.plot([0, 0.02], [0, 0.012], 
        color = "gray", 
        linestyle = "--")

# fig background color:
fig.patch.set_facecolor('#2E3031')

# ax background color:
ax.set_facecolor('#2E3031')

# x and y axes labels font color to white:
ax.xaxis.label.set_color('white')
ax.yaxis.label.set_color('white')


# ax font colors set to white:
ax.tick_params(axis='x', colors='white')
ax.tick_params(axis='y', colors='white')

# set spines to false:
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

{% endhighlight %}

</div>

<br>

![Word frequency scatterplot: Thacher vs Mayhew](/assets/images/lesson_07_03.png)

<br>

Note that Thacher and Otis are more similar than Thacher and Mayhew. This is reflected in the scatterplot, where the points are more concentrated in the diagonal line in the plot relating Thacher and Otis compared to the one relating Thacher and Mayhew. This is a simple way to compare the similarity of two texts. We know, for example, that, while Thacher talks a lot about "colonies", Mayhew talks a lot about "god".

<br>

***
 
<br>

# Conclusions

<br>

- You can tokenize text data with the NLTK library method `word_tokenize`;
- With list comprehensions, you can treat text to eliminate irrelevant characters and words;
- You can visualize the frequency of words in a text with matplotlib.
{: .conclusion-list }

<br>

***