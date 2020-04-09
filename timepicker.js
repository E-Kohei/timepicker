/***    タイムピッカーライブラリ    ***/
/*  input要素のみに適用できる。inputがフォーカスされた時にタイムピッカーを
 * 表示し、ピッカーウィジェットとinputからフォーカスが外れたときに削除する。
 */

/* strは時間として有効か検査 */
function is_time(str){
  // strを時と分に分割
  var nums = str.split(':');
  // 分割されたリストの長さは2でなければならない（時と分）
  if (nums.length != 2){
    return false;
  }
  // 時と分は二桁でなければならない
  if (nums[0].length != 2 || nums[1].length != 2){
    return false;
  }
  // 時と分をパース
  var hour = parseInt(nums[0]);
  var min = parseInt(nums[1]);
  // 範囲を調べる
  if (0 <= hour && hour < 24 && 0 <= min && min < 60){
    return true;
  }
  else{
    return false;
  }
};

/* 長さがlengthの、0でパディングされたnumを文字列で返す */
function pad_digit(num, length){
  var num_s = num.toString();
  if (num_s.length < length){
    // 文字長がlengthより小さければ0でパディング
    var num_zeros = length - num_s.length;
    for (var i = 0; i < num_zeros; i++){
      num_s = '0' + num_s;
    }
    return num_s;
  }
  else{
    // lengthより大きければそのまま返す
    return num_s;
  }
}

// $elemはフォーカスされているか
function has_focus($elem){
  if ($elem.is(":focus")){ return true; }
  else{ return false; }
}

// $elemの子要素がフォーカスされているか
function has_child_focus($elem){
  if ($elem.find(":focus").length){ return true; }
  else{ return false; }
}

/* タイムピッカーのDOMオブジェクトを作成 */
function create_timepicker(){
  // ピッカーのコンテナと各要素のコンテナ
  var picker = document.createElement("div");
  var header_div = document.createElement("div");
  var select_div = document.createElement("div");
  var button_div = document.createElement("div");

  // ヘッダを作る
  var hour_header = document.createElement("div");
  hour_header.innerHTML = "時";
  var min_header = document.createElement("div");
  min_header.innerHTML = "分";
  header_div.appendChild(hour_header);
  header_div.appendChild(min_header);

  // 時間と分を選ぶセレクタを作る
  var hour_select = document.createElement("select");
  hour_select.setAttribute("size", "10");
  hour_select.setAttribute("tabindex", "-1");
  var min_select = document.createElement("select");
  min_select.setAttribute("size", "10");
  min_select.setAttribute("tabindex", "-1");
  for (var i = 0; i < 24; i++){
    var option = document.createElement("option");
    option.value = pad_digit(i,2);
    option.innerHTML = pad_digit(i,2);
    hour_select.appendChild(option);
  }
  for (var i = 0; i < 60; i++){
    var option = document.createElement("option");
    option.value = pad_digit(i,2);
    option.innerHTML = pad_digit(i,2);
    min_select.appendChild(option);
  }

  // 入力を完了するボタンを作る
  var ok_button = document.createElement("button");
  ok_button.setAttribute("tabindex", "-1");
  ok_button.innerHTML = "&#10004;";      // チェックマーク
  var cancel_button = document.createElement("button");
  cancel_button.setAttribute("tabindex", "-1");
  cancel_button.innerHTML = "&#10005;";  // バツマーク

  // ピッカーを組み立て
  select_div.appendChild(hour_select);
  select_div.appendChild(min_select);
  button_div.appendChild(ok_button);
  button_div.appendChild(cancel_button);
  picker.appendChild(header_div);
  picker.appendChild(select_div);
  picker.appendChild(button_div);

  // クラスを設定することで各要素のレイアウトを設定して完成
  picker.className = "my-timepicker-div";
  header_div.className = "row";
  select_div.className = "row";
  button_div.className = "row";
  hour_header.className = "text-center col-sm-6";
  min_header.className = "text-center col-sm-6";
  hour_select.className = "form-control col-sm-6 hour-select";
  min_select.className = "form-control col-sm-6 min-select";
  ok_button.className = "col-sm-6 btn btn-outline-primary ok-button";
  cancel_button.className = "col-sm-6 btn btn-outline-secondary cancel-button";

  return $(picker);
}

