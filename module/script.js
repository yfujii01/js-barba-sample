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
    this.anime(400)
        .then(this.newContainerLoading)
        .then(this.finish.bind(this));
}

function anime_fnc(timer) {
    return new Promise(anime_do);

    function anime_do(resolve) {
        // クラスを付け替え、移動させる
        document.querySelector('.shutter-a').classList.toggle('moved');
        document.querySelector('.shutter-b').classList.toggle('moved');

        setTimeout(function () {
            resolve();
            document.querySelector('.shutter-a').classList.toggle('moved');
            document.querySelector('.shutter-b').classList.toggle('moved');
        }, timer);
    }
}
function finish_fnc() {
    // document.body.scrollTop = 0;
    this.done();
}


Barba.Pjax.getTransition = function () {
    return ShutterAnimation;
};

// Barba.js 実行
Barba.Pjax.start();
