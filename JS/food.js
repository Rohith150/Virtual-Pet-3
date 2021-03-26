class Food {
    constructor() {
    
    }

    display() {
        var x = 80, y = 100;
        imageMode(CENTER);
        image(milkImg, 720, 220, 70, 70);

        this.foodStock = foodS;

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50
                }
                image(milkImg, x, y, 50, 50)
                x = x+30
            }
        }
    }

    bedroom(){
        background(bedroom, 550, 550)
    }

    garden(){
        background(garden, 550, 550)
    }
    washroom(){
        background(washroom, 550, 550)
    }
}