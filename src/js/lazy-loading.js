function lazyLoading(){
    const lazyElements = document.querySelectorAll('img[data-src], [data-bg]');

    const lazyLoad = (element) => {
        if (element.tagName === 'IMG') {
            const src = element.getAttribute('data-src');
            if (src) {
                element.src = src;
                element.removeAttribute('data-src');
            }
        } else if (element.hasAttribute('data-bg')) {
            const bg = element.getAttribute('data-bg');
            if (bg) {
                element.style.backgroundImage = `url('${bg}')`;
                element.removeAttribute('data-bg');
            }
        }
    };

    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(onIntersection, {
        threshold: 0.01
    });

    lazyElements.forEach(element => {
        observer.observe(element);
    });
}

export default lazyLoading;