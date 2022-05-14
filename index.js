var slot = 0;
var disabled = false;
function changeClass(classe){
    let lvl = 1;
    if(classe.value == "corredor"){
        $(".skill[name='reator']").val(5);
        $(".skill[name='sensores']").val(5);
        $(".skill[name='velocidade']").val(7);
        $(".skill[name='tamanho']").val(1);
        $(".maxLife").text(4 + (2*(lvl-1)));
        $(".actualLife").text(4 + (2*(lvl-1)));
    }
    if(classe.value == "controlador"){
        $(".skill[name='reator']").val(4);
        $(".skill[name='sensores']").val(10);
        $(".skill[name='velocidade']").val(4);
        $(".skill[name='tamanho']").val(1);
        $(".maxLife").text(5 + (3*(lvl-1)));
        $(".actualLife").text(5 + (3*(lvl-1)));
    }
    if(classe.value == "defensor"){
        $(".skill[name='reator']").val(5);
        $(".skill[name='sensores']").val(5);
        $(".skill[name='velocidade']").val(3);
        $(".skill[name='tamanho']").val(1);
        $(".maxLife").text(8 + (5*(lvl-1)));
        $(".actualLife").text(8 + (5*(lvl-1)));
    }
    if(classe.value == "striker"){
        $(".skill[name='reator']").val(6);
        $(".skill[name='sensores']").val(3);
        $(".skill[name='velocidade']").val(5);
        $(".skill[name='tamanho']").val(1);
        $(".maxLife").text(7 + (4*(lvl-1)));
        $(".actualLife").text(7 + (4*(lvl-1)));
    }
}
function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
function changeBar(event, limite) {
    lifebar = document.getElementsByClassName("lifeBar")[0];
    valor = event.value;
    if(isNaN(valor)){
        event.value = limite;
        valor = limite;
    }
    if(valor > limite){
        event.value = limite;
        valor = limite;
    }else{
        lifebar.style.width = (valor/limite * 100)+ "%";
    }
    switch (valor) {
        case "1":
            lifebar.style.backgroundColor = "#F582A7";
            break;
        case "2":
            lifebar.style.backgroundColor = "#F10086";
            break;
        case "3":
            lifebar.style.backgroundColor = "#DA0037";
    }
}
$('.actualLife').on('DOMSubtreeModified', function(){
    let atual = this.innerHTML;
    let max = this.nextElementSibling.innerHTML;
    if(atual > max){
        this.innerHTML = atual = max;
    }
    let percent = (atual/max)*100;
    let barra = this.nextElementSibling.nextElementSibling;
    barra.style.width = percent + "%";
    if(percent > 75){
        barra.style.backgroundColor = "#232323";
    }else if(percent > 50){
        barra.style.backgroundColor = "#6b6b6b";
    }else if(percent > 25){
        barra.style.backgroundColor = "#a0a0a0";
    }else{
        barra.style.backgroundColor = "#EDEDED";
    }
});
$(".control_add").click(function(){
    if(slot < 5){
        $(".slots").append(
            "<table class='weapon'>"+
                "<tr>"+
                    "<th>ataque</th>"+
                    "<th>distancia</th>"+
                    "<th>acerto</th>"+
                    "<th>dano</th>"+
                    "<th>impacto</th>"+
                    "<th>nivel</th>"+
                "</tr>"+
                "<tr>"+
                    "<th><input type='text' name='arma' class='arma' ></th>"+
                    "<th><input type='text' name='distancia' class='distancia'></th>"+
                    "<th><input type='text' name='acerto' class='acerto'></th>"+
                    "<th><input type='text' name='dano' class='dano'></th>"+
                    "<th><input type='text' name='impacto' class='impacto'></th>"+
                    "<th><input type='text' name='nivel' class='nivel'></th>"+
                    "<th><button style = 'visibility: hidden;' class = 'btn btn-danger control_remove' >🗑</button></th>"+
                "</tr>"+
            "</table>");
        slot++;
        $(".control_remove").click(function(){
            $(this).parent().parent().parent().remove();
            slot--;
        });
    }
});
$(".control_edit").click(function(){
    disabled = !disabled;
    $(".weapon input").attr("disabled", disabled)
    $(".control_add").toggle("disabled");
    if(!disabled){
        $(".control_remove").css("visibility", "hidden");
        this.style.backgroundColor = "black";
        this.style.color = "white";
    }
    else{
        $(".control_remove").css("visibility", "visible");
        this.style.backgroundColor = "white";
        this.style.color = "black";
    }
});
