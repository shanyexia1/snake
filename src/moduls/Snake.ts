class Snake{
    //表示蛇的元素
    element:HTMLElement;
    head:HTMLElement;
    bodies: HTMLCollection;

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies =this.element.getElementsByTagName('div');
    }

    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    set X(value:number){
        if(this.X === value){
            return ;
        }

        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }
        //移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
    }
    set Y(value:number){
        if(this.Y === value){
            return ;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }

        //移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
    }

    addBody(){
        this.element.insertAdjacentHTML('beforeend','<div> </div>');
    }

    moveBody(){
        for(let i=this.bodies.length-1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
        
    }
}

export default Snake;