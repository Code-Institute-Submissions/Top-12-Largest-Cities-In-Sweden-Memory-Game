$(document).ready(function () {

    //Created an array with the 12 sets of cards
    let img = [
        'assets/images/1_Stockholm.jpg',
        'assets/images/2_Gothenburg.jpg',
        'assets/images/3_Malmo.jpg',
        'assets/images/4_Uppsala.jpg',
        'assets/images/5_Upplands_Vasby.jpg',
        'assets/images/6_Vasteras.jpg',
        'assets/images/7_Orebro.jpg',
        'assets/images/8_Linkoping.jpg',
        'assets/images/9_Helsingborg.jpg',
        'assets/images/10_Jonkoping.jpg',
        'assets/images/11_Norrkoping.jpg',
        'assets/images/12_Lund.jpg'
    ]


    //Decleared the default move
    let total = 0,
        move = 0,
        count = 1,
        first_card = null,
        secn_card = null;


    //Decleared the default time setting
    let stop_fa = false,
        stop_fc = true,
        stop_time = true;


    //Decleared the card, board, start and play-again.
    let $card = $('.card'),
        $board = $('.board'),
        $start = $('.start'),
        $again = $('.again');



    //3*8 card group;
    let card_id = 0
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 8; j++) {
            $('.room').append('	<div class="card" data-id="' + card_id + '"><div class="front face"></div><div  data-bid="0" class="back face" ></div></div>')
            card_id++;
        }
        $('.room').append('<br>')
    }


    //Decleared the start button function.
    $start.click(function () {
        total = 0;
        stop_fa = true;
        stop_fc = false;
        stop_time = false;
        $('.card').removeClass('flip');
        $start.hide();
        randomIMG();
    })


    //Decleared the play again button function.
    $again.click(function () {
        stop_fa = false;
        stop_fc = true;
        $start.show();
        $board.hide();
        $('.card').removeClass('fliped');
        randomIMG();
        flip_auto();
        flip_auto();
    })

    //Board hide function.
    $board.hide();
    randomIMG();
    flip_auto();
    flip_auto();
    flip_auto();
    flip_click();


    // $('.card').addClass('fliped');
    function randomIMG() {

        let c_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
        let c_length = c_array.length;
        let $card = $('.card');


        $card.each(function () {
            let r_id = Math.floor(Math.random() * (c_length - 1)); // Get Random Number 


            let temp = c_array[r_id]; //Swaping
            c_array[r_id] = c_array[c_length - 1];
            c_array[c_length - 1] = temp;


            c_length-- // decrement c_length by 1

            $(this).find('.back').css({ // Set css
                'background-image': 'url(' + img[temp - 1] + ')',
                'background-repeat': 'no-repeat',
                'background-size': '100%'
            })

            $(this).find('.back').attr('data-bid', temp) // Set data attribute
        })

        return 0;
    }



});