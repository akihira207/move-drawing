/**
 * INDEX.js
 * @date 2016.08.09
 *
 */

var INDEX = {
    /**
     * 初期表示処理
     *
     */
    init: function() {
        var that = this;
        that.getLocalStorage();
        that.appendPicStyle();
    },
    /**
     * image挿入後処理
     *
     */
    appendPicStyle: function() {
        var that = this;
        jQuery('.drowImage').css({
            "backgroundColor": "white",
            "margin": 10,
            "cursor": "pointer"
        });
        jQuery('.drowImage').attr({
            "onclick": "INDEX.checkColor(this);",
            "data-flg": "0"
        });
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
     * ローカルストレージのdataListオブジェクトを削除する
     *
     */
    setSessionStroage: function() {
        var that = this;
        // id格納用変数
        var key = {};
        // imgタグの要素数
        var imgLength = jQuery('.findAll').find('img').length;

        // 選択対象回収
        for(var i = 0, pos = 0; i < imgLength; i++){
            delFlg = jQuery('img.drowImage').eq(i).attr('data-flg');
            if(delFlg === "1"){
                key[pos] = jQuery('img.drowImage').eq(i).attr('id');
                pos++;
            }
        }

        // 終了条件判定
        if(Object.keys(key).length !== 1){
            alert('1つだけ選択してください。');
        } else {
            var dataObj = JSON.parse(window.localStorage.getItem("dataList"));
            var getBase64 = dataObj[key[0]];
            window.sessionStorage.setItem('selectPic', getBase64);
            that.actionPath("./movePicture.html");
        }
    },
    /**
     * 選択した画像の背景を変える
     *
     */
    checkColor: function(obj) {
        var that = this;
        var bgColor = jQuery(obj).css("backgroundColor");
        if(bgColor === "rgb(255, 255, 255)"){
            jQuery(obj).css({
                "backgroundColor": "yellow"
            });
            jQuery(obj).attr("data-flg", "1");
        } else {
            jQuery(obj).css({
                "backgroundColor": "white"
            });
            jQuery(obj).attr("data-flg", "0");
        }
    },
    /**
     * ローカルストレージから取得処理
     *
     */
    getLocalStorage: function() {
        // 親オブジェクト取得
        var that = this;
        // カウンター変数
        var cnt = 0;
        // ループ変数
        var i = 0

        // keyがない場合は、nullを返す
        var dataObj = JSON.parse(window.localStorage.getItem("dataList"));

        // null判定
        if(dataObj !== null){
            while (true){ // 要素がすべて取得できるまでループさせる
                var base64 = dataObj[i];
                if(typeof(base64) !== "undefined"){
                    var image = new Image();
                    image.src = base64;
                    image.width = 300;
                    image.height = 250;
                    image.className = "drowImage";
                    image.id = i;
                    jQuery('.findAll').append(image);
                    cnt++;
                }

                // 終了条件判定
                if(cnt == Object.keys(dataObj).length){
                    break;
                }
                // カウントアップ
                i++;
            }
        }
    },
    /**
     * ローカルストレージのdataListオブジェクトをすべて削除する
     *
     */
    deleteAllLocalStorage: function() {
        var that = this;
        if(window.confirm('描いた絵をすべて削除します、よろしいですか？')){
            window.localStorage.removeItem("dataList");
            jQuery('.findAll > img').remove();
            that.getLocalStorage();
        }
    },
    /**
     * ローカルストレージのdataListオブジェクト内の選択したデータを削除する
     *
     */
    deleteSelectLocalStorage: function() {
        var that = this;
        var dataObj = JSON.parse(window.localStorage.getItem("dataList"));
        if(window.confirm('選択した絵を削除します、よろしいですか？')){

            // 削除フラグ格納変数
            var delFlg;
            // 削除keyの格納オブジェクト
            var data = {};
            // imgタグの要素数
            var imgLength = jQuery('.findAll').find("img").length;

            // 削除対象回収
            for(var i = 0, pos = 0; i < imgLength; i++){
                delFlg = jQuery('img.drowImage').eq(i).attr('data-flg');
                if(delFlg === "1"){
                    data[pos] = jQuery('img.drowImage').eq(i).attr('id');
                    pos++;
                }
            }

            // データ削除
            for(var i = 0; i < Object.keys(data).length; i++){
                var pos = parseInt(data[i]);
                delete dataObj[pos];
            }

            // 再定義用オブジェクト
            var newDataObj = {};
            // シーケンス発行
            var i = 0;
            for (var key in dataObj) { // シーケンス再定義 (DBで言う、deleteInsertのイメージ)
                newDataObj[i] = dataObj[key];
                i++;
            }

            // LocalStorageに再定義
            window.localStorage.setItem("dataList", JSON.stringify(newDataObj));

            jQuery('.findAll > img').remove();
            that.getLocalStorage();
            that.appendPicStyle();
        }
    },
    /**
     * オブジェクトのコンストラクタ
     *
     */
    constructor: function() {
        var that = this;

        // ローカルストレージから取得
        jQuery('#dispBtn').on('click',function(){
            that.getLocalStorage();
        });

        // movePicture画面へ遷移
        jQuery('#moveBtn').on('click',function(){
            that.setSessionStroage();
        });

        // playDrowing画面へ遷移
        jQuery('#playBtn').on('click',function(){
            that.actionPath("./playDrowing.html");
        });

        // 全削除ボタンイベント定義
        jQuery('#allDeleteBtn').on('click',function(){
            that.deleteAllLocalStorage();
        });

        // 選択削除ボタンイベント定義
        jQuery('#selectDeleteBtn').on('click',function(){
            that.deleteSelectLocalStorage();
        });

        // 初期表示
        that.init();

    }
};
jQuery(function(){
    INDEX.constructor();
});
