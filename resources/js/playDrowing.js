/**
 * MOVEDROWING.js
 * @date 2016.08.06
 *
 */

var MOVEDROWING = {
    rect: {},
    canvas: {},
    ctx1: {},
    onoff: false, // 描画が可能かどうかのフラグ
    oldx: {},
    oldy: {},
    lineColor: {},
    linw: {},
    /**
     * 初期表示処理
     *
     */
    init: function() {
        var that = this;
        that.rect = jQuery('#canvas').offset();
        that.canvas = jQuery('#canvas');
        that.ctx1 = that.canvas.get(0).getContext("2d");
        that.oldx = this.rect.left;
        that.oldy = this.rect.top;

        that.lineColor = "black"; //色の初期設定
        that.linw = 1; //線幅の初期設定
    },
    /**
     * マウスダウン処理
     *
     */
    paintStart: function(e) {
        var that = this;
        that.onoff = true;
        that.oldx = e.pageX - that.rect.left; //マウスダウンした座標
        that.oldy = e.pageY - that.rect.top;
        console.log(e.pageX , e.pageY);
        console.log(that.rect.left , that.rect.top);
        console.log(that.oldx , that.oldy);

    },
    /**
     * マウスムーブ処理
     *
     */
    paintMove: function(e) {
        var that = this;
        if (that.onoff){
            var newx = e.pageX - that.rect.left; //マウスの新しい座標
            var newy = e.pageY - that.rect.top;

            that.ctx1.beginPath();
            that.ctx1.moveTo(that.oldx,that.oldy);
            that.ctx1.lineTo(newx,newy);
            that.ctx1.strokeStyle = that.lineColor;
            that.ctx1.lineWidth = that.linw;
            // that.ctx1.lineCap = "round";
            that.ctx1.stroke();

            that.oldx = newx; //今の新しい座標を次の描画の始点に
            that.oldy = newy;

        }
    },
    /**
     * マウスアップ処理
     *
     */
    paintEnd: function(e) {
        var that = this;
        that.onoff = false;

    },
    /**
     * 色を変更する処理
     *
     */
    changeColor: function(color) {
        var that = this;
        that.lineColor = color; //色の初期設定

    },
    /**
     * ポップアップ処理
     *
     */
    popupAlert: function() {
        jQuery('.alert').fadeIn(1000).delay(2000).fadeOut(1000);

    },
    /**
     * スライダーの値を取得する処理
     *
     */
    getSlider: function(obj) {
        var that = this;
        that.linw = jQuery('#lineWidth').val();
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
     * ローカルストレージへ保存する処理
     *
     */
    setLocalStorage: function() {
        var that = this;
        var canvas = document.getElementById("canvas");
        var base64 = canvas.toDataURL();

        var dataObj = JSON.parse(window.localStorage.getItem("dataList"))

        if(dataObj == null){ // ローカルストレージにdataListオブジェクトがない場合
            dataObj = {
                0: base64
            };

        } else {
            var num = Object.keys(dataObj).length;
            dataObj[num] = base64;
        }

        // LocalStorageに保存する
        window.localStorage.setItem("dataList", JSON.stringify(dataObj));

    },
    /**
     * 最初からやり直す処理
     *
     */
    reset: function() {
        var that = this;
        that.ctx1.beginPath();
        that.ctx1.clearRect(0, 0, canvas.width, canvas.height);

    },
    /**
     * オブジェクトのコンストラクタ
     *
     */
    constructor: function() {
        var that = this;

        // スライダーの値を取得する
        jQuery('#lineWidth').on('change', function(){
            that.getSlider();
        });

        // マウスダウン
        jQuery('#canvas').on('mousedown',function(e){
            that.paintStart(e);
        });

        // マウスムーブ
        jQuery('#canvas').on('mousemove',function(e){
            that.paintMove(e);
        });

        // マウスアップ
        jQuery('#canvas').on('mouseup',function(e){
            that.paintEnd(e);
        });

        // ローカルストレージへ保存
        jQuery('#registBtn').on('click',function(){
            that.setLocalStorage();
            that.popupAlert();
        });

        // 遷移先決定
        jQuery('#backBtn').on('click',function(){
            that.actionPath("./index.html");
        });

        // リセットボタン押下イベント定義
        jQuery('#resetBtn').on('click',function(){
            that.reset();
        });

        // 初期表示
        that.init();

    }
};
jQuery(function(){
    MOVEDROWING.constructor();
});
