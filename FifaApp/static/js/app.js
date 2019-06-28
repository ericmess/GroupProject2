

function init() {
    // update dropdown menu
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of years  to populate the select options
     d3.json("/years").then((Years) => {
       Years.forEach((year) => {
            console.log(year);
          selector
            .append("option")
            .text(year)
            .property("value", year);
         });
        });









        
// default text before rendering the charts
        var Text1Select = d3.select("#Chart1Text");
        Text1Select
        .append("h3").text("Text Holder for Chart 1");

        var Text1Select = d3.select("#Chart1Text");
        Text1Select
        .append("h3").text("Text Holder for Chart 2");

        var Text1Select = d3.select("#Chart1Text");
        Text1Select
        .append("h3").text("Text Holder for Chart 3");





    };
    init();