
function Game() {

	this.player = new Player(5000, 5000);
	this.ghost = new Ghost(5000, 5000);
	this.level = new LevelLoader(0, 0);


	this.update = function() {

		this.player.update();

		if(this.ghost.visible){

			this.ghost.update();

		}

		this.level.update();


		translate(width/2 - this.player.position.x, height/2 - this.player.position.y);


	}

	this.render = function() {

		test_grid(10000, 100);
		//test_box(5000, 4500);

		this.level.render();

		this.player.render();

		if(this.ghost.visible){
			this.ghost.render();
		}



	}

}
