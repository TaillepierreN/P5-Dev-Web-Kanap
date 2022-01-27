const urlSearchParams = new URLSearchParams(window.location.search);
const idOrder = urlSearchParams.get("id")

main()

//affiche l'id de commande
function main(){
    if(idOrder){
        document.getElementById("orderId").innerText = idOrder;
    } else{
        document.location.href= `../html/index.html`;
    }
}