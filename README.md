# Etheria Ipsum

Lorem Ipsum generator based on the dialog from the TV show She-Ra and the Princesses of Power, and associated tools for building/maintaining the dialog. As this is using the dialog from many of the episodes from the TV series please expect spoilers. If you haven't seen She-Ra, please go watch She-Ra.

## Packages

### Dialog-Scraper

Node script that gathers dialog from a list of wiki urls and produces a JSON file with dialog and statistics.

#### Usage

The list of source urls is set in data/feed.txt. The feed file takes a page URL and a selector for the target content.

Run the script with `yarn run dev:scraper`, the script will retrieve the URLs with a 5 second delay between each. The results are sanitized in an effort to reduce them to only the character dialog. The final dialog lines are saved to data/dialog.txt.

On completion of the scraper script, run the stats script with `yarn run dev:stats`. This will process data/dialog.txt to create a JSON file with a `lines`section containing the dialog and some stats for each line, and also a `charactersIndex`and `wordIndex`section with dialog lines grouped by length. The output is saved in data/dialog.json.

### API

Fastify API with routes for Character and Word based queries.

#### Dev Usage

Run `yarn run dev` to start the API server. The default port is 3000, and an alternative port can be set with a .env file inside the api folder containing a PORT key-value pair such as `PORT=8080`.

If the dialog-data dependency is not found you may need to run `yarn`from the root directory to link the dependency.

### Site

Ipsum Generator site.

_Dialog sourced from the wiki at https://she-raandtheprincessesofpower.fandom.com/ with some modification for formatting. If you like and use this tool please consider contributing your time to update the wiki.
