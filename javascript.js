/**
 * Created by Rhett on 10/19/2015.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches =0;
var attempts = 0;
var accuracy = 0;

//trying using event objects.
$( document ).ready(function() {
    $(".back").click(card_clicked);
    $(".back").click(display_stats);
    $(".reset").click(function() {
        games_played++;
        reset_stats();
        display_stats();
    });
    games_played = 0;
    reset_stats();
});

function card_clicked(event) {
    $(this).hide().addClass('card_selected'); //could put $(this).toggleClass('someclass that affects css') instead.
    console.log('event objects worked!');
    if (first_card_clicked == null) {
        first_card_clicked = $(this).prev().find('img').attr('src'); //do I need to  get the image source for the DOM?
    } else {
        second_card_clicked = $(this).prev().find('img').attr('src');

        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            matches++;
            attempts++;
            console.log('match_counter is: ' + match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            $('.card_selected').removeClass('card_selected');
            console.log("class name: "+ this.className);
            if (match_counter === total_possible_matches) {
                alert('You have won!');
                reset_stats();
            } else {
                return console.log('click handler functionality is complete - the first one');
            }
        }
        else {
            console.log('first_card_clicked != second_card_clicked');
            //could put $('.back').toggleClass('someclass that affects css') instead to flip it back.
      //      $(first_card_clicked).sibling().find('img').show();
      //      $(second_card_clicked).sibling().find('img').show();
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('click handler functionality is complete - the second');
            attempts++;
            $('.card_selected').show(2000);
         //   wait = setTimeout(function() {
           //     $('.card_selected').show()
           // }, 2000);
        }
    }
}

function display_stats() {
    $(".games_played .value").text(games_played);
    $('.attempts .value').text(attempts);
    accuracy = Math.round((matches/attempts) * 100);
    if (isNaN(accuracy)) {
        accuracy = 0;
    }
    $('.accuracy .value').text(accuracy + '%');
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
    $('.back').show();
}