# My Local Pitch

You can see a live version of this project here: [My Local Pitch](https://krisztian-kugler.github.io/my-local-pitch)

## Used technologies

* Angular
* RxJS
* Pug (for shorter template syntax)
* Sass (only for its nesting capability)

## Notes

* The app a simplified clone of the real mylocalpitch.com website, uses similar color scheme but I came up with my own design and UX decisions. I tried to give it a minimalistic, modern look with ease of use in mind.
* I used only what Angular came with, no 3rd party libraries or anything, the whole app was coded from scratch. This was a conscious decision.
* The layout makes heavy use of flexbox, therefore it might not look as intended in IE due to incomplete support. However it should be fine in Chrome, Firefox and Edge.
* The app is fully responsible, it should look fine on the most common desktop, mobile and tablet resolutions (hopefully it does :)).

## UX and usability decisions

* Visual feedback if the user tries to search for venues without selecting a sport and a city.
* Visual feedback (load spinner) for asynchronous actions.
* On the results page, the pagination bar and the filters panel stays in a fixed position (for easier access) even if we scroll down the page. In mobile-view, the filters panel becomes a dropdown menu that is permanently attached to the top of the results list.
* Filters are applied "live", without having to click an extra button.
* Applying filters will make the page scroll to the top automatically (if it's not there already).
* There's a little "caching feature" that stores the selected sport and city if we navigate to another route. It also remembers the applied filters when we return from the pitch-details page.

## Issues

* When checking for availability for a given venue, the API response looks kind of "empty", there isn't any meaningful data to work with, therefore I just did a simple console.log there. Too bad, because I wanted to complete that feature as well. I might have missed something!?
