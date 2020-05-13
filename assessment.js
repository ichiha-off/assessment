'user stroct';
//厳格モード。宣言後の記述ミスをエラーとして表示する。
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を全て削除する。
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    // while文は与えられた論理式がtureである場合に実行し続ける制御。
    while(element.firstChild){ //子要素が有る限り削除する。
        element.removeChild(element.firstChild);
    };
};

assessmentButton.onclick = () => {
    // .valueでタグの中の値を取得できる。
    const userName = userNameInput.value;
    if (userName.length === 0){ //　名前が空の時は処理を終了する。
        return;　// returnの意味　1・戻り値を返す  2・関数を処理を終了する。
    } 
    console.log(userName);

    // 診断結果表示エリアの作成
    // header = <h3> 診断結果　</h3>
    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果'
    resultDivided.appendChild(header);

    // paragraph = <p> 定数resultの結果 </p>
    const  paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO　ツイートエリアの作成
    removeAllChildren(tweetDivided);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
         
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
    // widgetd.jsの設定
    /*const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);*/
};

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
};

const answers =  [
    //constは、一度代入すると再代入できない。（定数）
    'userNameのいいところは声です。userNameの特徴的な声は皆を惹きつけ、心に残ります。',
    'userNameのいいところはまなざしです。userNameに見つめられた人は、気になって仕方がないでしょう。',
    'userNameのいいところは情熱です。userNameの情熱に周りの人は感化されます。',
    'userNameのいいところは厳しさです。userNameの厳しさがものごとをいつも成功に導きます。',
    'userNameのいいところは知識です。博識なuserNameを多くの人が頼りにしています。',
    'userNameのいいところはユニークさです。userNameだけのその特徴が皆を楽しくさせます。',
    'userNameのいいところは用心深さです。userNameの洞察に、多くの人が助けられます。',
    'userNameのいいところは見た目です。内側から溢れ出るuserNameの良さに皆が気を惹かれます。',
    'userNameのいいところは決断力です。userNameがする決断にいつも助けられる人がいます。',
    'userNameのいいところは思いやりです。userNameに気をかけてもらった多くの人が感謝しています。',
    'userNameのいいところは感受性です。userNameが感じたことに皆が共感し、わかりあうことができます。',
    'userNameのいいところは節度です。強引すぎないuserNameの考えに皆が感謝しています。',
    'userNameのいいところは好奇心です。新しいことに向かっていくuserNameの心構えが多くの人に魅力的に映ります。',
    'userNameのいいところは気配りです。userNameの配慮が多くの人を救っています。',
    'userNameのいいところはその全てです。ありのままのuserName自身がいいところなのです。',
    'userNameのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられるuserNameが皆から評価されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数 // 関数の簡単な説明
 * @param {string} userName  ユーザーの名前　// この関数はどのような引数をとるのか
 * @return {string} 診断結果　// どのような内容を返すのか（表示）　stringは文字列
 */
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {//for文はループ文
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    };

    // 文字コード番号の合計を回答の数を割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];// []は配列でカッコ内の添字のものを取得する

    // replaceは文字を置き換える。全部を置き換える際は/userName/の正規表現部分を指定する。gを使うとグローバル表現で全てに当てはまる。
    result = result.replace(/userName/g, userName);
    return result;
};
console.assert(
    assessment('太郎')　=== '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ結果だお'
);
console.assert(
    assessment('太郎')　=== assessment('次郎'),
    '間違いだよ！'
);
