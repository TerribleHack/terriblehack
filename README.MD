TerribleHack
===========

A website for the "Terrible Ideas Hackathon" at uWaterloo!

Current site: https://terriblehack.website/

## Past sites

| Term | URL |
| - | - |
| w2015 | https://terriblehack.website/w2015/ |
| f2016 | https://terriblehack.website/f2016/ |
| w2017 | https://terriblehack.website/w2017/ |
| s2017 | https://terriblehack.website/s2017/ |
| f2017 | https://terriblehack.website/f2017/ |
| s2018 | https://terriblehack.website/s2018/ |

## Contributing

When creating a new TerribleHack site, move the previous site into its own folder first.

Here are some files to not move:

* `.git`
* `.gitignore`
* `CNAME`
* `README.MD`

1. Move the old `*.html` files into the previous term's folder (e.g. `w20XX` for Winter 20XX)
1. Create a new folder for this term's website (e.g. `s20XX` for Spring 20xx)
1. Place your assets (images, CSS, JS) in the new folder (e.g. `s20XX`)
1. Create your homepage by creating `index.html` in the root folder (where the old `index.html` was)
1. Use [root-relative URLs](https://stackoverflow.com/questions/5559578/having-links-relative-to-root), so the links will still work when the webpages are moved in the future

**Important**: To test your site locally while using root-relative URLs, use `localhost:8000` instead of `file://...`:

```bash
cd terriblehack
python -m SimpleHTTPServer 8000
```
