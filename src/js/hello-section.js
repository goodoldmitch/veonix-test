function helloSection(){
    
    // //////////////// Слайдер ////////////////
    const sliderBlock = document.querySelector(".hello-section .slider"),
          nextButton = sliderBlock.querySelector(".next"),
          prevButton = sliderBlock.querySelector(".prev"),
          textSlidesList = sliderBlock.querySelectorAll(".slider-viewport-1 .slide"),
          totalSlidesBlock = sliderBlock.querySelector('.slides-total'),
          totalSlidesVlue = textSlidesList.length,
          currentSlideBlock = sliderBlock.querySelector('.current-slide'),
          imageSliderWrapper = sliderBlock.querySelector('.slides-wrapper'),
          imageSlides = imageSliderWrapper.querySelectorAll('.slide');
    
    let activeSlideIndex = 0,
        offsetStep = 0;
          
    function getActiveSlideIndex(){
        textSlidesList.forEach((item, i) => {
            if(item.classList.contains('active')){
                activeSlideIndex = i;
            }
        });

        textSlidesList[activeSlideIndex].classList.remove('active');
    }

    //устанавливаем количество слайдов
    totalSlidesVlue > 9 ? totalSlidesBlock.textContent = totalSlidesVlue : totalSlidesBlock.textContent = `0${totalSlidesVlue}`;
    
    
    // Кнопка вперед
    nextButton.addEventListener('click' , () => {
        
        const elementToMoveWidth = parseInt(window.getComputedStyle(imageSlides[0]).width) + parseInt(window.getComputedStyle(imageSlides[0]).marginRight),
              imageSliderWrapperWidth = parseInt(window.getComputedStyle(imageSliderWrapper).width);

        // текстовый слайдер + счетчик
        getActiveSlideIndex();

        if(activeSlideIndex === totalSlidesVlue - 1){
            textSlidesList[0].classList.add('active');
            currentSlideBlock.textContent = '01';
            offsetStep = 0;
        }else{
            textSlidesList[activeSlideIndex + 1].classList.add('active');
            activeSlideIndex + 2 > 9 ? currentSlideBlock.textContent = activeSlideIndex + 2 : currentSlideBlock.textContent = `0${activeSlideIndex + 2}`;
            offsetStep += elementToMoveWidth;
        }

        imageSliderWrapper.style.transform = `translate(-${(offsetStep/imageSliderWrapperWidth)*100}%)`;
    })

    // Кнопка назад
    prevButton.addEventListener('click' , () => {
        
        const elementToMoveWidth = parseInt(window.getComputedStyle(imageSlides[0]).width) + parseInt(window.getComputedStyle(imageSlides[0]).marginRight),
              imageSliderWrapperWidth = parseInt(window.getComputedStyle(imageSliderWrapper).width);
        
        getActiveSlideIndex();

        if(activeSlideIndex === 0){
            textSlidesList[textSlidesList.length - 1].classList.add('active');
            textSlidesList.length > 9 ? currentSlideBlock.textContent = `${textSlidesList.length}` : currentSlideBlock.textContent = `0${textSlidesList.length}`;
            offsetStep += elementToMoveWidth * (textSlidesList.length - 1);
        }else{
            textSlidesList[activeSlideIndex - 1].classList.add('active');
            activeSlideIndex > 9 ? currentSlideBlock.textContent = activeSlideIndex : currentSlideBlock.textContent = `0${activeSlideIndex}`;
            offsetStep -= elementToMoveWidth;
        }
        
        imageSliderWrapper.style.transform = `translate(-${(offsetStep/imageSliderWrapperWidth)*100}%)`;
    })

    // //////////////// Кнопка прокрутки вниз ////////////////
    
    const scrollBtn = document.querySelector('.scroll-down');
    
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth' // Параметр плавного скролла
            });
        }
    }

    scrollBtn.addEventListener('click' , (e) => {
        e.preventDefault;
        scrollToSection('.projects-section');
    })

}

export default helloSection;