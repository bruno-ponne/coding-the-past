---
layout: post_minimal
title: Exploring the MET API with Python - Francisco Goya's Artworks
tags: python digitalhumanities
image: lesson_31.jpg
abstract: Learn how to use Python to access the Metropolitan Museum of Art (MET) API and explore Francisco Goya's artworks.
keywords: met api python, json to pandas dataframe, python art history, data science humanities, francisco goya, data visualization python, python requests
description: Discover how to retrieve data from the MET API using Python. Convert complex JSON data into pandas DataFrames and create a visualization of the most frequent terms in Francisco Goya's artwork tags.
last_modified_at: 16-Apr-26
---


*The act of painting is about one heart telling another heart where he found salvation.*

— Francisco Goya

<br>

Francisco Goya is one of my favorite artists. His work has a beautiful darkness that tells a lot about his experience in his time. In this post, we’ll dive into his world using the Metropolitan Museum of Art (MET) application programming interface (API), which gives developers access to data on hundreds of thousands of artworks.

<br>

You will learn how to interact with the MET API using Python. We will journey through the process of making HTTP requests, parsing the returned JSON data into a structured `pandas` DataFrame, and exploring the collection to extract meaningful insights about Goya's work.

<br>

## 1. Requesting data from the API

<br>

We begin by importing the `requests` library, which allows us to send HTTP requests to the MET REST API in Python. We'll query the `search` endpoint to find Goya's paintings. In API terms, an endpoint is a specific URL used to access a particular resource.

<br>

The MET API has four endpoints starting with "https://collectionapi.metmuseum.org/":
- GET /public/collection/v1/objects returns a listing of all valid `objectID` available to use.
- GET /public/collection/v1/objects/[objectID] returns a record for an object, containing all open access data about that object, including its image (if the image is available under Open Access).
- GET /public/collection/v1/departments returns a listing of all departments of the museum.
- GET /public/collection/v1/search returns a listing of all `objectID` for objects that match the search query.
{: .conclusion-list }

<br>

