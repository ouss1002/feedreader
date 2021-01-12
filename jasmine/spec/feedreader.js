

$(function() {
    
    describe('RSS Feeds', function() {
        
        // tests if the 'allFeeds' array is defined and has 
        // some objects in it
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // tests if every object of the 'allFeeds' array has 
        // a url defined and not empty
        it('has URL and is not empty', function() {
            if(allFeeds !== undefined) {
                allFeeds.forEach((feed) => {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
            }
        });

        // tests if every object of the 'allFeeds' array has 
        // a name defined and not empty
        it('has name and is not empty', function() {
            if(allFeeds !== undefined) {
                allFeeds.forEach((feed) => {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                });
            }
        });
    });

    describe('The Menu', function() { // VISUAL TESTING

        beforeAll(() => {

            // these variables help me determine if the menu is hidden physically 
            // (which means i'm gonna test some CSS). Basically, i check if the whole 
            // menu is outside of the viewport

            const slide = window.getComputedStyle(document.querySelector('.slide-menu'));
            padLeft = parseInt(slide.getPropertyValue('padding-left'));
            padRight = parseInt(slide.getPropertyValue('padding-right'));
            width = parseInt(slide.getPropertyValue('width'));
            fullWidth = padLeft + width + padRight;

            // the transition of the menu takes 0.2 seconds, while testing for hiding 
            // and showing the menu, i had to change the transition to 0s, i don't know 
            //  if i have the right to (i guess i have), i saved the old value of the 
            //  transition in case the developer wants to change it in the near future
            t1 = slide.getPropertyValue('transition-duration');
            $('.slide-menu').css('transition-duration', '0s');
        });

        // the test i added (checks the physical visibility of the menu)
        it('is hidden physically by default', function() {

            // i get the offset of the menu on the X-axis
            transf = parseInt($('.slide-menu').css('transform').split(',')[4]);

            // i check if the offset is greater or equal the the full width (including 
            // padding) of the menu
            let hidden = fullWidth + transf <= 0;

            expect(hidden).toBeDefined();
            expect(hidden).toBe(true);
        });

        // tests if the '.menu-hidden' class is added to the body by default 
        it('is hidden logically by default', function() {
            
            let hidden = document.querySelector('body').classList.contains('menu-hidden');

            expect(hidden).toBeDefined();
            expect(hidden).toBe(true);
        });

        // the transition takes 0.2s, i changed it to 0s in the beforeAll() function 
        // to fasten the procedure. 
        // i checked for both the physical and logical impact of the click 
        // which means i checked if the '.menu-hidden' class is added to the body 
        // and for the menu visibility in the viewport (i thought it essential)
        it('hides and shows accordingly', () => {
            // triggering the click (to show the menu)
            $('.menu-icon-link').click();
            // getting the offset on the X-axis
            transf = parseInt($('.slide-menu').css('transform').split(',')[4]);

            // physical visibilty in the viewport
            let fullyVisible = transf === 0;
            expect(fullyVisible).toBe(true);

            // checks for the added class to the body
            let classVis = document.querySelector('body').classList.contains('menu-hidden');
            expect(classVis).toBe(false);
            
            // triggering another click (to hide the menu)
            $('.menu-icon-link').click();
            // getting the offset on the X-axis
            transf = parseInt($('.slide-menu').css('transform').split(',')[4]);

            // physical visibility in the viewport
            let fullyHidden = transf <= -fullWidth;
            expect(fullyHidden).toBe(true);

            // checks for the removed class from the body
            classVis = document.querySelector('body').classList.contains('menu-hidden');
            expect(classVis).toBe(true);

            // giving the menu its original transition value back
            $('.slide-menu').css('transition-duration', t1);
        });
    });

    describe('Initial Entries', function() {

        // using the done function to wait for the asynchronous request 
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        // checks if there is at least a single .entry element withing the .feed 
        // container
        it('has at least one element', (done) => {

            // grabbing the '.feed' element and looks for its children with 
            // .entry as its class
            // the result is a boolean (there is at least one element)
            hasOneElement = $('.feed').find('a .entry').length > 0;

            expect(hasOneElement).toBe(true);

            // callback function 
            done();
        });
    });

    describe('New Feed Selection', function() {

        
        function lf(id, callback) {
            // i made the function this way to give it a sense of reusability and 
            // robustness (in my example, it loads the 2nd feed)
            loadFeed(id, () => {
                // saving the first element to check for its compatibility with 
                // the first result
                secondLink = $('.feed').children()[0].href;

                // now we call back the callback function (in my case done())
                callback();
            });
        }

        // using the done function to wait for the asynchronous request 
        // this time there are 2 requests made, i actually used the callback 
        // function in the second request by calling it in another function 
        // lf() defined above.
        beforeEach((done) => {
            // empthying the '.feed' element 
            $('.feed').html('');

            // loading the first feed (as an example)
            loadFeed(0, () => {
                // saving the first element to check for its compatibility with 
                // the second result
                firstLink = $('.feed').children()[0].href;

                // sending the callback function to the 2nd request made inside this 
                // function (loading the 2nd feed), if you want to load another feed, 
                // just change the first parameter 
                lf(1, done);
            });
        });

        it('the feed changes', (done) => {

            // checks if the first link of both feeds isn't the same
            expect(firstLink).not.toBe(secondLink);

            // callback function 
            done();
        });
    });
}());
