var game_mode = 'flat'; //flat or vertical


var n_enermies = 5;
var g ;
var enermies = [];
var enermy_mass = [0.5,6];
var enermy_r = [5,10];
var enermy_health = [5,50];
var enermy_mana = [1,5];
var enermy_weapons = [1,5];

//Player set up
var player_start_x = 0;
var player_start_y = 0;
var player_m = 20;
var player_r = 10;
var player_health = 100;
var player_mana = 20;
var player_defence = 0;
var player_weapons = [7,6,5,0, 1];

//Bullets
var bullets = [];
var swings = [];

function random_number(min,max){
  return Math.random() * (max - min) + min;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    if (game_mode == 'flat'){
      g = 0;
    }
    else if (game_mode == 'vertical'){
      g = 0.3;
    }

    Player1 = new Player(player_start_x,
                         player_start_y,
                         player_m,
                         player_r,
                         player_health,
                         player_mana,
                         player_defence,
                         player_weapons,
                         g
                       );

    for (var i = 0; i < n_enermies; i++) {
      enermies.push([Math.floor(random_number(0,windowWidth+1)),
                     Math.floor(random_number(0,windowHeight+1)),
                     random_number(enermy_mass[0],enermy_mass[1]),
                     random_number(enermy_r[0],enermy_r[1]),
                     Math.floor(random_number(enermy_health[0],enermy_health[1])),
                     random_number(enermy_mana[0],enermy_mana[1]),
                     Math.floor(random_number(enermy_weapons[0],enermy_weapons[1]+1)),
                     g]);
    }

    for (var i = 0; i < enermies.length; i++) {

      enermies[i] = new Enermy(enermies[i][0],
                               enermies[i][1],
                               enermies[i][2],
                               enermies[i][3],
                               enermies[i][4],
                               enermies[i][5],
                               enermies[i][6],
                               enermies[i][7]
                             );
    }

    if (game_mode == 'flat'){
      Player1.x_friction = 0.5;
      Player1.y_up_friction = 0.5;
      Player1.y_down_friction = 0.5;
    }
    else if (game_mode == 'vertical'){
      Player1.x_friction = 0.5;
      Player1.y_up_friction = 0.8;
      Player1.y_down_friction = 1;
    }
}

function draw() {
    background(0);

    Player1.update();
    Player1.show();

    update_enermies(enermies);

    //Player control
    stroke(225);
    player_control();

    //Attack
    line(Player1.x, Player1.y, mouseX, mouseY);
    noFill();
    ellipse(mouseX,mouseY,5,5);

    update_bullets(bullets);
    update_swings(swings);

    damage(bullets,swings,enermies);

    //Display
    display();
}

function windowResized() {
    resizeCanvas(0.8*windowWidth, 0.8*windowHeight);
}

function display() {
  document.getElementById("health_display").innerHTML = player_health;
  document.getElementById("mana_display").innerHTML = player_mana;
  document.getElementById("defence_display").innerHTML = player_defence;

  var weapon_text=[];
  for (var i = 0; i < player_weapons.length; i++) {
    weapon_text.push(weapons_dict[player_weapons[i]]['name']);
  }
  document.getElementById("weapons_list_display").innerHTML = weapon_text;
  document.getElementById("current_weapon_display").innerHTML = Player1.current_weapon['name'];
}



//Player Keyboard Control

//Movement
function player_control(){
  if (game_mode =='flat'){
    if (keyIsDown(87)){
      Player1.up(5);
    }
    if (keyIsDown(83)){
      Player1.down(5);
    }
    if (keyIsDown(65)){
      Player1.left(5);
    }
    if (keyIsDown(68)){
      Player1.right(5);
    }
  }
  else if (game_mode =='vertical') {
    if (keyIsDown(65)){
      Player1.left(5);
    }
    if (keyIsDown(68)){
      Player1.right(5);
    }
    if (keyIsDown(83)){
      Player1.down(5);
    }
  }

}


function keyPressed() {
  if (game_mode=='vertical'){
    if (keyCode == 87) {
      Player1.up(15);
    }
  }

  if (keyCode == 49){
    Player1.current_weapon=weapons_dict[Player1.weapons[0]];
  }
  if (keyCode == 50){
    Player1.current_weapon=weapons_dict[Player1.weapons[1]];
  }
  if (keyCode == 51){
    Player1.current_weapon=weapons_dict[Player1.weapons[2]];
  }
  if (keyCode == 52){
    Player1.current_weapon=weapons_dict[Player1.weapons[3]];
  }
  if (keyCode == 53){
    Player1.current_weapon=weapons_dict[Player1.weapons[4]];
  }
}

function mouseClicked(){
  player_attack();
}

//Attack
function player_attack(){
  if (Player1.current_weapon['attack_type']=='swing'){
    //(x, y, px, py, vr, v_angle, damage, r, angle, r_range, angle_range)
    swings.push(new Swing(Player1.x, Player1.y, mouseX, mouseY, Player1.current_weapon));
  }else if (Player1.current_weapon['attack_type']=='bullet'){
    //(x, y, px, py, v, bullet_damage, r)
    bullets.push(new Bullet(Player1.x, Player1.y, mouseX, mouseY,Player1.current_weapon));
  }else if (Player1.current_weapon['attack_type']=='splash'){

  }
}

function damage(bullets, swings, elements){
  //bullet damage
  for (var i = 0; i < elements.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
      var distance = dist(elements[i].x,elements[i].y,bullets[j].x,bullets[j].y);
      if ((elements[i].r+bullets[j].r)>distance){
        elements[i].health-=bullets[j].damage;
        bullets.splice(j,1);
        j-=1;
      }
    }
  }
  //swings damage
  for (var i = 0; i < elements.length; i++) {
    for (var j = 0; j < swings.length; j++) {
      var distance = dist(elements[i].x,elements[i].y,swings[j].x,swings[j].y);
      var dx = elements[i].x-swings[j].x;
      var dy = elements[i].y-swings[j].y;
      if (dx>0){
        var angle = Math.atan(dy/dx);
      } else if (dx<0){
        var angle = Math.atan(dy/dx)+PI;
      }

      var anlge_bool = ((swings[j].angle+swings[j].ini_angle)>=angle)||((swings[j].angle-swings[j].ini_angle)<=angle);
      var dist_bool = ((swings[j].r+elements[i].r+swings[j].line_stroke)/2)>distance&&((swings[j].r-elements[i].r-swings[j].line_stroke)/2)<distance;

      if ((dist_bool)&&(anlge_bool)){
        elements[i].health-=swings[j].damage;
      }
    }
  }
}

function update_enermies(enermies){
  for (var i = 0; i < enermies.length; i++) {
    if (enermies[i].health>0){
      enermies[i].update();
      enermies[i].show();
    }
    else{
      //if enermy health lower than 0, delete the enermy
      enermies.splice(i,1);
      i-=1;
    }
  }
}
