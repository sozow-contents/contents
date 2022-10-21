// 全体の初期化（最初に一回だけ呼ばれる）
function setup(){
  // キャンバスを作成
  createCanvas(windowWidth, windowHeight);
  background(0);
}

// 計算と描画
function draw(){
  // 背景をぬりつぶす


  // 輪郭（りんかく）を消す
  noStroke();

  // 色をぬる
  fill(255, mouseX / 4, mouseY / 4);

  if(mouseIsPressed){
    // 円を描く
    ellipse(mouseX, mouseY, 60);

    // 小さな円を描く（真ん中）
    ellipse(mouseX, mouseY - 50, 30);

    // 小さな円を描く（左）
    ellipse(mouseX - 40, mouseY - 40, 30);

    // 小さな円を描く（右）
    ellipse(mouseX + 40, mouseY - 40, 30);
  }
}
