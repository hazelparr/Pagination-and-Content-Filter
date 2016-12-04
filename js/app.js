
var $studentsList = $(".student-list").children(); //Get all students

var studentsPerPage = 10; // number of students shown per page


$($studentsList).slice(studentsPerPage, $studentsList.length).hide();


function paginate() {
    //Dynamically add div with pagination class to hold pagination buttons
    var $div = $("<div></div>").addClass("pagination");
    $(".student-list").append($div);

    //Add unordered list to div
    var $ul = $("<ul></ul>");
    $div.append($ul); 

    //Determine the number of buttons and pages to add
    var numberOfPages = Math.ceil( $studentsList.length / studentsPerPage);
    console.log(numberOfPages);
    
    // Add list items to hold buttons and their anchor tags
    for (var i=0; i < (numberOfPages); i++){
        var $li = $("<li></li>").addClass("pageLinks");
        $ul.append($li);
        var $a = $("<a></a>").attr("href", "#").text(i + 1);
        $li.append($a);
    
    //Set first page to active
    $("li a:first").addClass("active");
    }
}
 
paginate();


//Shows the correct student list when button link is clicked
$(".pageLinks").on("click", function() {
    
    $pageClicked = ($(this).index());
    $(".pageLinks a").removeClass("active");
    $(this).children().addClass("active");
    console.log($pageClicked);

    //Resets the default students shown on load
    $studentsList.hide();

    //determines which students to show depending on the page number clicked
    start = $pageClicked * studentsPerPage;
    end = start + studentsPerPage;
    console.log(start, end);
    $currentlyShown = $($studentsList).slice(start, end);
    $currentlyShown.show();
});


function searchButton() {
    
    //Dynamically adds search button 
    $searchdiv = $("<div></div>").addClass("student-search");
    $("h2").after($searchdiv);
    
    //Adding input box
    $input = $("<input></input>").attr("placeholder","Search for students").addClass("search-box");
    $(".student-search").append($input);
    
    //Adding button
    $button = $("<button></button>").text("Search");
    $(".student-search").append($button);
}

searchButton();

//Adding an attribute to compare with search results
$('.student-details h3').each(function(){
$(this).parent().parent().attr('data-search-term', $(this).text().toLowerCase());
});


$("button").on("click", function(){
    //Gets the search text in the input box when button is clicked
    var $search = $("input[class=search-box]").val().toLowerCase();
    
    //resetting list, pagination from previous searches or when doc loaded
    $(".student-list li").removeClass("search-result");
    $studentsList.hide();
    $(".pageLinks").hide();
    $(".no-result").remove();

    //Search filter comparing the search against student names
    $('.student-item').each(function(){
        if ($(this).filter('[data-search-term *= ' + $search + ']').length > 0 || $search.length === 0) {
            $(this).addClass("search-result");
        } else {
            $(this).removeClass("search-result");
        }
    });


    //Store the search results
    var $showSearch = $(".search-result");
    console.log($showSearch.length);
    
    

    //Tests length of search to determine how many links to display or to show a message for no results
    if ($showSearch.length === 0) {
        //Displays message if no search results found
        var $noresult = $("<h3>Sorry, no match found.</h3>").addClass("no-result");
        $(".page").append($noresult);
    } else if ($showSearch.length > 10) {
         //Paginates if search results is more than 10
        $showSearch.show();
        $studentsList = $showSearch;
        $($studentsList).slice(studentsPerPage, $studentsList.length).hide();
        links = Math.ceil($studentsList.length / 10);
        $(".pageLinks:nth-child(-n+" + links + ")").show();
        $(".pageLinks a").removeClass("active");
        $("li a:first").addClass("active");
    } else {
        //No pagination
        $showSearch.show();
    }
});









