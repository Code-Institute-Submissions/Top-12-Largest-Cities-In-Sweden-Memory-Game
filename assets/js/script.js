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


    //Card flip on-click function
    function flip_click() {
        total = 0;
        move = 0;
        count = 1;
        let i = 0
        first_card = null;
        secn_card = null;
        let $card = $('.card');



        $card.find('.front').click(function () {

            if (stop_fc == true) {
                return 0;
            }


            $(this).parent('.card').toggleClass('flip');
            move++;
            $('.c_move').html(move);

            if (count == 1) {
                first_card = $(this).parent('.card').find('.back').attr('data-bid');
            } else if (count == 2) {
                secn_card = $(this).parent('.card').find('.back').attr('data-bid');
            }


            if (first_card == secn_card) {

                $('[data-bid="' + first_card + '"]').parent('.card').addClass('fliped')
                total++;
                if (total == 12) {

                    stop_time = true;


                    let sec_f = pad(++sec % 60),
                        min_f = pad(parseInt(sec / 60, 10));
                    stop_fc = reset(move, sec_f, min_f);
                    stop_fc = true;
                    move = 0;
                }

            }
            if (stop_fc) {
                return
            }
            count++
            if (count > 2) {
                first_card = null;
                secn_card = null;
                count = 1;
                setTimeout(function () {
                    $card.removeClass('flip');

                }, 400)
            }
        });


        //Timer function
        let sec = 0;

        function pad(val) {
            return val > 9 ? val : "0" + val;
        }
        setInterval(function () {
            if (stop_time) {
                sec = 0
                return
            }
            $(".sec").html(pad(++sec % 60));
            $(".min").html(pad(parseInt(sec / 60, 10)));
        }, 1000);

    }

    
    //Auto-Flip function
    function flip_auto(time) {

        setTimeout(function () {
            if (stop_fa) {
                return;
            }

            let r_ran = randomNum(1, 24)
            $('[data-id="' + r_ran + '"]').toggleClass('flip')

            let newTime = randomNum(500, 1000);
            flip_auto(newTime)
        }, time)
    }






});