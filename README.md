# chowchow: good food fast.

Ever go to search for food in your favorite food-finding app, only to
get bogged down in choices? You were hungry, but now it's 30 minutes
later and you're still comparing options that all look decent...so
which to pick before you starve to death?

This is the problem chowchow attempts to solve, with the potential for
social good tossed in for free. Here's how:

- Obtain your location via browser or mobile GPS
- Search [Yelp's API](https://www.yelp.com/developers/documentation/v3/get_started) for restauraunts ("Top 5" near you)
- Ensure choices meet basic criteria (open now, sorted by rating, etc.)
- Optional: Adjust choices based on user input (price range, distance, etc.)
- Randomly select one choice from "Top 5"
- Display business details and quick links to route/call
- If random choice sucks, display list of remaining choices

This is starting as a webapp, with a (hopefully) mobile-friendly
interface. In time, I hope to make iOS/Android versions.

# Development

Make sure Docker's installed, clone this repo, then simply:

```
make build # build docker image
make run # run chowchow container
```

The app will be running on localhost:3000, and container is running nodemon for auto-restarts.

# Deployment

Make sure the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) is installed.

From the Heroku console, under Settings > Config Variables add entries for:

```
SECRET # express-session secret key
API_KEY # Yelp API key
```
[How to get a Yelp API key?](https://www.yelp.com/developers/documentation/v3/authentication)

Commits to master are auto-deployed.

