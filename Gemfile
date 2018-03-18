source "https://rubygems.org"
ruby RUBY_VERSION

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
#gem "jekyll", "3.3.1"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
#gem "minima", "~> 2.0"

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
#gem "github-pages", group: :jekyll_plugins
gem "github-pages", versions["github-pages"], group: :jekyll_plugins
#gem "github-pages", versions["github-pages"] # bypass dependency check

# If you have any plugins, put them here!
# You don't have to add Github pages compatible plugins / themes when using the github-pages gem
group :jekyll_plugins do
   #gem "jekyll-feed", "~> 0.6"
end

# gem 'bootstrap', '~> 4.0.0.alpha6'

# For Windows
# See https://jekyllrb.com/docs/windows/#installation
gem 'wdm', '~> 0.1.1' if Gem.win_platform?
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Be sure to run "bundle update" after each update
# or "bundle install" if you want to install a new gem.
