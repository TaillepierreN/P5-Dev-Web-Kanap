const idOrder = document.URL.split("=").pop();
main()

//affiche l'id de commande
function main(){
    document.getElementById("orderId").innerText = idOrder;
}