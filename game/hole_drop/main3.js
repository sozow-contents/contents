//キャンパスのサイズ
var canvasSize = 4000;

//スプライトの変数
var hole;
var sprite1;
var sprite2;
var sprite3;
var sprite4;
var spritesGroup;

//ホールの画像
var holeImage;

// スプライトの画像
var sprite1Image;
var sprite2Image;
var sprite3Image;
var sprite4Image;
var perfectImage;


//ゲーム管理の変数
var moveSpeed = 10;

var spritesCount = 0;
var spritesNumber = 0;
var gameMode;
var score;
var timer;
var frame;

var levelText = 'off';


function preload() {
    //画像の読み込み
    // perfectのときの画像を読み込み
    perfectImage = loadImage('img/perfect.png');
    // ホールの画像
    holeImage = loadImage('img/hole.png');

    // スプライトの読み込み
    sprite1Image = loadImage('img/sprite1.png');
    sprite2Image = loadImage('img/sprite2.png');
    sprite4Image = loadImage('img/sprite4.png');
    sprite3Image = loadImage('img/sprite3.png');

}


function setup() {
    //キャンバスを作る
    createCanvas(windowWidth, windowHeight);
    //スプライトを作る
    hole = createSprite();
    //衝突判定を円とする
    hole.setCollider('circle');
    //ホールの大きさを0.7に倍する
    hole.scale = 0.7;
    //画像をスプライトに張り付ける
    hole.addImage(holeImage);
    // スプライトのグループを作る
    spritesGroup = new Group();

    // スプライトを作る
    for (var i = 0; i < 25; i++) {
        sprite1 = createSprite(random(canvasSize), random(canvasSize));
        sprite2 = createSprite(random(canvasSize), random(canvasSize));
        sprite3 = createSprite(random(canvasSize), random(canvasSize));
        sprite4 = createSprite(random(canvasSize), random(canvasSize));
        // スプライトの数をかぞえる
        spritesNumber += 4;

        // 画像をスプライトに付ける
        sprite1.addImage(sprite1Image);
        sprite2.addImage(sprite2Image);
        sprite3.addImage(sprite3Image);
        sprite4.addImage(sprite4Image);

        // 画像の大きさを変える
        sprite1.scale = 0.5;
        sprite2.scale = 0.7;
        sprite3.scale = 1;
        sprite4.scale = 2.5;

        //スプライトの衝突基準
        sprite1.setCollider('circle');
        sprite3.setCollider('circle');
        sprite2.setCollider('circle');
        sprite4.setCollider('circle');

        // それぞれのスプライトをスプライトのグループに追加する
        spritesGroup.add(sprite1);
        spritesGroup.add(sprite2);
        spritesGroup.add(sprite3);
        spritesGroup.add(sprite4);
    }

    // ゲームモードを初期化
    gameMode = 'gamePlaying';

    // 文字の設定
    fill(250);
    textStyle(BOLD);

    // スコアやタイマーの変数を初期化
    score = 0;
    timer = 25;
    frame = 0;
    // カメラを作る
    camera.zoom *= 0.5;
}

