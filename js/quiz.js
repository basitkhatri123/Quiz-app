var oQuesAns = {
    1: {
        'question': '1. Urdu was declared national language of Pakistan in:',
        'a': 'April 1950',
        'b': 'April 1955',
        'c': 'April 1954',
        'd': 'April 1952',
        'ans': 'c'
    },
    2: {
        'question': '2. Pakistan lies between the latitudes of 24 degree to:',
        'a': '36.75 degree North',
        'b': '36.75 degree East',
        'c': '36.75 degree West',
        'd': '36.75 degree South',
        'ans': 'a'
    },
    3: {
        'question': '3. With which country, Pakistan share 2,430 km long border',
        'a': 'India',
        'b': 'Iran',
        'c': 'Afghanistan',
        'd': 'China',
        'ans': 'c'
    },
    4: {
        'question': '4. Which peak is located in Karakorum Range?',
        'a': 'Nanga Patbat',
        'b': 'Rakaposhi',
        'c': 'Takht-e-Sulaiman',
        'd': 'K-2',
        'ans': 'd'
    },
    5: {
        'question': '5. Which city is famous for chappal and Khussa?',
        'a': 'GAWADAR',
        'b': 'Peshawar',
        'c': 'Gujranwala',
        'd': 'Sukkur',
        'ans': 'b'
    }
};
var aName = []
$(document).on('click', '#btnname', function () {
    var self = $(this);
    var userName = $('#name').val().toLowerCase();
    var targetError = self.parent().parent().find('.error');
    if (userName !== '') {
        if (inArray(aName, userName)) {
            targetError.html('You Already Attempt Quiz');
            targetError.removeClass('hide');
        } else {
            $('#instructions').modal('show');
            $('#name').val('');
            if (!targetError.hasClass('hide')) {
                targetError.addClass('hide')
            }
        }
    } else {
        targetError.html('Enter Your Name Before Start Quiz');
        targetError.removeClass('hide');
    }
});
$(document).on('click', '#startQuiz', function () {
    if (!$('#submit').hasClass('hide')) {
        $('#submit').addClass("hide");
    } if ($('#next').hasClass('hide')) {
        $('#next').removeClass("hide");
    }
    $('#next').attr('disabled', true);
    $('#quiz').modal({
        backdrop: 'static',
        keyboard: false
    })
    timmer()
    var quiz = quizques(1);
    $('#quiz-body').html(quiz);
});
$(document).on('click', '.option', function () {
    $('#next').attr('disabled', false);
})
var aRes = [];
$(document).on('click', '#next', function () {
    var step = $(this).attr('data-no');
    if (step == 4) {
        $(this).addClass(' hide');
        $('#submit').removeClass('hide');
    }
    if (step < 5) {
        timmer();
        $('#next').attr('disabled', true);
        result(step);
        step++;
        $('#next').attr('data-no', step);
        var quiz = quizques(step);
        $('#quiz-body').html(quiz);
    }
})

$(document).on('click', '#submit', function () {
    result(5);
    $('#quiz').modal('hide');
    $('#instructions').modal('hide');
    $('#instructions').modal('hide');
    Quizresult();
    $('#result').modal('show')
    $('#next').attr('data-no', 1);
})
function quizques(index) {
    var aOtion = ['a', 'b', 'c', 'd']
    var quiz = '';
    quiz += '<p>' + oQuesAns[index]['question'] + '</p>';
    $.each(aOtion, function (k, v) {
        quiz += '<div class="custom-control custom-radio">';
        quiz += '<input type="radio" value="' + v + '" id="' + v + index + '" name="ques' + index + '" class="custom-control-input">';
        quiz += '<label class="custom-control-label option" for="' + v + index + '">' + oQuesAns[index][v] + '</label>';
        quiz += '</div>';
    })
    return quiz
}
function inArray(arr, search) {
    for (var i in arr) {
        if (arr[i] == search) {
            return true;
        }
    }
    aName.push(search);
    return false
}
function result(step) {
    if ($('input[name="ques' + step + '"]:checked').val() == oQuesAns[step]['ans']) {
        aRes.push(true);
    } else {
        aRes.push(false);
    }
}
function timmer() {
    $("#counter").countdown({
        "ongoing": true,
        "seconds": 180,
        "warning-time": 5,
        'warning-class': ' warning-class',
        'selector-pause': $('#quiz .modal-footer button')[0],
        'onComplete': function () {
            $('#next').attr('disabled', false);
            $('#next:visible').trigger("click");
            $('#submit:visible').trigger("click");
        }

    });
}
function Quizresult() {
    var totalMarks = 5;
    var obtainMraks = 0;
    for (i in aRes) {
        if (aRes[i]) {
            obtainMraks++;
        }
    }
    var percentage = (obtainMraks * 100) / totalMarks;
    $('.result').html('you got ' + percentage + '% marks')
    if (percentage >= 80) {
        $('.remarks').html('Excellent! keep it up')
    }
    if (percentage >= 70 || percentage < 80) {
        $('.remarks').html('Good! try to improve it')
    }
    if (percentage >= 60 || percentage < 70) {
        $('.remarks').html('Average! need to work hard')
    }
    if (percentage >= 50 || percentage < 60) {
        $('.remarks').html('poor! focus on studies')
    }
    if (percentage < 50) {
        $('.remarks').html('fail! better luck next time')
    }
}