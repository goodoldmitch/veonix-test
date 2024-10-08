"use strict";

import helloSection from "../../src/js/hello-section.js";
import projectsSection from "../../src/js/projects-section.js";
import lazyLoading from "../../src/js/lazy-loading.js";

window.addEventListener('DOMContentLoaded' , () => {
    helloSection();
    projectsSection();
    lazyLoading();
})