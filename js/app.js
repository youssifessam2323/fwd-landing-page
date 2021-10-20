

/**
 * Define Global Variables
 * 
*/
let sections = Array.from(document.querySelectorAll("section"));
let unorderList  = document.querySelector("#navbar__list");
let btn = document.querySelector(".top__btn");
let sectionsPosition = sections.map(s => s.offsetTop);
let header = document.querySelector("header");
// build the nav
let navLinks = [];
/**
 *  End Global Variables
 */


/*
 * 
 * Start Helper Functions
 * 
*/

btn.addEventListener("click",() => {
    document.body.scrollTop = 0;
});

function getIdOfSection (sections) {
    return sections.map((section) => section.id);
}


function changeActiveNavItem(activeItem){


    activeItem.classList.add("active");

    navLinks.forEach(e => { 
        if(e != activeItem ){
            e.classList.remove("active");   
        }
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


function constructTheNav(){
sections.forEach(s => {
    let li = document.createElement("li");

    li.textContent = s.id;

    li.classList.add("menu__link");
    navLinks.push(li);
    });
    navLinks.forEach(li => unorderList.appendChild(li));
}

constructTheNav();



// Scroll to anchor ID using scrollTO event



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
unorderList.addEventListener("click", e => { 
    let ele = e.target;

    changeActiveNavItem(ele);
    
    let section = sections.find(s => ele.textContent === s.id );
    //using the scroll to in js 
    window.scrollTo(0, section.offsetTop + 200);
    
});

// Set sections as active
// Add class 'active' to section when near top of viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2  ,
  };


function obeserverCallback(entries){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            console.log(entry.target);
            const navItem = navLinks.find(s => s.textContent == entry.target.id);
            navItem.classList.add("active");
            navLinks.forEach(item => { 
                if(item.textContent != navItem.textContent)
                    item.classList.remove("active")
            });

            const section = document.querySelector(`#${entry.target.id}`);
            section.classList.add("your-active-class");
            sections.forEach(s => {
                if(s.id != section.id){
                    s.classList.remove("your-active-class")
                } 
            });
        }
    });
}

const observer = new IntersectionObserver(obeserverCallback, observerOptions);

sections.forEach(s => observer.observe(s));

