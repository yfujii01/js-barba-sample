//ページ遷移設定(pjax)
(function () {
    (function () {
        // const shutterA = document.querySelector('.shutter-a');
        // const shutterB = document.querySelector('.shutter-b');

        const ShutterAnimation = Barba.BaseTransition.extend({

            // Barba.jsで定義されている。コンストラクタと考えてよいそうです。
            start: function () {
                this.shutter(400)
                    .then(this.newContainerLoading)
                    .then(this.finish.bind(this));
            },

            // シャッターが閉まるようなアニメーションをさせる処理
            shutter: function (timer) {
                return new Promise(function (resolve) {
                    // クラスを付け替え、移動させる
                    document.querySelector('.shutter-a').classList.toggle('moved');
                    document.querySelector('.shutter-b').classList.toggle('moved');

                    // 画面が黄色く埋まるまで（400ms）待つ
                    setTimeout(function () {
                        resolve();
                    }, timer);

                });
            },

            // アニメーションの終了を示すためにthis.done()を呼ぶことが必須
            finish: function () {
                document.body.scrollTop = 0;
                this.done();
            }

        });

        Barba.Pjax.getTransition = function () {
            return ShutterAnimation;
        };
    })();

    // Barba.js 実行
    Barba.Pjax.start();
})();
