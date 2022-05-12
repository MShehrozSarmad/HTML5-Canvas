window.addEventListener('load', _ => {
    const canvas  = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const strokeWidth = document.getElementById('strokeWidth');
    const clearCanvas = document.getElementById('clear');
    const brush = document.getElementById('brush');
    let hue = 0;
    let count = 0;
    let changed = false;
    let brushMulti = false;
    let painting = false;

    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth - canvas.offsetLeft;
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "rgb(116, 33, 204)";
    ctx.textAlign = "center";
    ctx.fillText("Draw Here", canvas.width/2, canvas.height/2);

    function changeIt() {
        console.log("hello changed");
        changed = true;
    }

    function startPosition(e){
        painting = true;
        draw(e);
        if(count == 1)
        clearCnvs();
    }

    function endPosition(){
        painting = false;
        ctx.beginPath();
    }

    function changeBrush(){
        if(brushMulti == true){
            brush.style.border = '1px solid gray';
            brushMulti = false;
        } else if(brushMulti == false){
            brushMulti = true;
            changed = false;
        }
    }


    function draw(e){
        if(!painting) return;
        ctx.lineWidth = strokeWidth.value;

        if(brushMulti == true){
            if(changed == true){
                brushMulti = false;
                brush.style.border = '1px solid grey';
                ctx.strokeStyle = colorPicker.value;
            }else{
                ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
                brush.style.border = `2px solid hsl(${hue}, 100%, 50%)`;
            }
        }else{
            ctx.strokeStyle = colorPicker.value;
        }

        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        hue++;

        if(hue >= 360){
            hue = 0;
        } 
        count++;
    }

    function clearCnvs(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    clearCanvas.addEventListener('click', clearCnvs);
    brush.addEventListener('click', changeBrush);
    colorPicker.addEventListener('change', changeIt);
});
