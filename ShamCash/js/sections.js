$(document).ready(function() {
    let currentIndex = 0;
    const sections = $('.section-swipe');
    const numSections = sections.length;
    const dots = $('.dot');

    function updateSections() {
        const offset = -currentIndex * 100 + '%';
        sections.css('transform', 'translateX(' + offset + ')');
        dots.removeClass('active');
        dots.eq(currentIndex).addClass('active');
    }
    function goToSection(index) {
        currentIndex = index;
        updateSections();
    }
    setInterval(function() {
        currentIndex = (currentIndex + 1) % numSections;
        updateSections();
    },  7000);

    updateSections();
    dots.each(function(index) {
        $(this).click(function() {
            goToSection(index);
        });
    });
});
