//引入其他类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

//控制器
class GameControl{
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;
    isAlive = true;
    direction:string = '';
    constructor(){
        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel();
    }
    //游戏初始化
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run();
    }
    //键盘相应函数
    keydownHandler(event:KeyboardEvent){
        //防止掉头
        if(this.snake.bodies.length>1){
            if(event.key === 'ArrowUp' && this.direction === 'ArrowDown'){
                return ;
            }
            if(event.key === 'ArrowDown' && this.direction === 'ArrowUp'){
                return ;
            }
            if(event.key === 'ArrowLeft' && this.direction === 'ArrowRight'){
                return ;
            }
            if(event.key === 'ArrowRight' && this.direction === 'ArrowLeft'){
                return ;
            }
        }
       this.direction = event.key; 
       
    }
    //控制蛇移动的方法
    run(){
        
        let X = this.snake.X;
        let Y = this.snake.Y;

        //根据按键方向修改X和Y值
        switch (this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
        
            default:
                break;
        }

        this.checkEat(X,Y);
            
        try {
            this.checkHEadBody();
        } catch (e:any) {
            alert(e.message+',游戏结束！');
            this.isAlive = false;
        }

        //修改蛇的X和Y的值
        if(this.isAlive){
            try {
                this.snake.X = X;
                this.snake.Y = Y;
            } catch (e:any) {
                alert(e.message + ',游戏结束！')
                this.isAlive=false;
            }
        }

        

        this.isAlive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30);
    }

    checkEat(x:number,y:number){
        
        if (x === this.food.X && y === this.food.Y){
            //食物的位置重置
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        } 
    }
    checkHEadBody(){
        //蛇的身体大于四节才会发生相撞的情况
        for(let i=this.snake.bodies.length-1;i>0;i--){
            if(this.snake.X === (this.snake.bodies[i] as HTMLElement).offsetLeft&&this.snake.Y === (this.snake.bodies[i] as HTMLElement).offsetTop){
                throw new Error('吃到自己了');
            }
        }
    }
}

export default GameControl;