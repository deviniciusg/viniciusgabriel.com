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

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.portfolio_header button');
    const cards = document.querySelectorAll('.portfolio_card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});