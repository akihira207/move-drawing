/**
 * MOVEPICTURE.js
 * @date 2016.08.09
 *
 */

var MOVEPICTURE = {
    /**
     * 初期表示処理
     *
     */
    init: function() {
        var that = this;
        that.getSessionStroage();
    },
    /**
     * 遷移先を選定するメソッド
     *
     */
    actionPath: function(path) {
        var that = this;
        document.location.href = path;
    },
    /**
     * 追加要素に対してcssを付与
     *
     */
    appendCss: function(flg) {
        var that = this;
        if(flg === 'dance'){
            jQuery('.drowImage').css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transform": "translateZ(-100px)",
                "-webkit-animation": "dancing 2s infinite",
                "-moz-transform-style": "preserve-3d",
                "-moz-transform": "translateZ(-100px)",
                "-moz-animation": "dancing 2s infinite",
                "-o-transform-style": "preserve-3d",
                "-o-transform": "translateZ(-100px)",
                "-o-animation": "dancing 2s infinite",
                "-ms-transform-style": "preserve-3d",
                "-ms-transform": "translateZ(-100px)",
                "-ms-animation": "dancing 2s infinite"
            });
        } else if(flg === 'rotate'){
            jQuery('.drowImage').css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transform": "translateZ(-100px)",
                "-webkit-animation": "rotate 2s infinite",
                "-moz-transform-style": "preserve-3d",
                "-moz-transform": "translateZ(-100px)",
                "-moz-animation": "rotate 2s infinite",
                "-o-transform-style": "preserve-3d",
                "-o-transform": "translateZ(-100px)",
                "-o-animation": "rotate 2s infinite",
                "-ms-transform-style": "preserve-3d",
                "-ms-transform": "translateZ(-100px)",
                "-ms-animation": "rotate 2s infinite"
            });
        } else if(flg === 'skew'){
            jQuery('.drowImage').css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transform": "translateZ(-100px)",
                "-webkit-animation": "skew 2s infinite",
                "-moz-transform-style": "preserve-3d",
                "-moz-transform": "translateZ(-100px)",
                "-moz-animation": "skew 2s infinite",
                "-o-transform-style": "preserve-3d",
                "-o-transform": "translateZ(-100px)",
                "-o-animation": "skew 2s infinite",
                "-ms-transform-style": "preserve-3d",
                "-ms-transform": "translateZ(-100px)",
                "-ms-animation": "skew 2s infinite"
            });
        } else if(flg === 'scale'){
            jQuery('.drowImage').css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transform": "translateZ(-100px)",
                "-webkit-animation": "scale 2s infinite",
                "-moz-transform-style": "preserve-3d",
                "-moz-transform": "translateZ(-100px)",
                "-moz-animation": "scale 2s infinite",
                "-o-transform-style": "preserve-3d",
                "-o-transform": "translateZ(-100px)",
                "-o-animation": "scale 2s infinite",
                "-ms-transform-style": "preserve-3d",
                "-ms-transform": "translateZ(-100px)",
                "-ms-animation": "scale 2s infinite"
            });
        } else {
            jQuery('.drowImage').css({
                "-webkit-transform-style": "",
                "-webkit-transform": "",
                "-webkit-animation": "",
                "-moz-transform-style": "",
                "-moz-transform": "",
                "-moz-animation": "",
                "-o-transform-style": "",
                "-o-transform": "",
                "-o-animation": "",
                "-ms-transform-style": "",
                "-ms-transform": "",
                "-ms-animation": ""
            });
        }
    },
    /**
     * セッションストレージから取得処理
     *
     */
    getSessionStroage: function() {

        // sessionStorageから選択したオブジェクトを取得
        var base64 = window.sessionStorage.getItem('selectPic');

        // null判定
        if(base64 !== null){
            var image = new Image();
            image.src = base64;
            image.width = 600;
            image.height = 550;
            image.className = "drowImage dance rotate skew scale";
            jQuery('.findAll').append(image);
        }
    },
    /**
     * MOVEPICTUREオブジェクトのコンストラクタ
     *
     */
    constructor: function() {
        var that = this;

        // ローカルストレージから取得
        jQuery('#backBtn').on('click',function(){
            that.actionPath("./index.html");
        });

        // ダンスボタン
        jQuery('#danceBtn').on('click',function(){
            that.appendCss('dance');
        });

        // 回転ボタン
        jQuery('#rotateBtn').on('click',function(){
            that.appendCss('rotate');
        });

        // 歪みボタン
        jQuery('#skewBtn').on('click',function(){
            that.appendCss('skew');
        });

        // 拡大ボタン
        jQuery('#scaleBtn').on('click',function(){
            that.appendCss('scale');
        });

        // ストップボタン
        jQuery('#stopBtn').on('click',function(){
            that.appendCss('stop');
        });

        // 初期表示
        that.init();

    }
};
jQuery(function(){
  MOVEPICTURE.constructor();
});
