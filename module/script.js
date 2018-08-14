$('a').on('click', function () {
    console.log('aa');
    // this.addClass('select');

    $('li').removeClass("active");
    $(this).parent('li').addClass('active');

    // var href = jQuery(this).attr("href");
    // location.href = href;
})

//ページ遷移設定(pjax)
const ShutterAnimation = Barba.BaseTransition.extend({
    // コンストラクタ
    start: start_fnc,
    // アニメーションさせる処理
    anime: anime_fnc,
    // アニメーションの終了を示すためにthis.done()を呼ぶことが必須
    finish: finish_fnc
});

function start_fnc() {
    //400ms後に遷移処理を行う
    this.anime(400)
        .then(this.newContainerLoading)
        .then(this.finish.bind(this));
}

function anime_fnc(timer) {
    return new Promise(anime_do);

    function anime_do(resolve) {
        // 遷移前処理(moveを付与)
        document.querySelector('.shutter-a').classList.toggle('moved');

        // 遷移処理(400ms後)
        setTimeout(function () {
            //遷移処理
            resolve();
            //遷移後アニメーション(moveを外す)
            document.querySelector('.shutter-a').classList.toggle('moved');
        }, timer);
    }
}

function finish_fnc() {
    this.done();
}

Barba.Pjax.getTransition = function () {
    return ShutterAnimation;
};

// Barba.js 実行
Barba.Pjax.start();
