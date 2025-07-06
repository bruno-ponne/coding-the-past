---
layout: post
author: Bruno Ponne
title: From R to Tableau - Leverage Both Tools for Effective Dashboards
attributes:
  - e: Easy
  - e: R
  - e: 5 min
tags: r tableau digitalhumanities
image: lesson_28.jpg
abstract: Explore how to combine R and Tableau to visualize data about the victims of the Chilean dictatorship.
objectives:
  - o: Use the pinochet R package to analyze data.
  - o: Create and publish visualizations using Tableau Public.
  - o: Compare the strengths of R and Tableau for dashboard creation.
keywords: r, tableau vs r, data visualization, digital humanities
description: Tableau vs R - Explore how to use the pinochet R package and Tableau Public to visualize data about the Chilean dictatorship. Discover the strengths and limitations of R and Tableau for building dashboards.
sd: False
last_modified_at: 05-Jul-25
---


<br>

*When the violence causes silence, we must be mistaken.*

Zombie, The Cranberries (1994)

<br>

Data analysis can be more than quarterly KPIs or complicated statistical models — it can help us remember and critically retell our past. While Latin America is often viewed as a peaceful region, the second half of the 20th century saw several brutal authoritarian regimes. [Chile’s dictatorship (1973‑1990)](https://en.wikipedia.org/wiki/Military_dictatorship_of_Chile) was among the most violent.

<br>

In this post, I show how I used an R package to obtain data about the victims of Chile’s dictatorship and visualize it in Tableau Public. You’ll also discover the strengths and limitations of each tool for dashboard creation.

<br>

## 1. The pinochet Package

Developed by [Professor Danilo Freire](https://danilofreire.github.io/dist/index.html) and colleagues, [the `pinochet` R package](https://cran.r-project.org/web/packages/pinochet/vignettes/pinochet.html) provides clean and tidy data on victims of the Chilean dictatorship. Each row in the dataset represents one individual.

<br>

{% include copy.html content = "code-28-1" %}

<div id = "code-28-1">
{% highlight r %}
install.packages("pinochet")

library(pinochet)

data(pinochet)  # loads the data in a data frame called pinochet

str(pinochet)   # explores the structure of the data frame


{% endhighlight %}

</div>

<br>


R excels at complex tasks — such as causal inference and statistical analyses — and it is equally powerful (and free) for data exploration and interactivity. With [Shiny](https://shiny.posit.co/), you can build attractive dashboards entirely in R. However, mastering Shiny and producing polished interactive visuals with libraries like [Plotly](https://plotly.com/) can take significant time and practice.

<br>

In this context, [Tableau Public](https://public.tableau.com/app/discover) is an appealing option. It is the free edition of Tableau, designed for exploring public datasets and building engaging dashboards, while you learn. Tableau is a drag-and-drop tool that lets you create visualizations without writing code. As noted earlier, it is less versatile than R, but it is also easier to learn and use. In just a few hours, you can build beautiful exploratory dashboards using drag-and-drop alone. That’s why I chose Tableau to visualize this data. To bring the dataset into Tableau, I saved it as an Excel (.xlsx) file.

<br>

{% include copy.html content = "code-28-2" %}

<div id = "code-28-2">
{% highlight r %}
library(writexl)

write_xlsx(pinochet, "pinochet.xlsx")

{% endhighlight %}

</div>

<br>


## 2. Tableau Public

[Tableau Public](https://public.tableau.com/app/discover) is a free, public platform for exploring, creating, and sharing data visualizations. It offers a more limited version of the well-known data visualization tool, Tableau.

<br>

Tableau, like [ggplot2](https://ggplot2-book.org/), has its roots in the [Grammar of Graphics](https://data.europa.eu/apps/data-visualisation-guide/foundation-of-the-grammar-of-graphics), a framework for understanding and creating visualizations. Within this framework, a plot is built by mapping data variables to visual aesthetics. In Tableau, this mapping is accomplished through drag-and-drop: you literally place fields onto the X-axis, Y-axis, Color shelf, and so on.

<br>

![Mapping variables to visual elements of a plot in Tableau. ](/assets/images/lesson_28_01.jpg)

<br>

In contrast, `ggplot2` mappings happen through code:

<br>

{% include copy.html content = "code-28-3" %}

<div id = "code-28-3">
{% highlight r %}

ggplot(data = df, aes(x = x, y = y, color = gender)) + geom_point()

{% endhighlight %}

</div>

<br>

You can download Tableau Public Desktop in the official Tableau webpage. When you open it, you can easily load the Excel file you saved from R by selecting a connection to Microsoft Excel or Text File (if you prefer to save it as a .csv)

<br>

![Connecting to data in Tableau Public.](/assets/images/lesson_28_02.jpg)

<br>

Please, check out this [tutorial](https://data.europa.eu/apps/data-visualisation-guide/grammar-of-graphics-in-practice-tableau#tableau-online) to learn more about Tableau Public. You can also download my [Tableau workbook](https://public.tableau.com/views/DitaduraChilena/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link), that contains the dashboard, and check out how I created the full dashboard. Don’t forget to leave a star if you enjoy it! 🙂

<br>

![The Dashboard Overview](/assets/images/lesson_28_03.gif)

<br>

## 3. The Dashboard and Key Insights

### 3.1 The Dashboard

The dashboard is organized into four interactive sections:

<br>

**1. Tough Years**  
  A bar chart of victims per year.  
  *Tip: Scrub over the bars to filter by year.*

<br>

**2. Occupation & Place of Disappearance**  
  Treemap and map views.  
  *Tip: Click an occupation to highlight where those victims disappeared.*

<br>

**3. An Exploratory Memorial**  
  One star per confirmed victim.  
  *Tip: Hover to read personal details.*

<br>

**4. Age & Gender**  
  Histogram split by gender.  
  *Tip: Hover bars to see counts; toggle genders in the legend.*

<br>

### 3.2 Key Insights

Here are some insights from the dashboard:

<br>

**1973 was the deadliest year**, with ~1,230 victims during the coup.

<br>

![Victims over the years.](/assets/images/lesson_28_04.png)

<br>

**Blue-collar workers** made up almost half the victims, revealing a class dimension of state violence.

<br>

**Students** (university and school) accounted for nearly 13% of the disappeared — a stark cost of activism.

<br>

![Victims by Occupation. ](/assets/images/lesson_28_05.png)

<br>


**96% of the victims were male**, but the women’s stories reveal deep family traumas.

<br>

**Most victims were between 20–30 years old** — showing how youth were disproportionately targeted.

<br>

![Victims by age and gender. ](/assets/images/lesson_28_06.png)

<br>

**No place was safe** — from Santiago to remote mining towns, disappearances happened everywhere.

<br>

![Map showing where victims disappeared. ](/assets/images/lesson_28_07.png)

<br>

## 4. Conclusions and Limitations

Tableau is a user-friendly tool for creating visual dashboards — especially good for quick exploration and sharing. It supports traditional charts and maps, and its drag‑and‑drop interface is great for beginners.


<br>

However, it has limitations. It lacks advanced statistical tools and doesn’t support robust preprocessing or modeling tasks. That’s where R truly shines.


<br>

Used together, R and Tableau offer a powerful combo for data-driven storytelling.


<br>

**Data Source:** Freire, D., Mingardi, L., & McDonnell, R. (2019). *pinochet: Data About the Victims of the Pinochet Regime, 1973–1990*

<br>

[**Link to Tableau Public Dashboard**](https://public.tableau.com/views/DitaduraChilena/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link)

<br>

---

<br>

What other historical datasets would you like to see visualized? Share your ideas in the comments below!
