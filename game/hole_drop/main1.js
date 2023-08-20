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

//ゲーム管理の変数
var moveSpeed = 10;
var gameMode;


function preload() {
    // ホールの読み込み
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

        // 画像をスプライトに付ける
        sprite1.addImage(sprite1Image);
        sprite2.addImage(sprite2Image);
        sprite3.addImage(sprite3Image);
        sprite4.addImage(sprite4Image);

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
    }

    //スプライトを表示させる
    drawSprites();
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

}

// スプライトを拾う
function spritesCatch(hole, sprites) {
    // ホールとスプライトの半径を求める
    hole.radius = hole.width/2;
    sprites.radius = sprites.width/2;

    // ホールがスプライトを飲み込むとき
    if ((sprites.position.x  - hole.position.x) ** 2 + (sprites.position.y - hole.position.y ) ** 2 < (hole.radius - sprites.radius) ** 2 && sprites.radius < hole.radius) {
        // スプライトを消す
        sprites.remove();
    }
}



