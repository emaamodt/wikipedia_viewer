$(document).ready(function() {
  $('#search').on("click", function clickSearchButton() {
    
    //Get value from search text box
    var searchVal = $('#searchInput').val();

    //Replace any whitespace 
    var searchStr = searchVal.replace(" ", "+");
    
    //Build the url to grab JSON from the wikipedia API
    var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchStr + "&callback=?";
    
      $.getJSON(wikiUrl, function getSearchResults(json) {

        var pages = json.query.pages;
        var html = " ";
        
        html += "<div class='list-group'>";
        
        //Loop through each page returned in the JSON
        Object.keys(pages).forEach(function getPageLinks(key) {
          //For each item in the array of pages, create a link
          html += "<a href='http://en.wikipedia.org/?curid=" + key + "' class='list-group-item' target='_blank'>";
          
          //Loop through each page array
          Object.keys(pages[key]).forEach(function getTitleAndExtract(key2) {
            //Display the titles as headers
            if (key2 === "title") {
              html += "<h3 class='list-group-item-heading'>" + pages[key][key2] + "</h3>" 
            }
            //Display the extracts as paragraphs
            else if (key2 === "extract") {
              html += "<p class='list-group-item-text'>" + pages[key][key2] + "</p>" 
            };
          }); //End loop through pages function
         
          html += "</a>"
        }); //End loop through JSON function
        
        html += "</div>";

        $('#results').html(html);
      }); //End getJSON function
  }); //End search onClick function
  
  //When the user hits the "enter" key, treat it the same as clicking the "search" button
  $('#searchInput').keypress(function clickEnterKey(e){
    if(e.which === 13){
      $('#search').click();
    }
  });
});