// ピッカーにinputと関連したイベントリスナーを設定する
function bind_timepicker($picker, $input){
  // ピッカーからフォーカスが外れたとき、ピッカーを削除する
  // このとき、ピッカー内の要素や$inputにフォーカスが移る時でも
  // focusoutイベントは発生するので、50ミリ秒おいて処理する
  $picker.on("focusout", function(){
    setTimeout(function(){
      var $current_picker = get_timepicker($input);
      // ピッカーが表示されていて
      if ($current_picker.length){
        // かつinputもピッカーもすでにフォーカスを持っていなければ
        if (!has_focus($input) && !has_child_focus($current_picker)){
          // ピッカーを削除する
          remove_timepicker($input);
        }
      }
    }, 50);
  });
  // okボタンが押された時、選択された時刻を出力し、ピッカーを削除
  $picker.find(".ok-button").on("click", function(){
    var hour = $picker.find(".hour-select").val();
    var min = $picker.find(".min-select").val();
    if (hour != null && min != null){
      $input.val(hour + ":" + min);
    }
    remove_timepicker($input);
    // $inputの内容が変わったことを伝えるため、changeイベントを発火
    $input.trigger("change");
  });
  // cancelボタンが押された時、何もせずピッカーを削除
  $picker.find(".cancel-button").on("click", function(){
    remove_timepicker($input);
  });
}

// タイムピッカーを表示する
function show_timepicker($picker, $input){
  var left_pos = $input.offset()["left"];
  var top_pos = $input.offset()["top"] +
                $input.outerHeight() + 5;
  $picker.insertAfter($input);
  $picker.offset({left: left_pos, top: top_pos});
}

// オプションによりタイムピッカーを初期化
function initialize_timepicker($picker, $input){
  // 現在の$inputの値とselectの初期値を合わせる
  if (is_time($input.val())){
    var nums = $input.val().split(':');
    var hour = parseInt(nums[0]);
    var min = parseInt(nums[1]);
    var hour_select = $picker.find(".hour-select");
    var min_select = $picker.find(".min-select");
    // 入力されている時間の位置へスクロール
    var height = hour_select.height();                  // selectの高さ
    var opt_height = height / hour_select.attr("size"); // optionの高さ
    hour_select.scrollTop(opt_height*hour - height/2);
    min_select.scrollTop(opt_height*min - height/2);
    // 入力されている時間をセレクト
    hour_select.val(pad_digit(hour,2));
    min_select.val(pad_digit(min,2));
  }
}

// $inputに作られたタイムピッカーjQueryオブジェクトで得る
function get_timepicker($input){
  return $input.next(".my-timepicker-div");
}

// $inputはタイムピッカーを持っているか
function has_timepicker($input){
  if (get_timepicker($input).length){ return true; }
  else{ return false; }
}

// $inputの持つタイムピッカーを削除する
function remove_timepicker($input){
  var $picker = $input.next(".my-timepicker-div");
  $picker.remove();
}


// jQueryオブジェクトにメンバー関数timepickerを追加
(function($){
  $.fn.timepicker = function(){
    // タイムピッカーはinputタグにしか使えない
    if (this.prop("tagName") != "INPUT"){
      return;
    }
    // プレースホルダーを設定
    this.attr({ placeholder : "--:--" });
    // フォーカスされたときにピッカーを表示する
    this.on("focus", function(){
      var $this_input = $(this);
      // すでにピッカーが表示されているならば何もしない
      if (has_timepicker($this_input)){
        return;
      }
      var $picker = create_timepicker();
      bind_timepicker($picker, $this_input);
      show_timepicker($picker, $this_input);
      initialize_timepicker($picker, $this_input);
    });
    // フォーカスが外れたときにピッカーを削除する
    // このとき、ピッカー内の要素にフォーカスが移る時でも
    // blurイベントは発生するので、50ミリ秒おいて処理する
    this.on("blur", function(){
      var $this_input = $(this);
      setTimeout(function(){
        var $picker = get_timepicker($this_input);
        // ピッカーが表示されていて
        if ($picker.length){
          // かつinputもピッカーもすでにフォーカスを持っていなければ
          if (!has_focus($this_input) && !has_child_focus($picker)){
            // ピッカーを削除する
            remove_timepicker($this_input);
          }
        }
      }, 50);
    })
    // 値が変わったとき、時刻でなければリセットする
    this.on("change", function(){
      var this_input = $(this);
      if (!is_time(this_input.val())){
        this_input.val("");
      }
    });
  };
})(jQuery);
