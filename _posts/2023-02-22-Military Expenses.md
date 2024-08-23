---
layout: post
author: Bruno Ponne
title:  Learn To Use scale_color_brewer To Change Colors In ggplot2
attributes:
  - e: Medium
  - e: R
  - e: 5 min
tags: r ggplot2
image: lesson_05.jpeg
abstract: Use RColorBrewer to choose professional color palettes.
objectives:
  - o: Learn to improve your plots with scale_color_brewer;
  - o: Become comfortable using scale_color_brewer in a hands-on application
keywords: r, scale_color_brewer, ggplot, color palette
description: A step-by-step on how to use scale_color_brewer to change colors in ggplot2 and an example of application.
last_modified_at: 23-Aug-24
---

<br>

R offers several libraries created by professional designers that provide excellent color palettes. In this lesson, you will learn to use scale_color_brewer to improve your plots with professional looking colors. To make things more interesting, we'll use data from the military expenses of leading capitalist countries during the Cold War era. Let's paint your data story!

<br>

## 1. What is scale_color_brewer?

Simply put, scale_color_brewer is a ggplot2 layer that you can use to easily select the colors of your ggplot visualizations. It makes use of color schemes from [ColorBrewer](https://colorbrewer2.org/#) to provide professional sequential, diverging and qualitative palettes.

<br>

***
 
<br>


## 2. How to use scale_color_brewer?

If you load `ggplot2`, scale_color_brewer will be available for you and, since ggplot also loads the `scales` package, a series of ColorBrewer palettes will also be automatically loaded. Therefore all you need to do is adding a new layer to your plot specifying the palette you would like to use. For example, `ggplot(...)+ scale_color_brewer(palette = 'Set1')`. Check the example below for more color palettes.


<br>

***
 
<br>


## 3. Using scale_color_brewer with real data

Data used in this example is available on the [World Bank](https://databank.worldbank.org/home){:target="_blank"} website. We will be analysing military expenses of countries during the Cold War era, expressed in percentage of their GDP. To make it easier, a file with the data was prepared for you. 
 
<br>

Download the [data file here][1] and load the libraries we will need, according to the code below. To read the data, use the R function `read_csv()`. Additionally, we are only interested in the first five rows and in columns 3 and 5 to 36. They are selected with `[1:5, c(3, 5:36)]`. 

[1]:{{ site.url }}/assets/data/military.csv

<br>

{% include copy.html content = "code-5-1" %}

<div id = "code-5-1">
{% highlight r %}
library(readr)
library(tidyr)
library(dplyr)
library(ggplot2)


military <- read_csv('military.csv')[1:5, c(3, 5:36)]

{% endhighlight %}
</div>

<br>


If you take a look at the dataframe you just loaded, you will see that it has one column for each year. To use ggplot your data has to be tidy. According to Hadley Wickham, in a tidy dataframe:

<br>

1. Each variable must have its own column;
2. Each observation must have its own row;
3. Each value must have its own cell;
{: .conclusion-list } 

{% include note.html content = 'Learn more about tidy data and how to transform a dataframe from wide to long format '  url = 'https://r4ds.had.co.nz/tidy-data.html' url_description = 'here.' %}

<br>

To make our data tidy, we will transform all the year columns into one variable called "year" and we will also transfer the values contained in these columns to a single new variable called "expense". Note the syntax of the `pivot_longer` function. The first argument is the dataframe we want to transform, the second are the columns we would like to treat. Finally, `names_to` indicates the name of the new column that will receive the years and `values_to` indicates the name of the new column that will receive the values of the year columns.

<br>

![Conversion of an R dataframe from wide to long format with pivot_longer](/assets/images/lesson_05_01.png "Image")
<p class = "fig-caption">Illustration created by the Author</p>

<br>

The `mutate` function makes two adjustments in the new long dataset. First, it eliminates the second part of the year names, e.g., `[YR1960]`. Second, it rounds the expenses values to two decimal places.

<br>

Finally, we change the names of the columns (variables) in our dataset.

<br>

{% include copy.html content = "code-5-2" %}

<div id = "code-5-2">
{% highlight r %}

military_long <- pivot_longer(military, 
                              '1960 [YR1960]':'1991 [YR1991]', 
                              names_to = 'year', 
                              values_to = 'expense') %>%
  mutate(year = substr(year, 1, 4), expense = round(expense, 2))

names(military_long) <- c('country', 'year', 'expense')

{% endhighlight %}

</div>

<br>

<br>

Finally, we can plot the trend of military expenses over time using ggplot. The palette `Set1` will be used in this example. To set it, add the layer `scale_color_brewer(palette = 'Set1')`. **Note** that we also set the x-axis to have labels every 4 years with `scale_x_discrete(breaks = seq(1960, 1990, by=4))`. Color and group aesthetics were mapped to countries so that each country has a different color.

<br>

{% include copy.html content = "code-5-3" %}

<div id = "code-5-3">
{% highlight r %}
ggplot(data = military_long, aes(x = year, y = expense, group = country, color = country))+
  geom_line(size = 1)+
  scale_x_discrete(breaks = seq(1960, 1990, by=4))+
  scale_color_brewer(palette = 'Set1')+
  xlab('Year')+
  ylab('Military expenditure (% of GDP)')+
  ggtitle('Military Expenses of the Main Capitalist Economies',
          subtitle = '1960 - 1991')
{% endhighlight %}

</div>

<br>

![plot using RColorBrewer palette](/assets/images/lesson_05_03.png)

<br>

As mentioned above, scale_color_brewer employs [ColorBrewer](https://colorbrewer2.org/#) palettes. These are originally available from the RColorBrewer package, but are also automatically loaded by ggplot2. However, to see all the color palettes RColorBrewer offers, you will have to install the package and use the code as follows.

<br>

{% include copy.html content = "code-5-4" %}

<div id = "code-5-4">
{% highlight r %}

library(RColorBrewer)

# Displays the colors visually
par(mar=c(3,4,2,2))
display.brewer.all()

# Get information about all available palettes
brewer.pal.info

# Get hexa codes for a specific palette
brewer.pal(n = 8, name = "Dark2")

{% endhighlight %}

</div>

<br>

Below you can explore the available palettes by clicking on the type of your interest:

<br>

<!-- Buttons to filter palettes -->
<div>
  <button class="tag-button" onclick="showPaletteType('diverging')">Diverging</button>
  <button class="tag-button" onclick="showPaletteType('qualitative')">Qualitative</button>
  <button class="tag-button" onclick="showPaletteType('sequential')">Sequential</button>
  <button class="tag-button" onclick="showPaletteType('colorblind')">Keep Only Color Blind Friendly</button>
</div>
<br>
<!-- Container for palette tables -->
<div id="palette-container">
  {% assign grouped_palettes = site.data.color_palettes | group_by: "Type" %}

  {% for group in grouped_palettes %}
    <div class="palette-group" data-type="{{ group.name }}">
      <p><strong>{{ group.name | capitalize }} Palettes</strong></p>
      <br>
      <table style="width: 100%;">
        <tbody>
          {% for row in group.items %}
          <tr {% if row.ColorblindFriendly == "TRUE" %}class="colorblind"{% endif %}>
            <td style="width: 15%; vertical-align: middle;">{{ row.Palette }}</td>
            <td style="width: 85%;">
              {% assign colors = row.Colors | split: ", " %}
              {% for color in colors %}
                <span style="background-color: {{ color }}; padding: 5px; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span>
              {% endfor %}
            </td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
      <br>
    </div>
  {% endfor %}

</div>

<!-- JavaScript to filter palette types -->
<script>
  function showPaletteType(type) {
    var paletteGroups = document.querySelectorAll('.palette-group');
    
    paletteGroups.forEach(function(group) {
      if (type === 'colorblind') {
        var rows = group.querySelectorAll('tr');
        var hasVisibleRow = false;

        rows.forEach(function(row) {
          if (row.classList.contains('colorblind')) {
            row.style.display = 'table-row';
            hasVisibleRow = true;
          } else {
            row.style.display = 'none';
          }
        });

        // Show the group only if it has visible rows
        group.style.display = hasVisibleRow ? 'block' : 'none';

      } else {
        group.style.display = group.getAttribute('data-type') === type ? 'block' : 'none';

        // Ensure all rows are visible in the selected group
        if (group.style.display === 'block') {
          var rows = group.querySelectorAll('tr');
          rows.forEach(function(row) {
            row.style.display = 'table-row';
          });
        }
      }
    });
  }

  // Initially show all palettes
  showPaletteType('diverging');
</script>

<br>

{% include note.html content = 'Note that we chose a qualitative color palette because in our case each color represents a country. Always keep in mind which kind of variable you are mapping the color attribute to.' %}

<br>

<br>



## 4. Adding a theme to the plot

<br>
To customize our plot, we will use the ggplot theme developed in the lesson ['Climate data visualization']({% post_url 2023-01-24-Historical-Weather-Data %}). Small adjustments were made to adapt the theme to this plot. For instance, the legend position was set to be at the bottom of the plot and its title was deleted.

<br>

{% include copy.html content = "code-5-5" %}

<div id = "code-5-5">
{% highlight r %}

ggplot(data = military_long, aes(x = year, y = expense, group = country,color = country))+
geom_line(size = 1)+
scale_x_discrete(breaks = seq(1960, 1990, by=4))+
scale_color_brewer(palette = 'Set1')+
  xlab('Year')+
  ylab('Military expenditure (% of GDP)')+
  ggtitle('Military Expenses of the Main Capitalist Economies',
          subtitle = '1960 - 1991')+
  theme_bw()+
  guides(color = guide_legend(title=''))+
  theme(text=element_text(color = 'white'),
            # Changes panel, plot and legend background to dark gray:
            panel.background = element_rect(fill = '#2E3031'),
            plot.background = element_rect(fill = '#2E3031'),
            legend.background = element_rect(fill='#2E3031'),
            legend.key = element_rect(fill = '#2E3031'),
            # Changes legend texts color to white:
            legend.text =  element_text(color = 'white'),
            legend.title = element_text(color = 'white'),
            # Changes color of plot border to white:
            panel.border = element_rect(color = 'white'),
            # Eliminates grids:
            panel.grid.minor = element_blank(),
            panel.grid.major = element_blank(),
            # Changes color of axis texts to white
            axis.text.x = element_text(color = 'white'),
            axis.text.y = element_text(color = 'white'),
            axis.title.x = element_text(color= 'white'),
            axis.title.y = element_text(color= 'white'),
            # Changes axis ticks color to white
            axis.ticks.y = element_line(color = 'white'),
            axis.ticks.x = element_line(color = 'white'),
            legend.position = "bottom")

{% endhighlight %}

</div>

<br>

![Plot with new theme and color selected with scale_color_brewer](/assets/images/lesson_05_04.png)
{: .larger}

<br>

Feel free to test other color palettes and check the one you like the most! Please, leave your opinion or question below and have a great time coding!

<br>

***
 
<br>

# Conclusions

- `scale_color_brewer` offers an effective and straightforward method to apply a color palette in `ggplot2`;
- Using appropriate color palettes is essential to plot an informing and beautiful visualization.
{: .conclusion-list } 
<br>

***