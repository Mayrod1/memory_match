//put global variables here
var first_card_clicked = null;  //this variable will point to the element of the
                                // first card clicked in any  given match set
var the_bouncer = true;  //the bouncer is true when cards can be clicked

var total_possible_matches = 9;
var current_matches = null;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function(){
    //console.log('document ready event handler');
    $('.back').click(function(){
        //console.log('back button was clicked: ',this);
       handle_click(this);
    });
    $('.reset').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.back').show();
    })
});


//put functions here
//@purpose: this function will process the click on a card, regardless of if it is a second or first click
//@params: card - the element that was clicked
//@return: none
//@global: first_card_clicked: contains the pointer to the card
//         element that was first clicked in any given set
function handle_click(card){
    if(the_bouncer!=true){
        console.log('card cannot be clicked');
        return;
    }
    console.log('start of function' + window.performance.now());
    //console.log('handle click called on ',card,$(card));
    flip_card_reveal(card);
    if(first_card_clicked==null){
        //this is the first card clicked
        //store the card into a variable for later use
        first_card_clicked= card;
    }
    else {
        //this is the second card clicked
        //check to see if cards match
        var second_card_clicked = card;
        attempts++;



        var first_card_img = $(first_card_clicked).parent().find('.front > img').attr('class');
        //wrapped first_card_clicked element in jquery to now use jquery methods. Went to the parent of
        //that element and in there looked for img element in the an element with the front class
        // and got the attribute class.
        var second_card_img = $(second_card_clicked).parent().find('.front > img').attr('class')
        //console.log("first_card_clicked", $(first_card_clicked).parent());
        //console.log("second_card_clicked", $(second_card_clicked).parent());
        if(first_card_img== second_card_img){
            //console.log('they match');
            first_card_clicked = null;
            current_matches = current_matches +1;
            console.log(current_matches);
            matches++;
            if(current_matches == total_possible_matches){
                setTimeout(function(){
                    document.write('You Won!');
               }, 1500);
            }
            else{}
        }
        else{
            //dan start
            the_bouncer = false;
            console.log('they don\'t match');
            console.log('start of do not match handler'  + window.performance.now());


            setTimeout(function(){
                console.log('cards are being hidden' + window.performance.now());
                flip_card_hide(first_card_clicked);
                flip_card_hide(second_card_clicked);
                first_card_clicked= null;
                the_bouncer = true;
            },2000);
            console.log('cards are reset' + window.performance.now());

            //the code was run down here after a 2 second delay
            //dan end
        }
        display_stats(attempts);
    }
}

//function flip_card_reveal
//@purpose: reveals a card
//@params: card - the card to be revealed
//@return: none
//@global: none
function flip_card_reveal(card){
    console.log('this: ',card);
    $(card).hide()
}

//function flip_card_hide
//@purpose: hide a card
//@params: card - the card to be hidden
//@return: none
//@global: none
function flip_card_hide(card){
    console.log('this: ',card);
    $(card).show()
}
//function display_stats
//@purpose: display various game stats
//@params: none
//@return: none
//@global: none
//  matches = total card matches made
//  attempts = how many attempts have been made
//  accuracy = percentage of cards matched correctly based on attempts
//  games_played = how many games have been played
function display_stats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    if(attempts==0){
        accuracy=0;
    } else {
        accuracy = (Math.floor((matches/attempts) *100));
    }
    $('.accuracy .value').text(accuracy + '%');
}
//function reset_stats
//@purpose: start over
//@params: none
//@return: none
//@global: none
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
}
