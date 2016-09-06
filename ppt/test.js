    function getByClass(oParent, sClass){
        var All=oParent.getElementsByTagName("*");
        var AllArr=[];
        for(var i=0;i<All.length;i++){
            if(All[i].className==sClass){
                AllArr.push(All[i]);
            }
        }
        return AllArr;
    }
    // oDiv.style.left
    window.onload=function(){
        var oDiv=document.getElementById("all");
        //  获得“上一个”“下一个”的按钮
        var oPrev=getByClass(oDiv, "prev")[0];
        var oNext=getByClass(oDiv, "next")[0];
        //  获得左右按钮的触发
        var oMarkLeft=getByClass(oDiv, "mark_left")[0];
        var oMarkRight=getByClass(oDiv, "mark_right")[0];
        //  获得大图的信息
        var oBigPic=getByClass(oDiv, "big_pic")[0];
        var oBigLi=oBigPic.getElementsByTagName("li");
        //  获得小图的信息
        var oSmallPic=getByClass(oDiv, "small_pic")[0];
        var oSmallUl=oSmallPic.getElementsByTagName("ul")[0];
        var oSmallLi=oSmallPic.getElementsByTagName("li");
        //  大图的层级
        var nowZ=2;
        //  当前的位置
        var now=0;
        //  
        oSmallUl.style.width=oSmallLi[0].offsetWidth*oSmallLi.length+"px";
        //  左右按钮
        oPrev.onmouseover=oMarkLeft.onmouseover=function(){
            oPrev.style.opacity=1;
        }
        oPrev.onmouseout=oMarkLeft.onmouseout=function(){
            oPrev.style.opacity=0;
        }
        oNext.onmouseover=oMarkRight.onmouseover=function(){
            oNext.style.opacity=1;
        }
        oNext.onmouseout=oMarkRight.onmouseout=function(){
            oNext.style.opacity=0;
        }
        //  大图切换
        for(var i=0; i<oSmallLi.length; i++){
            oSmallLi[i].index=i;
            oSmallLi[i].onclick=function(){
                //  重复点击的 时候不触发
                if(this.index==now) return;
                now=this.index;
                tab();
            }
            oSmallLi[i].onmouseover=function(){
                this.style.opacity=1;
            }
            oSmallLi[i].onmouseout=function(){
                if(this.index==now) return;
                this.style.opacity=0.5;
            }
        }

        function tab(){ 
            oBigLi[now].style.zIndex=nowZ++;
            for(var j=0; j<oSmallLi.length; j++){
                oSmallLi[j].style.opacity=0.5;
            }
            oSmallLi[now].style.opacity=1;
            if(now==0){
                oSmallUl.style.left=0;
            } else if(now==4||now==5){
                oSmallUl.style.left="-200px"
            } else {
                oSmallUl.style.left=-(now-1)*oSmallLi[0].offsetWidth+"px";
            }
        }
        //  上一个 
        oPrev.onclick=function(){
            now--;
            if(now==-1){
                now=oSmallLi.length-1;
            }
            tab();
        }
        //  下一个
        oNext.onclick=function(){
            now++;
            if(now==oSmallLi.length){
                now=0;
            }
            tab();
        }
        
        var timer=setInterval(oNext.onclick,1000);
        oDiv.onmouseover=function(){
            clearInterval(timer);
        }
        oDiv.onmouseout=function(){
            timer=setInterval(oNext.onclick,2000);
        }
    }