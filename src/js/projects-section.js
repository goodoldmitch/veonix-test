function projectsSection(){
    const projectsSection = document.querySelector('.projects-section'),
          nextButton = projectsSection.querySelector('.projects-section .next'),
          prevButton = projectsSection.querySelector('.projects-section .prev'),
          imageSlides = projectsSection.querySelectorAll('.slider-main .slide'),
          plansSlides = projectsSection.querySelectorAll('.slider-plan .slide'),
          textSlides = projectsSection.querySelectorAll('.text-slides .slide');

    let activeSlideIndex = 0;

    function nextSlide(slides){
        slides.forEach((item, i) => {
            if(item.classList.contains('active')){
                activeSlideIndex = i + 1;
                item.classList.remove('active');
            }
        })
        prevButton.disabled = false;
        slides[activeSlideIndex].classList.add('active');
        
        if(activeSlideIndex == slides.length - 1){
            nextButton.disabled = true;
        }else{
            nextButton.disabled = false;
        }
    }
    
    function prevSlide(slides){
        slides.forEach((item, i) => {
            if(item.classList.contains('active')){
                activeSlideIndex = i - 1;
                item.classList.remove('active');
            }
        })
        nextButton.disabled = false;
        slides[activeSlideIndex].classList.add('active');
        
        if(activeSlideIndex == 0){
            prevButton.disabled = true;
        }else{
            prevButton.disabled = false;
        }
    }

    nextButton.addEventListener('click' , () => {
        nextSlide(imageSlides);
        nextSlide(plansSlides);
        nextSlide(textSlides);
    });
    
    prevButton.addEventListener('click' , () => {
        prevSlide(imageSlides);
        prevSlide(plansSlides);
        prevSlide(textSlides);
    })
}

export default projectsSection;