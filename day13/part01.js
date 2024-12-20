const fs = require('fs');

machines = fs.readFileSync('./day13/example.txt','utf-8').split('\r\n\r\n').map(m=> {
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
            x:prize_x,
            y:prize_y
        },
        results:[]
    }
});
for (let machine of machines) {
    for (let i=0;i<100;i++) {
        for (let j=1;j<100;j++) {
            let x = i * machine.button_a.x + j * machine.button_b.x
            let y = i * machine.button_a.y + j * machine.button_b.y
            if (x == machine.prize.x && y == machine.prize.y) {
                machine.result_x = i *3;
                machine.result_y = j;
                machine.results.push((i*3) + j);

            }
            if (x > machine.prize.x || (y > machine.prize.y)) break;
    
        }
    }
    
}
console.log(machines.reduce((acc,curr)=>acc+((curr.result_x ?? 0) + (curr.result_y ?? 0)),0));
