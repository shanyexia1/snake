class ScorePanel{
    //记录分数和等级
    score:number = 0;
    level:number = 1;

    maxLevel: number;
    upScore: number;
    //分数和等级所在的元素
    scoreEle: HTMLElement;
    levelEle:HTMLElement;
    constructor(maxLevel: number = 10,upScore:number = 2){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore(){
        this.scoreEle.innerHTML = ++this.score + '';

        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }
    levelUp(){
        if(this.level<10){
            this.levelEle.innerHTML = ++this.level + '';
        }
        
    }
}

export default ScorePanel;