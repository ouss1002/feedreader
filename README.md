# FeedReader Test

No build tools were used in this project !

## Setup
- Just launch `index.html`

## Test Suites

The list of **Test Suites**:

#### 1. RSS Feeds
- Is the *allFeeds* array defined, empty ?
- Do the *allFeeds* objects have a URL defined and not empty ?
- Do the *allFeeds* objects have a name defined and not empty ?

#### 2. The Menu
- Is the menu hidden by default ?
- Does the menu appear in the viewport by default ? (Additional test for CSS)
- Does it hide and show accordingly ?
- Does it hide and show physically ? (Additional test for CSS)

#### 3. Initial Entries
- Does the feed have at least one entry ?

#### 4. New Feed Selection
- Does the feed change when clicking on another feed link in the menu ?
