

/*    ####################   Wall / Stone   ###############    */

function Wall(x,y, w,h) {

	this.position = createVector(x,y);
	this.width = w+1;
	this.height = h+1;
	this.velocity2 = createVector(0,0);

	this.update = function() {
		this.collide();
	}

	this.collide = function() {

		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position)){
			this.move_wall();
		}
		if(!game.ghost.visible){
		}else if(collRE(this.width, this.height, this.position, game.ghost.size, game.ghost.position)){
			this.move_wall_g();
		}

	}

	this.move_wall = function(direction)  {
		resetP();
	}

	this.move_wall_g = function(direction)  {
		resetG();
	}

	this.render = function() {

		push();
		fill(69,69,69);

		rect(this.position.x, this.position.y, this.width, this.height);
		// translate(this.position.x, this.position.y);
		pop();

	}
}


/*       ##########################     Key     #######################       */


function Key_End(x, y) {

	this.position = createVector(x, y );
	this.width = 10;
	this.height = 15;


	this.update = function() {
		this.collide();
	}

	this.collide = function() {

		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position)){

			game.player.key_end +=1;
			game.level.level.splice(game.level.level.indexOf(this),1);

			console.log(game.player.key_end);
		}

	}

	this.render = function() {

		push();
		fill(238,173,14);

		rect(this.position.x, this.position.y, this.width, this.height);
		translate(this.position.x, this.position.y);
		pop();

	}

}

// ----- Key_steel     #####################################

function Key_Steel(x, y) {

	this.position = createVector(x, y );
	this.width = 10;
	this.height = 15;


	this.update = function() {
		this.collide();
	}

	this.collide = function() {
		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position)){
			game.player.key_steel +=1;
			game.level.level.splice(game.level.level.indexOf(this),1);
		}
	}

	this.render = function() {

		push();
		fill(205,201,201);
		rect(this.position.x, this.position.y, this.width, this.height);
		translate(this.position.x, this.position.y);
		pop();

	}

}


/*       ##########################     Door     #######################       */

// ----- End

function Door_End(x,y, w,h) {

	this.position = createVector(x,y);
	this.width = w+1;
	this.height = h+1;
	this.velocity2 = createVector(0,0);

	this.update = function() {
		this.collide();
	}

	this.collide = function() {

		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position)){

			this.block();

			if(game.player.key_end > 0) {
				alert("Neues Level Laden ");
				game.player.key_end -= 1;

				LevelUpDate();
			}
		}

	}

	this.block = function(direction)  {
		resetP();
	}

	this.render = function() {

		push();
		fill(139,69,19);
		rect(this.position.x, this.position.y, this.width, this.height);
		translate(this.position.x, this.position.y);
		pop();

	}
}

// ---- Door_Steel     ############################################

function Door_Steel(x,y, w,h, use,what) {

	this.position = createVector(x,y);
	this.width = w+1;
	this.height = h+1;
	this.velocity2 = createVector(0,0);

	this.use = use;
	this.what_number = what;

	this.isOpen = false;

	this.update = function() {
		this.collide();
	}

	this.collide = function() {

		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position) && !this.Open){

			if(!this.isOpen) {
				this.block();
			}

			if(this.use == 1 && game.player.key_steel > 0) {
				game.player.key_steel -= 1;

				this.isOpen = true;
			}else{
				// text   ( verrosstet // ein anderrer weg um zu öffnen)
			}

		}

	}

	this.block = function(direction)  {
		resetP();
	}

	this.render = function() {

		if(!this.isOpen) {
			push();
			fill(205,201,201);
			rect(this.position.x, this.position.y, this.width, this.height);
			translate(this.position.x, this.position.y);
			pop();
		}else{
			push();
			fill(105,101,101);
			rect(this.position.x, this.position.y, this.width, this.height);
			translate(this.position.x, this.position.y);
			pop();
		}


	}
}

/*    ###########################   Akitvatoren  - lorenz fix it if you see it XD  #######################*/

function Button(x,y, use,what) {

	this.position = createVector(x,y);
	this.width = 30+1;
	this.height = 30+1;
	this.velocity2 = createVector(0,0);

	this.use = use;
	this.what_number = what;

	this.isPressed = false;
	this.isOn = false;
	this.door_store = -1;

	this.update = function() {
		this.collide();
	}

	this.collide = function() {

		if(collRE(this.width, this.height, this.position, game.player.size, game.player.position)){
			this.button_prest_thing();
		}else if(this.getIfBoxOnIt()){
			this.button_prest_thing();
		}else{
			if(this.use == 3 && !this.isOn && this.isPressed) {
				game.level.level[this.door_store].isOpen = false;
				this.isPressed = false;
			}
			this.isOn = false;
		}

	}

	this.getIfBoxOnIt = function() {
		var stop = false;
		var i = 0;

		while(i < game.level.boxes.length && !stop) { // rr collision machen JJJJJJJJJJJJJJJJJAAAAAAAAAAAAAA
			var betterPos = createVector(this.position.x+15, this.position.y+15)
			if(collRE(game.level.boxes[i].width, game.level.boxes[i].height, game.level.boxes[i].position, 30, betterPos)) {
				return true;
				stop = true;
			}
			i++;
		}

	}

	this.button_prest_thing = function() {
		if(!this.isPressed && this.use == 1) {
			var it = 0;
			it = this.getIT();

			if(it == -1) {
				console.log("lol fehler");
			}else {
				game.level.level[it].isOpen = true;
			}

		}else if(this.use == 2){
			var it = 0;
			it = this.getIT();

			if(!this.isPressed && !this.isOn){
				if(it == -1) {
					console.log("lol fehler");
				}else {
					game.level.level[it].isOpen = true;
					this.isPressed = true;
					this.isOn = true;
				}

			}else if(this.isPressed && !this.isOn) {
				game.level.level[it].isOpen = false;
				this.isOn = true;
				this.isPressed = false;
			}

		}else if(this.use == 3) {
			this.door_store = this.getIT();

			if(!this.isPressed && !this.isOn){

				if(this.door_store == -1) {
					console.log("lol fehler");
				}else {
					game.level.level[this.door_store].isOpen = true;
					this.isPressed = true;
					this.isOn = true;
				}
			}
		}

	}

	this.getIT = function() {
		var stop_serch = false;
		var i = 0;

		while(!stop_serch && i < game.level.level.length) {

			if(game.level.level[i].what_number == this.what_number && game.level.level[i] != this) {
				stop_serch = true;
				return i;
			}
			i++;
		}
		return -1;

	}

	this.render = function() {

		push();
		fill(205,201,201);

		rect(this.position.x, this.position.y, this.width, this.height);
		translate(this.position.x, this.position.y);
		pop();

	}
}
