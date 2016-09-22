#/bin/sh
# include local bash profile
source .bashrc

# install homebrew if necessary
if !([ -a /usr/local/bin/brew ])
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

#install homebrew dependencies
brew update
cat .homebrew-packages | brew install

# configure git
git config --global alias.add-commit '!git add -A && git commit'

#install atom dependencies
apm update
cat .atom-packages | apm install

#install node dependencies
npm update
npm install
