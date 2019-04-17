# Life Expectancy (WHO)
------------------------

### Milestone Project 2: Interactive Frontend Development


In this project i used data from The World Health Board which was open sourced from the website [Kaggle](https://www.kaggle.com/kumarajarshi/life-expectancy-who). The data which is collected from the year 2015 measures different factors to quantify the different levels of the standard of living. I've categorised it so that i can illustrate to the audience by visualisation a comparision of 2 representations. **Developed** Countries and **Developing** Countries.

## UX

I built this visualisation for the purpose to give an insight to those that are interested to see how countries individually and collectively sub-categorised into "Developed" and "Developing" countries compare in factors like life longeavity, figures on death to those in the 16-65 age group bracket, and years of schooling. I see that this data visualisation is aimed for a specific type of group of people. What i mean is, in probability terms you are not going to get a high audience going out of there way to find this information. It will generally be interesting to people who might want to use what information they see for decision making in a future health program, or for those who want evidence that education will prosper in peoples lives, from gdp to indirectly a longer healthier life. From these factors, among many others you can see consistent correlations between the richer nations to those that are developing.

Objectives:

  - A brief explanation to the audience to the location of where the data was extracted from and a brief outlay of what data it consists of.
  - A simple representation in a visual format the amount of countries thats categorised as Developed to that of Developing in the form of a pie chart
  - Then i want to illustrate life longeavity comparisions displayed as a bar chart
  - To illustrate/quantify using another bar graph, mortality rates in the working age bracket. These could be factors like murder, health, suicide etc
  - I want to illustrate with a scatter plot the correlation between life longeavity and the yrs of education. I could of easily used other factors like GDP and life longeavity but wanted to factor in something different but has some substance and meaning behind it. 

Before i started this project, i built a wireframe to have a platform to build the site. The wireframe was built using free source software from Pencil. 

Inline-style: 

![alt text](https://github.com/aledgriffiths79/Data_Visualisation_Project2/blob/master/Screenshot%20(332).png "Data Visualisation wireframe") 

## Features

The project has 5 parts to it and in those 5 parts it allows user participation:

- I have added a select menu. Hear you can leave it as it is and have a visualisation of Developed and Developing countries (which i will refer to on this page as **Status**) collectively, or you can scroll down the select menu with a choice of many countries to choose from with data output as per described on the y and x axis
- The pie chart displays the categorised country status, if you press either one you will see the changes in the other visualisations (bar chart, scatter plot as its crossfiltered). Also as all the visualisation is crossfiltered if you select any country in the select menu it will display in the bar chart what status that country is categorised as.
- The first bar chart displays life expectancy for either any country that is displayed in the select menu or colectively (status)
- Second bar chart displays adult mortality per 1000
- The scatter plot displays a correlation of education and how long you live. The circle dots are colored to represent what status they are and the name of the country is displayed when you hover over any dot

### Features Left To Implement

I may add a line graph in future to display the correlation if any on Total Expenditure on health as a % to overall spending, to the amount of Aids in that country.

## Technologies Used

+ [HTML5](https://www.w3.org/TR/2017/REC-html52-20171214/)
  + Used to construct the basic site structure.
+ [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
  + Provides styling for the page and all content.
+ [Bootswatch](https://bootswatch.com/)
  + It provides themes to websites
+ [JavaScript](https://www.javascript.com/)
  + Enables the vast majority of site interactivity
+ [D3.js](https://d3js.org/)
  + Visualisation framework for rendering all animations and the backbone of the Dashboard charts.
+ [Dimensional Charting(Dc.js)](https://github.com/dc-js/dc.js)
  + Library using D3.js to create charts that allow highly efficient exploration on large, multi-dimensional datasets.

## Testing

For testing, i looked into using jasmine, however jasmine is not used so frequently compared to manual testing for d3 data visualisation. Therefore i find a simple approach the most effective, and that is to visually see the differences when i click on the dropdown menu and go through all the countries listed and see the changes in the bar graphs, pie chart and scatter plot. I then checked when i refresh the page that all the data goes back to represent the Statuses collectively. I also cross referenced what was displayed on the site to values in the data file.

In the testing process i did come up with a bug. When i scroll through the dropdown menu i randomly pick a country, and the pie chart, bar graphs and scatter plot work great but after selecting a few countries the pie chart displays the color black on "Developing" countries and stays that color for every Developing country thereafter. Whereas when you pick a "Developed" country it does represent the correct color. I then looked at my graph.js file and there is no mention in the code of color black. I will ask my mentor for advice.
On Microsoft Edge browser i have the same issue with the pie chart but the color of the "Developing" status is white. And the Developing status dots color on the Scatter Plot displays black. Everything else works.

Finally these charts use D3.js, and d3.js is not mobile responsive. D3.js is designed for desktop or large-screen viewing.

### Browser Compatibility

I tested the site to be sure that it rendered consistently on 2 browsers. This included:

  + Ensuring all elements are responsive and that all content is legible.
  + Site was test-rendered using:
      + Chrome (Versions 67 – 70)
      + MS Edge (Version 42.17134.1.0)

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.

To run locally, you can clone this repository directly into the editor of your choice by pasting <code> git clone </code> <code> https://github.com/aledgriffiths79/Data_Visualisation_Project2.git </code> into your terminal. To cut ties with this GitHub repository, type **git remote rm origin** into the terminal.

The repository can be found here:

Repo: https://github.com/aledgriffiths79/data_visualisation_trial

The site has been deployed using GitHub Pages and is available to visit here:

[Project Website](https://aledgriffiths79.github.io/data_visualisation_trial/)

## Credits

### Content

The World Health Organisation Country Data and text content was copied/amended from the following site:
  + [Kaggle](https://www.kaggle.com/kumarajarshi/life-expectancy-who)

### Media

  No media/photos are used on this site

### Acknowledgements

I received inspiration for this project from the video tutorials that **Code Institute** provided in data visualisation.

I also did extra reading before attempting this project on d3.js through a uldemy course provided by **Luis Ramirez Jr**. 

Finally to my **Mentor** for his guidance through the project.