function draw() {
    //キャンバスを塗りつぶす
    background(70,130,180);

    // ゲームモードで動作を変える
    switch (gameMode) {
        case 'gamePlaying':
            // ゲームプレイの処理（しょり）
            gamePlaying();
            break;
        case 'gameCompleted':
            break;
        case 'gameFinished':
            break; 
    }

    //スプライトを表示させる
    drawSprites();
    // カメラの影響をなくす
    camera.off();

    // カウンターの数字を表示
    // スコアとタイマー表示
    textSize(50);
    text('SCORE', width - 500, 200);
    text('TIME', width - 500, 300);
    textSize(60);
    text(score, width - 200, 200);
    text(timer, width - 200, 300);

    // levelupのときのテキストを表示
    if (levelText == 'on'){
        textSize(50);
        text('レベルアップ', 400, 200);
        // 2秒経ったとき、levelText_off関数を呼び出す
        setTimeout(levelText_off, 2000);
        
    }


    function levelText_off(){
        // レベルアップのテキストを消す
        levelText = 'off';
    }

    // タイムアップになったら「GameFinished」を表示
    if (gameMode == 'gameFinished') {
        textSize(150);
        textAlign(CENTER);
        text('GameFinished', width / 2, height / 2);
        // スコアを表示
        text('score ', width / 2 - 150, height / 2 + 200);
        text(score, width / 2 + 200, height / 2 + 200);
    }
    // スプライトを集め終わっていたら「GameCompleted」を表示
    if (gameMode == 'gameCompleted') {
        background(perfectImage);
        fill(0)
        textSize(150);
        textAlign(CENTER);
        text('Perfect !!', width / 2, height / 2);
        // スコアを表示
        text('score ', width / 2 - 150, height / 2 + 200);
        text(score, width / 2 + 200, height / 2 + 200);
    }
}


// ゲームプレイの処理
function gamePlaying() {
    
    // holeを矢印キーで動かす処理
    if (keyDown('RIGHT')) { //右矢印を押したとき
        //横の速度をmoveSpeedにする
        hole.position.x += moveSpeed;
    } else if (keyDown('LEFT')) {//左矢印を押したとき
        //横の速度を-moveSpeedにする
        hole.position.x += -moveSpeed;
    } else if (keyDown('UP')) {    //上矢印を押したとき
        //縦の速度を-moveSpeedにする
        hole.position.y += -moveSpeed;
    } else if (keyDown('DOWN')) {//下矢印を押したとき
        //縦の速度を＋moveSpeedにする
        hole.position.y += moveSpeed;
    }
    if (hole.position.x > canvasSize + 200) { //右からはみ出ないように
        hole.position.x = canvasSize + 200;
    } else if (hole.position.x < -200) {  //左からはみ出ないように
        hole.position.x = -200;
    }
    if (hole.position.y > canvasSize + 200) { //下からはみ出ないように
        hole.position.y = canvasSize + 200;
    } else if (hole.position.y < -200) {  //上からはみ出ないように
        hole.position.y = -200;
    }

    // カメラをホールの位置に合わせる
    camera.position.x = hole.position.x - 180;
    camera.position.y = hole.position.y - 180;

    // あたり判定
    hole.overlap(spritesGroup, spritesCatch);

    // １秒毎にタイマーを減らす
    if (frame++ >= 60) {
        if (timer > 0) {
            timer--;
        }
        frame = 0;
    }

    //スプライトを集めたらゲーム終了
    if (timer == 0) {
        gameMode = 'gameFinished';
    }
    //スプライトを集めたらゲーム終了
    if (score == spritesNumber) {
        gameMode = 'gameCompleted';
    }
}

// スプライトを拾う
function spritesCatch(hole, sprites) {
    // ホールとスプライトの半径を求める
    hole.radius = hole.width/2 * hole.scale;
    sprites.radius = sprites.width/2 * sprites.scale;

    // ホールがスプライトを飲み込むとき
    if ((sprites.position.x  - hole.position.x) ** 2 + (sprites.position.y - hole.position.y ) ** 2 < (hole.radius - sprites.radius) ** 2 && sprites.radius < hole.radius) {

        // スプライトを消す
        sprites.remove();
        // 拾ったスプライトの数・スコアを数える
        spritesCount++;
        score += 1;
        // スプライトを10こ集めたときレベルアップしてホールを大きくする
        if (spritesCount == 10) {
            // レベルアップテキストを表示
            levelText = 'on';
            // ホールを大きくする
            hole.scale += 0.5;
            // ホールの大きさが大きくなったらcameraを縮小する
            camera.zoom *= 0.9;
            // スプライトのカウントをリセットする
            spritesCount = 0;
            // ホールのスピードを早くする
            moveSpeed += 0.5;
            }
        }
    }




