# Life Expectancy (WHO)
-----

### Milestone project - Interactive Frontend Development


In this project i used data from The World Health Board which was open sourced from the website Kaggle. The link to the data is here. The data which is collected from the year 2015 measures different factors to quantify the different levels of the standard of living. Ive categorised it so that i can illustrate to the audience by visualisation a comparision of 2 representations. Developed Countries and Developing Countries.

## UX

I built this visualisation for the purpose to give an insight to those that are interested to see how countries individually and collectively sub-categorised into "Developed" and "Developing" countries compare in factors like life longeavity, figures on death to those in the 16-65 age group bracket, and years of schooling. I see that this data visualisation is aimed for a specific type of group of people. What i mean is, in probability terms you are not going to get a high audience going out of there way to find this information. It will generally be interesting to people who might want to use what information they see for decision making in a future health program, or for those who want evidence that education will prosper in peoples lives, from gdp to indirectly a longer healthier life. From these factors, among many others you can see consistent correlations between the richer nations to those that are developing.

Objectives:

  - A brief explanation to the audience to the location of where the data was extracted from and a brief outlay of what data it consists of.
  - A simple representation in a visual format the amount of countries thats categorised as Developed to that of Developing in the form of a pie chart
  - Then i want to illustrate life longeavity comaprisions displayed as a bar chart
  - To illustrate/quantify using another bar graph, mortality rates in the working age bracket. These could be factors like murder, health, suicide etc
  - I want to illustrate with a scatter plot the correlation between life longeavity and the yrs of education. I could of easily used other factors like GDP and life longeavity but wanted to factor in something different but has some substance and meaning behind it. 

Before i started this project, which is fundamental for any project you do, is construct a wireframe to have a direction to go at in building this data visualisation. Click here for my wireframe.

## Features

The project has 5 parts to it and in those 5 parts it allows user participation:

- I have added a select menu. Hear you can leave it as it is and have a visualisation of Developed and Developing countries (which i will refer to on this page as "Status")collectively, or you can scroll down the select menu with a multiple amount of countries you can choose from with data output as per described on the y and x axis
- The pie chart displays the categorised country status, if you press either one as its crossfiltered you will see the changes in the other visualisations (bar chart, scatter plot). Also as all the visualisation is crossfiltered if you select any country in the select menu it will display in the bar chart what status that country is categorised as.
- The first bar chart displays life expectancy for either any country that is displayed in the select menu or colectively (status)
- Second bar chart displays adult mortality per 1000
- The scatter plot displays a correlation of education and how long you live. The circle dots are colored to represent what status they are and the name of the country is displayed when you hover over any dot

### Features Left To Implement

I may add a line graph in future to display the correlation if any on Total Expenditure on health as a % to overall spending to that of the amount of Aids in that country.

## Technologies Used

+ [HTML5](https://www.w3.org/TR/2017/REC-html52-20171214/)
++ Used to construct the basic site structure.
+ [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- Provides styling for the page and all content.
+ [Bootswatch](https://bootswatch.com/)
+ [Font_Awesome(4.7.0)](https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css)]
+ [JavaScript](https://www.javascript.com/)
[D3.js](https://d3js.org/)
- Visualisation framework for rendering all animations and the backbone of the Dashboard charts.
[Dimensional Charting(Dc.js)](https://github.com/dc-js/dc.js)
- Library using D3.js to create charts that allow highly efficient exploration on large, multi-dimensional datasets.
[queue](https://github.com/d3/d3-queue)
















































