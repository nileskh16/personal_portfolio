(function () {

    $('body').ready(function () {
        applyClassChanges();

        hideLoader();

        $('#navbar li').each(function (el) {
            $(this).click(function (event) {
                event.preventDefault();
                $("#navbar li").removeClass("active");
                let target = this.children && this.children[0] &&
                    this.children[0].href.split('#')[1];
                if (target) {
                    navToDiv(target);
                    $(this).addClass("active");
                }
                return false;
            });
        });

        $('#toggle_btn').click(function () {
            toggleClass();
        });

        $('#link-me').click(function () {
            let target = this.href.split('#')[1];
            navToDiv(target);
        });

        $("#exp-list button").each(function () {
            $(this).click(function (event) {
                event.preventDefault();
                let targetDiv = this.getAttribute("data-target");
                $(".tab-active").each(function () {
                    $(this).removeClass("tab-active");
                });
                $(targetDiv).addClass("tab-active");
                $("#exp-list button").removeClass("btn-active");
                $(this).addClass("btn-active");
            });
        });
    });

    $.fn.isVisible = function () {
        let element = $(this);
        let elTop = element.offset().top;
        let elBottom = elTop + element.outerHeight();
        let viewTop = $(window).scrollTop();
        let viewBottom = viewTop + $(window).height();
        return elBottom > viewTop && elTop < viewBottom;
    }

    var allSections = [
        {
            secId: "#contact",
            linkId: "#link-contact"
        },
        {
            secId: "#recognitions",
            linkId: "#link-recog"
        },
        {
            secId: "#experience",
            linkId: "#link-edu"
        },
        {
            secId: "#aboutme",
            linkId: "#link-about"
        },
        {
            secId: "#prime-section",
            linkId: null
        }
    ];

    $(window).on(`scroll resize`, function () {
        applyClassChanges();
    });

    function navToDiv(target) {
        $('html, body').animate({
            scrollTop: $('#' + target).offset().top
        }, 1000);
    }

    function applyClassChanges() {
        let headerElement = $("#main-header");
        if (!$('#prime-section').isVisible()) {
            headerElement.addClass("whblue");
            handlePrimeInfoSec(false);
        } else {
            headerElement.removeClass("whblue");
            handlePrimeInfoSec(true);
        }
        checkActiveLink();
    }

    function handlePrimeInfoSec(isPrime) {
        if ($(".nav-toggle").is(":visible")) {
            let navDiv = $("#navdiv");
            let toggleButton = $("#toggle_btn");
            if (isPrime) {
                navDiv && navDiv.removeClass("nav-div-sm-info");
                navDiv && navDiv.addClass("nav-div-sm-prime");
                toggleButton && toggleButton.removeClass("toggle-info");
                toggleButton && toggleButton.addClass("toggle-prime");
            } else {
                navDiv && navDiv.removeClass("nav-div-sm-prime");
                navDiv && navDiv.addClass("nav-div-sm-info");
                toggleButton && toggleButton.removeClass("toggle-prime");
                toggleButton && toggleButton.addClass("toggle-info");
            }
        }
    }

    function checkActiveLink() {
        let targetLink;
        for (let sect of allSections) {
            if (getOffsetTop($(sect.secId))) {
                targetLink = $(sect.linkId);
                break;
            }
        }
        $("#navbar li").removeClass("active");
        if (targetLink) {
            targetLink.addClass("active");
        }
    }

    function getOffsetTop(element) {
        let scrollTop = Math.floor($(window).scrollTop());
        let elementOffset = element && Math.floor(element.offset().top);
        return elementOffset <= scrollTop;
    }

    function toggleClass() {
        $('#navbar li').each(function (index) {
            $(this).toggleClass("toggle-show");
        });

        $('#navdiv').toggleClass("tr-bg");
    }

    function hideLoader() {
        let contentDiv = $("#contentdiv");
        if (contentDiv) {
            contentDiv.hide();
        }
        window.setTimeout(() => {
            let loaderDiv = $("#loaderdiv");
            if (loaderDiv) {
                loaderDiv.hide();
            }
            if (contentDiv) {
                contentDiv.show();
            }
        }, 3000);
    }
})();