You can find more details about each endpoint and its functionality in the [official MET API documentation](https://metmuseum.github.io/).


{% include note-minimal.html content = 'A REST (Representational State Transfer) API is a set of rules used to communicate between your computer and the MET server using HTTP methods and endpoints. Note that many APIs require authentication; however, the MET API is public and does not require an API key.'  %}

<br>

{% include copy.html content = "code-31-1" %}

<div id = "code-31-1">
{% highlight python %}

import requests
import pandas as pd

search_query = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Francisco Goya"

response = requests.get(search_query)
search_data = response.json()

print(f"Found {search_data['total']} artworks for Francisco Goya.")

{% endhighlight %}
</div>

<br>

API endpoints can be followed by query parameters that refine our search. In the example above, `hasImages=true` filters for objects with images, and `q` specifies our search term—in this case, the artist's name.

<br>

The `requests` library contains a method called `get()`, which we use to send our request to the API, passing our endpoint saved in the string `search_query`.

<br>

The resulting `response` object can then be parsed into a JSON structure using the `.json()` method.

<br>

## 2. Converting JSON to a list of painting ids

<br>

While JSON is the standard for data exchange, working with raw JSON can be cumbersome for direct data analysis. In Python, you can think of JSON as a dictionary of keys and values. These values can themselves be other dictionaries, lists, numbers, strings, or booleans. By printing the `search_data` object, we can see that it's a dictionary containing two main keys:
- **total**: An integer representing the total number of objects returned.
- **objectIDs**: A list containing the unique IDs of the artworks matching our search.
{: .conclusion-list }

<br>

To retrieve the list of IDs associated with the key "objectIDs" we use the standard dictionary notation `search_data["objectIDs"]` and save it to the variable `goya_ids`.

<br>

{% include copy.html content = "code-31-2" %}
<div id = "code-31-2">
{% highlight python %}

print(search_data)
goya_ids = search_data["objectIDs"]

{% endhighlight %}
</div>

<br>


## 3. Getting the details of each of Goya's works

<br>

To retrieve details for each artwork — such as its title, date, and thematic tags — we need to iterate through the list of IDs and send a request to the `/objects/{objectID}` endpoint for each item. We implement this using a for loop that repeats the request for each artwork.

<br>

*(Note: Depending on the number of results, fetching these details can take a few minutes. We use `time.sleep(1)` to respect the API's rate limits and avoid being blocked.)*

<br>

{% include copy.html content = "code-31-3" %}

<div id = "code-31-3">
{% highlight python %}

import time

all_objects_data = []


for object_id in goya_ids:
    try:
        obj_response = requests.get(f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}")
        obj_response.raise_for_status() 
        all_objects_data.append(obj_response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error for object ID {object_id}: {e}")
    
    time.sleep(1) # Respect the API, one request per second to be safe

# Convert the gathered data to a DataFrame
goya_df = pd.json_normalize(all_objects_data)

# Filter only Goya works
goya_df = goya_df[goya_df['artistDisplayName'].str.contains('Goya', na=False)]

{% endhighlight %}
</div>

<br>

We use a `try-except` block to ensure the loop continues even if a specific object ID fails to load. We also log any errors to help with debugging.

<br>

Finally, we convert the collected data into a Pandas DataFrame using `pd.json_normalize`. Since a broad search might return works *about* Goya or mentioning him in metadata, we filter the DataFrame to ensure the `artistDisplayName` actually contains "Goya."

<br>

The resulting DataFrame contains intriguing data about each of his works, including name, year when the painting or drawing was started and finished, descriptive tags and dimensions, among other information. Feel free to explore it. We will continue working with the descriptive tags in the next steps.

<br>

## 4. Flattening nested JSON data

<br>

For keys whose values are lists or other dictionaries, the resulting columns will contain those respective objects. This happens, for example, with the `tags` column. When you have nested elements like this, you can "flatten" them into a tabular format.

<br>


<div class="new-image">
  <div class="card">
    <img src="/assets/images/lesson_31_01.png" 
         alt="JSON structure" 
         style="max-width:100%; height:auto; display:block; margin:0 auto;">
    <p style="text-align: center; font-size: 0.7em; color: grey;">JSON data structure</p>
  </div>
</div>

<br>

Flattening an element changes the granularity of the data. Whereas before each row represented a single artwork, in the flattened table each row represents an individual tag belonging to one artwork.

<br>

To flatten these nested tags, we can use `json_normalize` by specifying the element to unnest in the `record_path`. We also include the `objectID` in the `meta` parameter so we don't lose the relationship between a tag and its original artwork. Later on, we can join this tags table back to our main DataFrame if we want.

<br>

{% include copy.html content = "code-31-4" %}

<div id = "code-31-4">
{% highlight python %}

tags_df = pd.json_normalize(
    all_objects_data,
    record_path='tags',
    meta=['objectID']
)

{% endhighlight %}
</div>


<br>

## 5. Visualizing the most frequent themes

<br>

The MET API provides a `tags` field containing descriptive terms associated with each artwork. To understand the prevailing themes in Goya's works — famous for documenting the social upheaval and dark realities of his era — we can extract these terms and calculate their frequency.

<br>

Once we isolate the individual tags into a new column, we can use `matplotlib` to create a horizontal bar plot of the top 10 terms and check if indeed his artwork contained themes related to death and misery.

<br>

{% include copy.html content = "code-1-5" %}
<div id = "code-1-5">
{% highlight python %}

import matplotlib.pyplot as plt

# Calculate the frequency of each term for the filtered Goya artworks
# We filter tags_df to only include IDs present in our filtered goya_df
term_frequency = tags_df[tags_df['objectID'].isin(goya_df['objectID'])]['term'].value_counts().reset_index()
term_frequency.columns = ['term', 'count']

# Select the top N terms for better readability if there are many unique terms
# For this example, let's take the top 10 terms
top_terms = term_frequency.head(10).sort_values(by='count', ascending=True)

plt.figure(figsize=(12, 8))
plt.barh(top_terms['term'], top_terms['count'], color='#FF6885')

plt.title('Top 10 Most Frequent Terms in Goya Dataset', fontsize=20)
plt.xlabel('Frequency', fontsize=16)
plt.ylabel('Term', fontsize=16)
plt.xticks(fontsize=14)
plt.yticks(fontsize=14)
plt.tight_layout()
plt.show()

{% endhighlight %}
</div>

<br>

<div class="new-image">
  <div class="card">
    <img src="/assets/images/lesson_31_02.png" 
         alt="Top 10 Most Frequent Terms in Goya Dataset" 
         style="max-width:100%; height:auto; display:block; margin:0 auto;">
    <p style="text-align: center; font-size: 0.7em; color: grey;">Top 10 Most Frequent Terms chart</p>
  </div>
</div>

<br>

The resulting visualization provides a fascinating window into Goya’s thematic world. Beyond common subjects like "Men," "Women," and "Portraits," we see a strong representation of "Bulls" (reflecting his famous *Tauromaquia* series) and "Self-portraits."

<br>

Most strikingly, terms like "Death" and "Suffering" appear prominently in the top 10. This data-driven insight confirms Goya’s historical reputation as an artist who didn't shy away from the darker aspects of the human experience. By quantifying these themes through the MET API, we move from subjective observation to empirical evidence of his artistic focus.

<br>

<div class="new-image">
  <div class="card">
    <img src="/assets/images/lesson_31_03.jpg" 
         alt="The sleep of reason produces monsters" 
         style="max-width:100%; height:auto; display:block; margin:0 auto;">
    <p style="text-align: center; font-size: 0.7em; color: grey;">Plate 43 from "Los Caprichos": The sleep of reason produces monsters (El sueño de la razon produce monstruos)</p>
  </div>
</div>

<br>

You could also use the main dataset we created to collect a series of images of Goya works. I am thinking of using AI to help me download all images of Goya in the public domain and try to build a model to describe or classify them in Python. Feel free to use the data and let me know about your analysis. Leave your comments or any questions below and happy coding!
 
<br>

# Conclusions

<br>

- The `requests` library combined with `pd.json_normalize` makes extracting and structuring data from web APIs both seamless and efficient.
- Navigating public collections like the MET API enables us to perform large-scale data analysis on historical and cultural artifacts.
- Combining data extraction with clear visualizations (using Matplotlib) provides interpretable insights into an artist’s thematic legacy and creative focus.
{: .conclusion-list }

<br>

***