let fileup = document.getElementById('meme-insert');
// image upload to canva, font: MDN HTMLImageElement || stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
function upImage(event) {
    let img1 = new Image()
    img1.onload = draw;
    img1.src = URL.createObjectURL(this.files[0]);
    console.log("indo algo" + img1.src);
}

function draw() {
    let canvas = document.getElementById('meme-image');
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
}
fileup.addEventListener('change', upImage);

