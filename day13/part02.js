const fs = require('fs');

let machines = fs.readFileSync('./day13/input.txt','utf-8').split('\r\n\r\n').map(m=> {
    const lines = m.split('\r\n');
    let buttona_x = 0,buttona_y = 0,buttonb_x = 0,buttonb_y = 0,prize_x =0,prize_y = 0;
        let matches = lines[0].replace(/\s/g,'').match(/ButtonA:X\+(\d+),Y\+(\d+)/);
        if (matches) {
            buttona_x = +matches[1];
            buttona_y = +matches[2];
    
        }

        matches = lines[1].replace(/\s/g,'').match(/ButtonB:X\+(\d+),Y\+(\d+)/);
        if (matches) {
            buttonb_x = +matches[1];
            buttonb_y = +matches[2];
    
        }
        matches = lines[2].replace(/\s/g,'').match(/Prize:X=(\d+),Y=(\d+)/);
        if (matches) {
            prize_x = +matches[1];
            prize_y = +matches[2];
    
        }

    return {
        button_a: {
            x:buttona_x,
            y:buttona_y
        },
        button_b: {
            x:buttonb_x,
            y:buttonb_y,
        },
        prize: {
            x:prize_x + 10000000000000,
            y:prize_y + 10000000000000
        }
    }
});
for (let machine of machines) {
    machine.result_y = ((machine.prize.y * machine.button_a.x) - (machine.prize.x * machine.button_a.y)) / ((machine.button_b.y * machine.button_a.x) - (machine.button_b.x * machine.button_a.y))
    machine.result_x = ((machine.prize.x - (machine.result_y * machine.button_b.x)) / machine.button_a.x);
    if (machine.result_y - Math.floor(machine.result_y) !== 0 || machine.result_x - Math.floor(machine.result_x) !== 0)  {
        machine.result_x = 0;
        machine.result_y = 0;
    }
}
console.log(machines.reduce((acc,curr)=>acc+((curr.result_x * 3) + curr.result_y ),0));
