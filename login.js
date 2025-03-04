// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    
    // Fade-in effect for the about section
    const aboutSection = document.querySelector(".about-section");
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        aboutSection.style.transition = "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";
        aboutSection.style.opacity = "1";
        aboutSection.style.transform = "translateY(0)";
    }, 500);
    
    // Team member hover effect
    const teamMembers = document.querySelectorAll(".team-member");

    teamMembers.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        });

        member.addEventListener("mouseout", () => {
            member.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
        });
    });

    // Smooth scroll for internal links
    const links = document.querySelectorAll("a[href^='#']");
    
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for navbar height
                    behavior: "smooth"
                });
            }
        });
    });

});
