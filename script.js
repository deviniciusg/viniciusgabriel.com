console.log('olá mundo');
const html = document.querySelector('html')
const menu_mobile = document.getElementById('menu_mobile');



function toggleMenu(){    
    if (menu_mobile.classList.contains('active')) {
        console.log('Menu está sendo fechado.');
        menu_mobile.classList.remove('active'); 
    } else {
        console.log('Menu está sendo aberto.');
        menu_mobile.classList.add('active'); 
    }
}