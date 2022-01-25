function tabs(tabsParentSelector, tabsSelector, tabsContentSelector,  activeClass) {
    //TABS

    let tabsParent = document.querySelector(tabsParentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabsContents = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabsContents.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    };

    function showTabContent(i = 0) {
        //tabsContents[i].style.display = 'block';
        tabsContents[i].classList.add('show', 'fade');
        tabsContents[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

export default tabs;